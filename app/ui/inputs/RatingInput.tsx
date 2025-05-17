import React, {useState} from 'react';
import FieldPopup from '@/app/ui/common/FieldPopup';
import {RatingOffIcon, StarIcon} from '@/app/ui/icons';
import RatingInputText from '@/app/ui/inputs/RatingInputText';

interface RatingInputProps {
  defaultValue?: number;
}

export default function RatingInput(props: RatingInputProps) {
  const {defaultValue} = props;

  const [showAltIcon, setShowAltIcon] = useState(!!defaultValue);

  return (
    <FieldPopup
      icon={<RatingOffIcon strokeWidth={2.25} />}
      altIcon={<StarIcon fill='#94a3b8' strokeWidth={2.25} />}
      showAltIcon={showAltIcon}
    >
      <RatingInputText
        defaultValue={defaultValue}
        shouldShowIcon={(showIcon) => setShowAltIcon(showIcon)}
      />
    </FieldPopup>
  );
}
