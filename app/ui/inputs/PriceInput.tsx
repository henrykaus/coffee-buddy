import clsx from 'clsx';
import {ChangeEvent, useState} from 'react';

interface PriceInputProps {
  className?: string;
  defaultValue?: number | string;
}

export default function PriceInput(props: PriceInputProps) {
  const {className, defaultValue} = props;

  const [value, setValue] = useState(defaultValue ?? '');

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rating = event.target.value;

    if (rating === '') {
      setValue('');
    }

    const ratingNumber = Number.parseFloat(rating);

    if (isNaN(ratingNumber)) {
      return;
    }

    if (ratingNumber >= 0) {
      setValue(rating);
    }
    ratingNumber.toFixed(2);
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const rating = event.target.value;
    const ratingNumber = Number.parseFloat(rating);

    if (isNaN(ratingNumber)) {
      setValue('');
    } else {
      setValue(Number.parseFloat(rating).toFixed(2));
    }
  };

  return (
    <span className='w-full flex items-baseline text-slate-500'>
      $
      <input
        value={value}
        type='text'
        name='price'
        placeholder='Price'
        className={clsx(className)}
        onChange={handleNumberChange}
        onBlur={handleBlur}
        required
      />
    </span>
  );
}
