import { ValidateInput, ValidateInputParams } from '../types/validation';

const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const textRegex = /^[a-zA-Z0-9\s.,;:'"()]+$/;

export const validateInput = ({
  value,
  name,
}: ValidateInputParams): ValidateInput => {
  let hasError = false;
  let error = '';
  const formValue = value.trim();

  switch (name) {
    case 'email':
      if (formValue === '') {
        hasError = true;
        error = 'Email is required';
      } else if (!emailRegex.test(formValue)) {
        hasError = true;
        error = 'Email is invalid';
      } else {
        hasError = false;
        error = '';
      }
      break;
    case 'password':
      if (formValue === '') {
        hasError = true;
        error = 'Password is required';
      } else {
        if (formValue.length < 8) {
          hasError = true;
          error = 'Password should be at least 8 characters long';
        }

        if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formValue)) {
          hasError = true;
          error = 'Password should contain at least one letter and one number';
        }

        if (!hasError) {
          error = '';
        }
      }
      break;
    case 'task':
      if (formValue === '') {
        hasError = true;
        error = 'Task is required';
      } else if (!textRegex.test(formValue)) {
        hasError = true;
        error = 'Task is invalid';
      } else {
        hasError = false;
        error = '';
      }
      break;
    case 'description':
      if (formValue === '') {
        hasError = true;
        error = 'Description is required';
      } else if (!textRegex.test(formValue)) {
        hasError = true;
        error = 'Description is invalid';
      } else {
        hasError = false;
        error = '';
      }
      break;
    default:
      break;
  }

  return { hasError, error };
};
