import CategoryService from '../services/CategoryService';
import { api } from '../axios/Axios';

// Mock Axios module
jest.mock('../axios/Axios');

describe('CategoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock calls before each test
  });

  it('fetches main categories successfully', async () => {
    const mockData = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ];
    api.get.mockResolvedValue({ data: mockData });

    const mainCategories = await CategoryService.getMainCategories();

    expect(mainCategories).toEqual(mockData);
    expect(api.get).toHaveBeenCalledWith('get_all_cats');
  });

  it('throws an error when fetching main categories fails', async () => {
    const errorMessage = 'Failed to fetch main categories';
    api.get.mockRejectedValue(new Error(errorMessage));

    await expect(CategoryService.getMainCategories()).rejects.toThrow(
      errorMessage
    );
    expect(api.get).toHaveBeenCalledWith('get_all_cats');
  });

  it('fetches category properties successfully', async () => {
    const categoryId = 1;
    const mockData = [
      { id: 1, name: 'Property 1' },
      { id: 2, name: 'Property 2' },
    ];
    api.get.mockResolvedValue({ data: mockData });

    const properties = await CategoryService.getCategoryProperties(categoryId);

    expect(properties).toEqual(mockData);
    expect(api.get).toHaveBeenCalledWith(`properties?cat=${categoryId}`);
  });

  it('throws an error when fetching category properties fails', async () => {
    const categoryId = 1;
    const errorMessage = 'Failed to fetch category properties';
    api.get.mockRejectedValue(new Error(errorMessage));

    await expect(
      CategoryService.getCategoryProperties(categoryId)
    ).rejects.toThrow(errorMessage);
    expect(api.get).toHaveBeenCalledWith(`properties?cat=${categoryId}`);
  });

  it('fetches option childs successfully', async () => {
    const optionId = 1;
    const mockData = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
    ];
    api.get.mockResolvedValue({ data: mockData });

    const optionChilds = await CategoryService.getOptionChilds(optionId);

    expect(optionChilds).toEqual(mockData);
    expect(api.get).toHaveBeenCalledWith(`get-options-child/${optionId}`);
  });

  it('throws an error when fetching option childs fails', async () => {
    const optionId = 1;
    const errorMessage = 'Failed to fetch option childs';
    api.get.mockRejectedValue(new Error(errorMessage));

    await expect(CategoryService.getOptionChilds(optionId)).rejects.toThrow(
      errorMessage
    );
    expect(api.get).toHaveBeenCalledWith(`get-options-child/${optionId}`);
  });
});
