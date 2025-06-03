import React, {useState} from 'react';
import FieldPopup from '@/app/ui/common/FieldPopup';
import {RatingOffIcon, StarIcon} from '@/app/ui/icons';
import RatingInputPopUp from '@/app/ui/inputs/RatingInputPopUp';

interface RatingInputProps {
  defaultValue?: number;
}

export default function RatingInput(props: RatingInputProps) {
  const {defaultValue = -1} = props;

  const [showAltIcon, setShowAltIcon] = useState(defaultValue > -1);

  return (
    <FieldPopup
      icon={<RatingOffIcon strokeWidth={2.25} />}
      altIcon={<StarIcon fill='#94a3b8' strokeWidth={2.25} />}
      showAltIcon={showAltIcon}
    >
      <RatingInputPopUp
        defaultValue={defaultValue}
        shouldShowIcon={(showIcon) => setShowAltIcon(showIcon)}
      />
    </FieldPopup>
  );
}
