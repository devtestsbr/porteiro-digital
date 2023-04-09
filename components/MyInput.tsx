import React from 'react';

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
};

export function MyInput({ value, onChange, name }: Props) {
  return (
    <>
      <label className='flex justify-between'>
        {name}
        <input
          className='ml-2 border-black border rounded-lg p-2'
          value={value ?? ''}
          name={name.toLowerCase()}
          onChange={onChange}
          onBlur={onChange}
        />
      </label>
      {value === '' ? (
        <span className='-mt-4 text-sm text-red-400'>{`Fill ${name}`}</span>
      ) : null}
    </>
  );
}
