'use client';

import {useRef, useState} from 'react';
import {StarIcon} from '@/app/ui/icons';

interface RatingInputProps {
  defaultValue?: number;
  shouldShowIcon?: (showIcon: boolean) => void;
}

export default function RatingInputText(props: RatingInputProps) {
  const {defaultValue, shouldShowIcon} = props;

  const [currentRating, setCurrentRating] = useState(defaultValue ?? 0);

  const showSelectedIcon = (showIcon: boolean) => {
    if (shouldShowIcon) {
      shouldShowIcon(showIcon);
    }
  };

  const handleStarSelect = (rating: number) => {
    if (rating === currentRating) {
      setCurrentRating(0);
      showSelectedIcon(false);
    } else {
      setCurrentRating(rating);
      showSelectedIcon(true);
    }
  };

  const shouldBeHighlighted = (rating: number) => {
    return currentRating >= rating ? 'currentColor' : 'none';
  };

  // TODO: Is there a better way?
  const ref1 = useRef<HTMLButtonElement>(null);
  const ref2 = useRef<HTMLButtonElement>(null);
  const ref3 = useRef<HTMLButtonElement>(null);
  const ref4 = useRef<HTMLButtonElement>(null);
  const ref5 = useRef<HTMLButtonElement>(null);
  const refs = [ref1, ref2, ref3, ref4, ref5];

  return (
    <div className='text-slate-500 shadow-lg rounded-full border-2 border-slate-300 py-2 px-3 bg-(--background) w-fit mx-auto'>
      <ul className='flex gap-2'>
        {refs.map((ref, index) => (
          <li className='flex w-10 h-10' key={index}>
            <button
              ref={ref}
              type='button'
              className='cursor-pointer rounded-full hover:bg-slate-200 hover:shadow-md transition w-10 h-10 flex items-center justify-center'
              onClick={() => handleStarSelect(index + 1)}
            >
              <StarIcon
                height={30}
                width={30}
                fill={shouldBeHighlighted(index + 1)}
              />
            </button>
          </li>
        ))}
      </ul>
      <input type='text' value={currentRating} name='rating' readOnly hidden />
    </div>
  );
}
