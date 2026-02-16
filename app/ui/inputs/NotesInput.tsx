import React, {useState} from 'react';
import {NOTES_PLACEHOLDER_KEYWORDS} from '@/app/lib/constants';
import FieldPopup from '@/app/ui/common/FieldPopup';
import {NoNotesIcon, NotesIcon} from '@/app/ui/icons';

interface NotesInputProps {
  defaultValue?: string;
}

export default function NotesInput(props: NotesInputProps) {
  const {defaultValue} = props;

  const [showAltIcon, setShowAltIcon] = useState(!!defaultValue);
  const [numChars, setNumChars] = useState<number>(defaultValue?.length ?? 0);

  const selectRandomPlaceholder = () => {
    const randomNumber = Math.floor(
      Math.random() * NOTES_PLACEHOLDER_KEYWORDS.length,
    );

    return NOTES_PLACEHOLDER_KEYWORDS[randomNumber];
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length > 0) {
      setShowAltIcon(true);
    } else {
      setShowAltIcon(false);
    }

    setNumChars(e.currentTarget.value.length);
  };

  return (
    <FieldPopup
      icon={<NoNotesIcon />}
      altIcon={<NotesIcon fill='#aebfd6' />}
      showAltIcon={showAltIcon}
    >
      <div className='border-2 border-slate-300 focus-within:border-slate-400 bg-(--background) shadow-xl rounded-2xl transition w-[calc(100%-2.5rem)] mx-5 overflow-hidden'>
        <textarea
          placeholder={selectRandomPlaceholder()}
          name='notes'
          aria-label='Notes'
          className='block outline-hidden text-slate-600 p-4 py-3 resize-none text-base w-full'
          rows={5}
          defaultValue={defaultValue}
          suppressHydrationWarning
          onChange={handleChange}
          maxLength={500}
        />
      </div>
      <p className='absolute bottom-2 end-7 text-slate-500 font-medium text-sm bg-slate-200/50 backdrop-blur-xs px-2 py-1 rounded-full tracking-tighter'>
        {numChars}/500
      </p>
    </FieldPopup>
  );
}
