import React from 'react';
import FieldPopup from '@/app/ui/common/FieldPopup';
import {RatingOffIcon} from '@/app/ui/icons';
import RatingInputText from '@/app/ui/inputs/RatingInputText';

interface RatingInputProps {
  className?: string;
  defaultValue?: number | string;
}

export default function RatingInput(props: RatingInputProps) {
  const {defaultValue, className} = props;

  return (
    <FieldPopup icon={<RatingOffIcon />}>
      <RatingInputText defaultValue={defaultValue} className={className} />
    </FieldPopup>
  );
}
