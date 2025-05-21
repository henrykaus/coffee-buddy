import {DrinkGlassIcon, MugIcon, StoreIcon} from '@/app/ui/icons';

// IMPORTANT: Read these instructions before editing/adding to this file
// For the infinite animation appear truly infinite, each icon must be positioned
// according to the left bottom corner. To get the mirror of each icon
// (which is required unless the icon starts off-screen), the formula for the reverse is...
// invert the sign of the position, and then subtract the position from 100%.
// Example 1: left-[25%] -> -left-[75%]
// Example 2: bottom-[calc(100%-7rem)] -> -bottom-[7rem]

export default function MovingBackground() {
  return (
    <div
      className='absolute -z-10 h-screen w-screen animate-(--animate-login)'
      aria-hidden
    >
      {/* ON-SCREEN */}
      <StoreIcon
        className='absolute left-[10%] bottom-[5%] text-[#e5cfb4] rotate-[10deg]'
        height={100}
        width={100}
        strokeWidth={2}
      />
      <StoreIcon
        className='absolute left-[12%] bottom-[90%] text-[#e5cfb4] rotate-[-30deg]'
        height={60}
        width={60}
      />
      <MugIcon
        className='absolute left-[32%] bottom-[55%] text-[#e5cfb4] rotate-[-16deg]'
        height={100}
        width={100}
      />
      <DrinkGlassIcon
        className='absolute left-[73%] bottom-[79%] text-[#e5cfb4] rotate-[-6deg]'
        height={120}
        width={120}
        strokeWidth={2.25}
      />
      {/* OFF-SCREEN */}
      <StoreIcon
        className='absolute left-[-11rem] bottom-[calc(100%-30rem)] text-[#e5cfb4] rotate-[-8deg]'
        height={120}
        width={120}
        strokeWidth={1.75}
      />
      <MugIcon
        className='absolute left-[50%] bottom-[-10rem] text-[#e5cfb4] rotate-[20deg]'
        height={140}
        width={140}
        strokeWidth={2}
      />
      <StoreIcon
        className='absolute left-[calc(100%+6rem)] bottom-[calc(100%-30rem)] text-[#e5cfb4] rotate-[-20deg]'
        height={100}
        width={100}
      />
      {/* MIRRORS */}
      <StoreIcon
        className='absolute -left-[90%] -bottom-[95%] text-[#e5cfb4] rotate-[10deg]'
        height={100}
        width={100}
        strokeWidth={2}
      />
      <StoreIcon
        className='absolute -left-[88%] -bottom-[10%] text-[#e5cfb4] rotate-[-30deg]'
        height={60}
        width={60}
      />
      <MugIcon
        className='absolute -left-[68%] -bottom-[45%] text-[#e5cfb4] rotate-[-16deg]'
        height={100}
        width={100}
      />
      <DrinkGlassIcon
        className='absolute -left-[27%] -bottom-[21%] text-[#e5cfb4] rotate-[-6deg]'
        height={120}
        width={120}
        strokeWidth={2.25}
      />
    </div>
  );
}
