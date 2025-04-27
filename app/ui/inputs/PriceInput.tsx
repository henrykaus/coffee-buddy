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
