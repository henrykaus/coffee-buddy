import React from 'react';
import {NOTES_PLACEHOLDER_KEYWORDS} from '@/app/lib/constants';
import FieldPopup from '@/app/ui/common/FieldPopup';
import {NotesIcon} from '@/app/ui/icons';

interface NotesInputProps {
  defaultValue?: string;
}

export default function NotesInput(props: NotesInputProps) {
  const {defaultValue} = props;

  const selectRandomPlaceholder = () => {
    const randomNumber = Math.floor(
      Math.random() * NOTES_PLACEHOLDER_KEYWORDS.length,
    );

    return NOTES_PLACEHOLDER_KEYWORDS[randomNumber];
  };

  return (
    <FieldPopup icon={<NotesIcon />}>
      <textarea
        placeholder={selectRandomPlaceholder()}
        name='notes'
        aria-label='Notes'
        className='border-2 border-slate-300 bg-(--background) shadow-xl rounded-2xl outline-hidden focus:border-b-slate-400 text-slate-600 transition p-2 resize-none text-lg w-80'
        rows={4}
        defaultValue={defaultValue}
        suppressHydrationWarning
      />
    </FieldPopup>
  );
}
