'use client';

import {ChangeEvent, useState} from 'react';
import clsx from 'clsx';

interface RatingInputProps {
  className?: string;
  defaultValue?: number | string;
}

export default function RatingInputText(props: RatingInputProps) {
  const {className, defaultValue} = props;

  const [value, setValue] = useState(defaultValue ?? '');

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rating = event.target.value;
    const ratingNumber = Number(rating);

    if (isNaN(ratingNumber)) {
      return;
    }

    if (!(ratingNumber < 0) && !(ratingNumber > 5)) {
      setValue(event.target.value);
    }
  };

  return (
    <div className='flex items-baseline text-slate-500 shadow-lg rounded-full border-2 border-slate-300 py-2 px-3 bg-(--background)'>
      <input
        type='text'
        value={value}
        name='rating'
        aria-label='Rating'
        placeholder='#'
        className={clsx(className, 'w-10 text-end')}
        onChange={handleNumberChange}
      />
      /5
    </div>
  );
}
