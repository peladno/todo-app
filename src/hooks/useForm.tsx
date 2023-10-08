import {useReducer} from 'react';
import {
  onChangeProps,
  InputActions,
  FormState,
  FormAction,
} from '../types/input';
import {validateInput} from '../utils/func';
const formReducer = (state: FormState, action: FormAction) => {
  const {type, data} = action;

  switch (type) {
    case InputActions.INPUT_CHANGE:
      return {
        ...state,
        [data.name]: {
          ...state[data.name],
          value: data.value,
          error: data.error,
          hasError: data.hasError,
          active: data.active,
          isFormValid: data.isFormValid,
        },
      };
    case InputActions.INPUT_FOCUS:
      return {
        ...state,
        [data.name]: {
          ...state[data.name],
          active: data.active,
        },
      };

    default:
      return state;
  }
};

export const useForm = (initialState: FormState) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const onChange = ({text, name}: onChangeProps) => {
    const {error, hasError} = validateInput({value: text, name});

    dispatch({
      type: InputActions.INPUT_CHANGE,
      data: {
        value: text,
        name,
        error,
        hasError,
        active: true,
        isFormValid: !hasError,
      },
    });
  };

  const validateForm = () => {
    let isValid = true;
    Object.keys(state).forEach(key => {
      if (!state[key].isFormValid) {
        isValid = false;
      }
    });
    return isValid;
  };

  const onFocus = (name: string) => {
    dispatch({
      type: InputActions.INPUT_FOCUS,
      data: {
        name,
        active: true,
        hasError: false,
        error: '',
        isFormValid: false,
        value: '',
      },
    });
  };
  const onBlur = (name: string) => {
    dispatch({
      type: InputActions.INPUT_FOCUS,
      data: {
        name,
        active: false,
        hasError: false,
        error: '',
        isFormValid: false,
        value: '',
      },
    });
  };

  return {
    formState: state,
    onChange,
    isFormValid: validateForm(),
    onFocus,
    onBlur,
  };
};
