import {ChangeEvent, useState} from 'react';

interface PriceInputProps {
  className?: string;
  defaultValue?: number | string;
  onChange?: (price: string) => void;
}

export default function PriceInput(props: PriceInputProps) {
  const {className, defaultValue, onChange} = props;

  const [value, setValue] = useState(defaultValue ?? '');

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const numberString = event.target.value;
    const number = Number.parseFloat(numberString);

    if (numberString === '') {
      setValue('');
    }

    if (isNaN(number)) {
      return;
    } else if (number >= 0) {
      setValue(numberString);
    }

    if (onChange) onChange(numberString);
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const numberString = event.target.value;
    const number = Number.parseFloat(numberString);

    const numberToSet = isNaN(number)
      ? ''
      : Number.parseFloat(numberString).toFixed(2);

    setValue(numberToSet);

    if (onChange) onChange(numberString);
  };

  return (
    <span className='min-w-0 flex grow items-baseline text-slate-500'>
      $
      <input
        value={value}
        type='text'
        name='price'
        placeholder='0.00'
        className={className}
        onChange={handleNumberChange}
        onBlur={handleBlur}
        required
      />
    </span>
  );
}
