import {PatchNotes} from '@/app/lib/types';

export const PatchNoteContents: PatchNotes[] = [
  {
    divider: true,
    title: 'June 2025',
  },
  {
    title: 'No more missing fields',
    date: 'June 19, 2025',
    features: [
      'We now prevent you from even attempting to save when required visit fields — shop, drink, and price — are missing.',
    ],
    fixes: ['Fixed issue where you could save empty whitespace as a drink.'],
  },
  {
    title: "What's New!",
    date: 'June 15, 2025',
    features: [
      "Added the What's New page.",
      'Better supported desktop for adding/editing visit entries, viewing the more options menu, and using the account deletion popup.',
    ],
    fixes: [
      'Fixed the alignment of menu icons.',
      'Accidentally improved loading time of home page on mobile.',
      "Fixed issue where city/town/village/hamlet wouldn't always show up in shop search dropdown.",
    ],
  },
];
