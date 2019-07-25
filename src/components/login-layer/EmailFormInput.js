import React from 'react';
import { FormField, TextInput } from 'grommet';

const EmailFormInput = ({ value, name, onChange, error, type, label }) => (
  <FormField label={label} error={error}>
    <TextInput type={type} value={value} name={name} onChange={onChange} />
  </FormField>
);

EmailFormInput.defaultProps = {
  type: 'text',
};

export default EmailFormInput;