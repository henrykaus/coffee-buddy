import {ChangeEvent, useState} from 'react';
import clsx from 'clsx';

interface SizeInputProps {
  className?: string;
  defaultValue?: number | string;
}

export default function SizeInput(props: SizeInputProps) {
  const {className, defaultValue} = props;

  const [value, setValue] = useState(defaultValue ?? '');

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const size = event.target.value;

    if (size === '') {
      setValue('');
    }

    const sizeNumber = Number.parseInt(size);

    if (isNaN(sizeNumber)) {
      return;
    }

    if (sizeNumber >= 0) {
      setValue(size);
    }
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const size = event.target.value;
    const sizeNumber = Number.parseInt(size);

    if (isNaN(sizeNumber)) {
      setValue('');
    } else {
      setValue(sizeNumber);
    }
  };

  return (
    <span className='flex items-baseline text-slate-500'>
      <input
        value={value}
        type='text'
        name='size'
        placeholder='#'
        className={clsx(className, 'w-10 text-end')}
        onChange={handleNumberChange}
        onBlur={handleBlur}
        required
      />
      oz.
    </span>
  );
}
