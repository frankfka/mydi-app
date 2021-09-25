import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import {
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form/dist/types';
import { Controller } from 'react-hook-form';

type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = TextFieldProps & {
  controllerProps: Omit<ControllerProps<TFieldValues, TName>, 'render'>;
};

// Additional components: https://github.com/Mohammad-Faisal/react-hook-form-material-ui/tree/master/src/form-components
const FormTextField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  controllerProps,
  ...textFieldProps
}: Props<TFieldValues, TName>) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field, fieldState: { error } }) => (
        <TextField
          helperText={error ? error : null}
          {...field}
          {...textFieldProps}
        />
      )}
    />
  );
};

export default FormTextField;
