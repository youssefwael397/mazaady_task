import CategoryService from '@/services/CategoryService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await CategoryService.getMainCategories();
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCategoryProperties = createAsyncThunk(
  'categories/fetchCategoryProperties',
  async (categoryId, { rejectWithValue }) => {
    try {
      const res = await CategoryService.getCategoryProperties(categoryId);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOptionChilds = createAsyncThunk(
  'categories/fetchOptionChilds',
  async (optionId, { rejectWithValue }) => {
    try {
      const res = await CategoryService.getOptionChilds(optionId);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchChildOptionChilds = createAsyncThunk(
  'categories/fetchChildOptionChilds',
  async (optionId, { rejectWithValue }) => {
    try {
      const res = await CategoryService.getOptionChilds(optionId);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    subCategories: [],
    properties: [],
    optionChilds: [],
    childOptionChilds: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    updateSubCategories: (state, action) => {
      const selectedCategoryId = action.payload;
      const selectedCategory = state.categories.find(
        (cat) => cat.id === selectedCategoryId
      );
      state.subCategories = selectedCategory ? selectedCategory.children : [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload.categories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // categoriesProperties
      .addCase(fetchCategoryProperties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryProperties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.properties = action.payload;
      })
      .addCase(fetchCategoryProperties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // optionChilds
      .addCase(fetchOptionChilds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOptionChilds.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.optionChilds.filter((child) => {
          if (child.name == action.payload.name) {
            return false;
          } else {
            return true;
          }
        });

        state.optionChilds = [...action.payload];
      })
      .addCase(fetchOptionChilds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // optionChilds
      .addCase(fetchChildOptionChilds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChildOptionChilds.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.childOptionChilds.filter((child) => {
          if (child.name == action.payload.name) {
            return false;
          } else {
            return true;
          }
        });

        state.childOptionChilds = [...action.payload];
      })
      .addCase(fetchChildOptionChilds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updateSubCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
