import React, { useState } from 'react';

export type InputValues = {
  [key: string]: any;
}

type UseFormReturnType = {
  values: InputValues;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setValues: React.Dispatch<React.SetStateAction<InputValues>>;
};

export function useForm(inputValues: InputValues): UseFormReturnType {
  const [values, setValues] = useState<InputValues>(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { value, name } = event.target;

    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
