import { api } from '../axios/Axios';

class CategoryService {
  static async getMainCategories() {
    try {
      const url = 'get_all_cats';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getCategoryProperties(categoryId) {
    try {
      const url = `properties?cat=${categoryId}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getOptionChilds(optionId) {
    try {
      const url = `get-options-child/${optionId}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default CategoryService;
