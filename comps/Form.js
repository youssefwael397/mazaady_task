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
  updateSubCategories,
  fetchCategoryProperties,
  fetchOptionChilds,
  fetchChildOptionChilds,
} from '../store/categorySlice';
import { MazaadySelectInput, RenderOptions } from './Inputs';

const Form = () => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [propertiesValues, setPropertiesValues] = useState({});
  const [otherValues, setOtherValues] = useState({});
  const [selectedData, setSelectedData] = useState([]);

  const dispatch = useDispatch();
  const {
    categories,
    subCategories,
    properties,
    optionChilds,
    childOptionChilds,
    status,
  } = useSelector((state) => state.categories);

  // watchers for testing
  useEffect(() => {
    console.log(optionChilds);
  }, [optionChilds]);

  // get categories at first rendering
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  // get sub categories after category selected
  useEffect(() => {
    if (category) {
      dispatch(updateSubCategories(category));
    }
  }, [dispatch, category]);

  // get properties if sub category selected
  useEffect(() => {
    if (subCategory) {
      dispatch(fetchCategoryProperties(subCategory));
    }
  }, [dispatch, subCategory]);

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setCategory(selectedCategoryId);
  };

  const handleSubcategoryChange = (event) => {
    const selectedSubcategoryId = event.target.value;
    setSubCategory(selectedSubcategoryId);
  };

  const handlePropertyChange = (event, propertyType) => {
    const propertyName = event.target.value;

    if (propertyType == 'child_option') {
      for (const optionChildIndex in optionChilds) {
        for (const optionChildOptionIndex in optionChilds[optionChildIndex]
          .options) {
          if (
            optionChilds[optionChildIndex].options[optionChildOptionIndex]
              .child == true &&
            optionChilds[optionChildIndex].options[optionChildOptionIndex]
              .name == propertyName
          ) {
            const optionId =
              optionChilds[optionChildIndex].options[optionChildOptionIndex].id;
            dispatch(fetchChildOptionChilds(optionId));
          }
        }
      }
    } else if (propertyType == 'option') {
      for (const propertyIndex in properties) {
        for (const optionIndex in properties[propertyIndex].options) {
          if (
            properties[propertyIndex].options[optionIndex].child == true &&
            properties[propertyIndex].options[optionIndex].name == propertyName
          ) {
            const optionId = properties[propertyIndex].options[optionIndex].id;
            dispatch(fetchOptionChilds(optionId));
          }
        }
      }
    }
    setPropertiesValues((pv) => {
      return { ...pv, [event.target.name]: event.target.value };
    });
  };

  const handleOtherInputChange = (event) => {
    setOtherValues((pv) => {
      return { ...pv, [event.target.id]: event.target.value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedCategory = categories.find((cat) => cat.id === category);
    const categoryName = selectedCategory ? selectedCategory.name : '';

    const selectedSubCategory = subCategories.find(
      (subcat) => subcat.id === subCategory
    );
    const subCategoryName = selectedSubCategory ? selectedSubCategory.name : '';

    const newDataEntry = {
      category: categoryName,
      subCategory: subCategoryName,
      ...propertiesValues,
      ...otherValues,
    };

    setSelectedData(newDataEntry);
    console.log(newDataEntry);
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
              items={subCategories}
              disabled={category ? false : true}
            />
          </div>

          {/* Dynamic properties */}
          <div>
            <RenderOptions
              handleOtherInputChange={handleOtherInputChange}
              options={properties}
              handlePropertyChange={(e) => handlePropertyChange(e, 'option')}
              propertiesValues={propertiesValues}
              otherValues={otherValues}
            />

            <RenderOptions
              handleOtherInputChange={handleOtherInputChange}
              options={optionChilds}
              handlePropertyChange={(e) =>
                handlePropertyChange(e, 'child_option')
              }
              propertiesValues={propertiesValues}
              otherValues={otherValues}
            />

            <RenderOptions
              handleOtherInputChange={handleOtherInputChange}
              options={childOptionChilds}
              handlePropertyChange={handlePropertyChange}
              propertiesValues={propertiesValues}
              otherValues={otherValues}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-black text-white p-2 px-5 rounded-lg mt-6"
          >
            Search
          </button>
        </form>

        {/* Display selected data */}
        <div className="mt-7">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 750 }} aria-label="simple table">
              <TableBody>
                {Object.entries(selectedData).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{value}</TableCell>
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
