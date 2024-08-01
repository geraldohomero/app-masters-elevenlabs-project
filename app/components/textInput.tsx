import React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <TextareaAutosize
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
    />
  );
};

export default TextInput;