import * as yup from 'yup';
export const validationSchema = yup.object({
    name: yup
        .string('Enter Your Name')
        .required('Name is required'),
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    gender: yup
      .string('Select Gender')
      .required('Gender is required'),
  })