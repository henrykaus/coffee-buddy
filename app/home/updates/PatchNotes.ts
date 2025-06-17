import {PatchNotes} from '@/app/lib/types';

export const PatchNoteContents: PatchNotes[] = [
  {
    divider: true,
    title: 'June 2025',
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
