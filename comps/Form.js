import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCategories,
  fetchCategoryProperties,
  fetchModel,
} from '../store/categorySlice';
import { MazaadySelectInput } from './Inputs';

const Form = () => {
  const [subCategoryId, setSubCategoryId] = useState('');
  const [category, setCategory] = useState('');
  const [subcategories, setSubcategories] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [propertiesValues, setPropertiesValues] = useState({});
  const [otherValue, setOtherValue] = useState('');
  const [child, setChild] = useState('');
  const [models, setModels] = useState('');
  const [selectedData, setSelectedData] = useState([]);

  const dispatch = useDispatch();
  const { categories, properties, model, status, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (subCategoryId) {
      dispatch(fetchCategoryProperties(subCategoryId));
    }
  }, [dispatch, subCategoryId]);

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setCategory(selectedCategoryId);
    const selectedCategory = categories.find(
      (cat) => cat.id === selectedCategoryId
    );
    setSubcategories(selectedCategory ? selectedCategory.children : []);
  };

  const handleSubcategoryChange = (event) => {
    const selectedSubcategoryId = event.target.value;
    setSubCategory(selectedSubcategoryId);
    setSubCategoryId(selectedSubcategoryId);
    const selectedSubCategory = subcategories.find(
      (subcat) => subcat.id === selectedSubcategoryId
    );
    setPropertiesValues(selectedSubCategory ? selectedSubCategory : '');
  };

  const handleProcessTypeChange = (propertyId, event) => {
    const selectedValue = event.target.value;

    setPropertiesValues((prevProperties) => ({
      ...prevProperties,
      [propertyId]: selectedValue,
    }));

    if (selectedValue === 'other') {
      setOtherValue('');
    } else if (propertyId && properties.length) {
      const selectedProperty = properties.find(
        (prop) => prop.id === propertyId
      );
      if (selectedProperty && selectedProperty.child) {
        dispatch(fetchModel(selectedValue));
      }
    }
  };

  const handleOtherInputChange = (event) => {
    setOtherValue(event.target.value);
  };

  const handleModelChange = (event) => {
    setModels(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedCategory = categories.find((cat) => cat.id === category);
    const categoryName = selectedCategory ? selectedCategory.name : '';

    const selectedSubCategory = subcategories.find(
      (subcat) => subcat.id === subCategory
    );
    const subCategoryName = selectedSubCategory ? selectedSubCategory.name : '';

    const optionProperties = {};

    const newDataEntry = {
      category: categoryName,
      subCategory: subCategoryName,
      properties: optionProperties,
      otherValue,
      models,
    };

    setSelectedData((prevData) => [...prevData, newDataEntry]);

    setCategory('');
    setSubCategory('');
    setPropertiesValues({});
    setOtherValue('');
    setChild('');
    setModels('');
  };

  return (
    <div className="my-7 flex items-center justify-center">
      <div>
        <form onSubmit={handleSubmit}>
          {/* Category */}
          <div className="mt-3">
            <MazaadySelectInput
              value={category}
              label="Category"
              onChange={handleCategoryChange}
              items={categories}
            />
          </div>

          {/* Subcategory */}
          <div className="mt-3">
            <MazaadySelectInput
              value={subCategory}
              label="Sub Category"
              onChange={handleSubcategoryChange}
              items={subcategories}
              disabled={category ? false : true}
            />
          </div>

          {/* Dynamic properties */}
          <div>
            {subCategory &&
              properties.length &&
              properties.map((property) => (
                <div className="mt-3" key={property.id}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 550 }}>
                    <InputLabel id={`prop-label-${property.id}`}>
                      {property.name}
                    </InputLabel>
                    <Select
                      labelId={`prop-label-${property.id}`}
                      id={`prop-select-${property.id}`}
                      value={propertiesValues[property.id] || ''}
                      onChange={(e) => handleProcessTypeChange(property.id, e)}
                      label={property.name}
                    >
                      <MenuItem value="" key="select">
                        Select
                      </MenuItem>
                      {property.options &&
                        property.options.map((option) => (
                          <MenuItem value={option.id} key={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      <MenuItem value="other">others</MenuItem>
                    </Select>
                    {properties[property.id] === 'other' && (
                      <TextField
                        id={`other-input-${property.id}`}
                        label={`write ${property.name}`}
                        value={otherValue}
                        onChange={handleOtherInputChange}
                        sx={{ mt: 3 }}
                      />
                    )}
                  </FormControl>
                </div>
              ))}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-black text-white p-2 px-5 rounded-lg mt-6"
          >
            ارسال
          </button>
        </form>

        {/* Display selected data */}
        <div className="mt-7">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 750 }} aria-label="simple table">
              <TableBody>
                {selectedData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.category}</TableCell>
                    <TableCell>{data.subCategory}</TableCell>
                    {Object.entries(data.properties).map(
                      ([propertyName, propertyValue]) => (
                        <TableCell key={propertyName}>
                          {propertyValue}
                        </TableCell>
                      )
                    )}
                    <TableCell>{data.otherValue}</TableCell>
                    {/* <TableCell>{data.models}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Form;
