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
  fetchModel,
  fetchOptionChilds,
} from '../store/categorySlice';
import { MazaadySelectInput } from './Inputs';
import { prototype } from 'postcss/lib/previous-map';

const Form = () => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [propertiesValues, setPropertiesValues] = useState({});
  const [otherValues, setOtherValues] = useState({});
  const [selectedData, setSelectedData] = useState([]);

  const dispatch = useDispatch();
  const { categories, subCategories, properties, optionChilds, status } =
    useSelector((state) => state.categories);

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

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ optionChilds:', optionChilds);
  }, [dispatch, optionChilds]);

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ propertiesValues:', propertiesValues);
  }, [dispatch, propertiesValues]);

  // get option childs
  useEffect(() => {
    for (const key in propertiesValues) {
      // console.log(propertiesValues[key]);
      for (const property in properties) {
        if (
          properties[property].name == key &&
          properties[property].options[0].child == true
        ) {
          for (const option in properties[property].options) {
            if (
              properties[property].options[option].name == propertiesValues[key]
            ) {
              const optionId = properties[property].options[option].id;
              console.log(properties[property].options[option].id);
              dispatch(fetchOptionChilds(optionId));
            }
          }
        }
      }
    }
  }, [dispatch, properties, propertiesValues]);

  // useEffect(() => {
  //   optionChilds.map((option) => {
  //     option.options.map(() => {
  //       if (option.child) {
  //         console.log('option.child');
  //         dispatch(fetchOptionChilds(option.id));
  //       }
  //     });
  //   });
  // }, [dispatch, optionChilds, propertiesValues]);

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setCategory(selectedCategoryId);
  };

  const handleSubcategoryChange = (event) => {
    const selectedSubcategoryId = event.target.value;
    setSubCategory(selectedSubcategoryId);
  };

  const handlePropertyChange = (event) => {
    setPropertiesValues((pv) => {
      return { ...pv, [event.target.name]: event.target.value };
    });
  };

  const handleOtherInputChange = (event) => {
    setOtherValues((pv) => {
      return { ...pv, [event.target.id]: event.target.value };
    });
  };

  // const getOptionChilds = (optionId) => {
  //   console.log('optionId', optionId)
  //   // dispatch(fetchOptionChilds(optionId));
  // };

  // const isMatchingOption = (name) => {
  //   const matchingOption = Object.entries(propertiesValues).find(
  //     ([key, value]) => {
  //       return value === name;
  //     }
  //   );

  //   // If matching option is found, return true
  //   if (matchingOption) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

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
      // ...optionChilds,
    };

    setSelectedData(newDataEntry);
    console.log(newDataEntry);

    // setCategory('');
    // setSubCategory('');
    // setPropertiesValues({});
    // setOtherValues({});
    // setModels('');
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
            {properties.length &&
              properties.map((property) => (
                <div className="mt-3" key={property.id}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 550 }}>
                    <InputLabel id={property.id}>{property.name}</InputLabel>
                    <Select
                      labelId={property.id}
                      id={property.name}
                      name={property.name}
                      value={propertiesValues[property.name] || ''}
                      onChange={(e) => handlePropertyChange(e)}
                      label={property.name}
                    >
                      <MenuItem value="" key="select">
                        Select
                      </MenuItem>
                      {property.options.map((option) => (
                        <MenuItem value={option.name} key={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                      <MenuItem value="other">other</MenuItem>
                    </Select>
                    {propertiesValues[property.name] === 'other' && (
                      <TextField
                        id={`other-${property.name}`}
                        label={`write ${property.name}`}
                        value={otherValues[property.name]}
                        onChange={handleOtherInputChange}
                        sx={{ mt: 3 }}
                      />
                    )}
                  </FormControl>
                </div>
              ))}

            {optionChilds.map((property) => (
              <div className="mt-3" key={property.id}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 550 }}>
                  <InputLabel id={property.id}>{property.name}</InputLabel>
                  <Select
                    labelId={property.id}
                    id={property.name}
                    name={property.name}
                    value={propertiesValues[property.name] || ''}
                    onChange={(e) => handlePropertyChange(e)}
                    label={property.name}
                  >
                    <MenuItem value="" key="select">
                      Select
                    </MenuItem>
                    {property.options.map((option) => (
                      <MenuItem value={option.name} key={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                    <MenuItem value="other">other</MenuItem>
                  </Select>
                  {propertiesValues[property.name] === 'other' && (
                    <TextField
                      id={`other-${property.name}`}
                      label={`write ${property.name}`}
                      value={otherValues[property.name]}
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
