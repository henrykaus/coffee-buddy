import {PatchNotes} from '@/app/lib/types';

export const PatchNoteContents: PatchNotes[] = [
  {
    divider: true,
    title: 'November 2025',
  },
  {
    title: 'Details, details, details',
    date: 'Nov. 23, 2025',
    features: ['Updated the little icon in the tab to be coffee-themed.'],
  },
  {
    divider: true,
    title: 'October 2025',
  },
  {
    title: 'The Little Things',
    date: 'Oct. 4, 2025',
    fixes: [
      'Fixed issue where editing a visit description on desktop could cause the text would run off-screen.',
    ],
  },
  {
    divider: true,
    title: 'July 2025',
  },
  {
    title: 'Skeletons in the Closet',
    date: 'July 14, 2025',
    features: [
      'Added a loading "Skeleton" to the What\'s New page to improve perceived load time.',
    ],
  },
  {
    title: 'Catching Those Errors',
    date: 'July 7, 2025',
    features: [
      'We now show login error messages if any occur.',
      'Added a character counter to the shop notes input.',
    ],
    fixes: [
      'When searching for shops, the entries now utilize the dropdown area better.',
      'Fixed issue where a failed login would redirect you to an unknown page.',
      'Added better placeholder text for the Coffee shop search field when adding a visit.',
      'Security updates.',
    ],
  },
  {
    divider: true,
    title: 'June 2025',
  },
  {
    title: 'A Little Help',
    date: 'June 19, 2025',
    features: [
      'We now prevent you from even attempting to save when required visit fields — shop, drink, and price — are missing.',
      'Added a handy shadow to the header when the page has been scrolled (hint: try scrolling down on this page).',
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
