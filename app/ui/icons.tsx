export interface IconProps {
  className?: string;
  height?: number;
  width?: number;
  strokeWidth?: number;
  fill?: string;
}

export const CalendarIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M8 2v4' />
      <path d='M16 2v4' />
      <rect width='18' height='18' x='3' y='4' rx='2' />
      <path d='M3 10h18' />
      <path d='M8 14h.01' />
      <path d='M12 14h.01' />
      <path d='M16 14h.01' />
      <path d='M8 18h.01' />
      <path d='M12 18h.01' />
      <path d='M16 18h.01' />
    </svg>
  );
};

export const CancelIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <circle cx='12' cy='12' r='10' />
      <path d='m4.9 4.9 14.2 14.2' />
    </svg>
  );
};

export const CheckIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 3,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M20 6 9 17l-5-5' />
    </svg>
  );
};

export const ChevronDownIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 3,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='m6 9 6 6 6-6' />
    </svg>
  );
};

export const CircleIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <circle cx='12' cy='12' r='10' />
    </svg>
  );
};

export const CircleAlertIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <circle cx='12' cy='12' r='10' />
      <line x1='12' x2='12' y1='8' y2='12' />
      <line x1='12' x2='12.01' y1='16' y2='16' />
    </svg>
  );
};

export const CircleCheckIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <circle cx='12' cy='12' r='10' />
      <path d='m9 12 2 2 4-4' />
    </svg>
  );
};

export const CloseIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M18 6 6 18' />
      <path d='m6 6 12 12' />
    </svg>
  );
};

export const ClosePanelIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <rect width='18' height='18' x='3' y='3' rx='2' />
      <path d='M15 3v18' />
      <path d='m10 15-3-3 3-3' />
    </svg>
  );
};

export const CoffeeBeanIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M4.05 19.95a11.24 8.585 135 0 0 15.9-15.9 11.24 8.585 135 0 0-15.9 15.9' />
      <path d='M19.8 4.2C20 14 4 10 4.2 19.8' />
    </svg>
  );
};

export const DrinkGlassIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z' />
      <path d='M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0' />
    </svg>
  );
};

export const EditIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
      <path d='M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z' />
    </svg>
  );
};

export const EllipsisIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <circle cx='12' cy='12' r='1' />
      <circle cx='19' cy='12' r='1' />
      <circle cx='5' cy='12' r='1' />
    </svg>
  );
};

export const GhostIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M9 10h.01' />
      <path d='M15 10h.01' />
      <path d='M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z' />
    </svg>
  );
};

export const HomeIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8' />
      <path d='M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
    </svg>
  );
};

export const InfoIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <circle cx='12' cy='12' r='10' />
      <path d='M12 16v-4' />
      <path d='M12 8h.01' />
    </svg>
  );
};

export const LogOutIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
      <polyline points='16 17 21 12 16 7' />
      <line x1='21' x2='9' y1='12' y2='12' />
    </svg>
  );
};

export const MugIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M10 2v2' />
      <path d='M14 2v2' />
      <path d='M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1' />
      <path d='M6 2v2' />
    </svg>
  );
};

export const NotesIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <rect width='16' height='18' x='4' y='4' rx='2' />
      <path d='M8 2v4' />
      <path d='M12 2v4' />
      <path d='M16 2v4' />
      <path d='M8 10h6' />
      <path d='M8 14h8' />
      <path d='M8 18h5' />
    </svg>
  );
};

export const NoNotesIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M8 2v4' />
      <path d='M12 2v4' />
      <path d='M16 2v4' />
      <rect width='16' height='18' x='4' y='4' rx='2' />
    </svg>
  );
};

export const OpenPanelIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <rect width='18' height='18' x='3' y='3' rx='2' />
      <path d='M15 3v18' />
      <path d='m8 9 3 3-3 3' />
    </svg>
  );
};

export const PlusIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M5 12h14' />
      <path d='M12 5v14' />
    </svg>
  );
};

export const RatingOffIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M8.34 8.34 2 9.27l5 4.87L5.82 21 12 17.77 18.18 21l-.59-3.43' />
      <path d='M18.42 12.76 22 9.27l-6.91-1L12 2l-1.44 2.91' />
      <line x1='2' x2='22' y1='2' y2='22' />
    </svg>
  );
};

export const SearchIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
};

export const SearchCheckIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='m8 11 2 2 4-4' />
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
};

export const SearchXIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='m13.5 8.5-5 5' />
      <path d='m8.5 8.5 5 5' />
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
};

export const StarIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
    </svg>
  );
};

export const StoreIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7' />
      <path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8' />
      <path d='M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4' />
      <path d='M2 7h20' />
      <path d='M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7' />
    </svg>
  );
};

export const ToGoCupIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M4 7h16' />
      <path d='m18.2 11 .8-4-.8-4c-.1-.5-.6-1-1.2-1H7c-.6 0-1.1.4-1.2 1C5.5 4.4 5 7 5 7l.8 4' />
      <path d='M18 18H6l-1-7h14Z' fill='currentColor' fillOpacity='0.5' />
      <path d='m7.2 18 .6 3c.1.5.6 1 1.2 1h6c.6 0 1.1-.4 1.2-1l.6-3' />
    </svg>
  );
};

export const TrashIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M3 6h18' />
      <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
      <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
      <line x1='10' x2='10' y1='11' y2='17' />
      <line x1='14' x2='14' y1='11' y2='17' />
    </svg>
  );
};

export const UserIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <circle cx='12' cy='12' r='10' />
      <circle cx='12' cy='10' r='3' />
      <path d='M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662' />
    </svg>
  );
};

export const WhatsNewIcon = (props: IconProps) => {
  const {
    className,
    height = 24,
    width = 24,
    strokeWidth = 2.5,
    fill = 'none',
  } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='m18 16 4-4-4-4' />
      <path d='m6 8-4 4 4 4' />
      <path d='m14.5 4-5 16' />
    </svg>
  );
};
