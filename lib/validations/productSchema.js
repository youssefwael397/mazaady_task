import * as yup from 'yup';

export const searchProductSchema = yup.object().shape({
  category: yup
    .string()
    .nullable()
    .required('Customer name is required'),
    
});
