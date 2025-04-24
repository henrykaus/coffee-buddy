import {MugIcon} from '@/app/ui/icons';

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
      className='absolute -z-10 h-screen w-screen animate-[--animate-login]'
      aria-hidden
    >
      {/*animate-[--animate-login]'>*/}
      {/*<div className='animate-[--animate-login]'>*/}
      {/* ON-SCREEN */}
      <MugIcon
        className='absolute left-[10%] bottom-[5%] text-yellow-700/30 rotate-[10deg]'
        height={100}
        width={100}
      />
      <MugIcon
        className='absolute left-[75%] bottom-[5%] text-yellow-700/30 rotate-[-45deg]'
        height={80}
        width={80}
      />
      <MugIcon
        className='absolute left-[12%] bottom-[90%] text-yellow-700/30 rotate-[-12deg]'
        height={60}
        width={60}
      />
      <MugIcon
        className='absolute left-[32%] bottom-[55%] text-yellow-700/30 rotate-[-16deg]'
        height={100}
        width={100}
      />
      <MugIcon
        className='absolute left-[73%] bottom-[79%] text-yellow-700/30 rotate-6'
        height={100}
        width={100}
      />
      {/* OFF-SCREEN */}
      <MugIcon
        className='absolute left-[-11rem] bottom-[calc(100%-30rem)] text-yellow-700/30 rotate-6'
        height={100}
        width={100}
      />
      <MugIcon
        className='absolute left-[50%] bottom-[-10rem] text-yellow-700/30 rotate-[-20deg]'
        height={100}
        width={100}
      />
      <MugIcon
        className='absolute left-[calc(100%+6rem)] bottom-[calc(100%-30rem)] text-yellow-700/30 rotate-[-20deg]'
        height={100}
        width={100}
      />
      {/* MIRRORS */}
      <MugIcon
        className='absolute -left-[90%] -bottom-[95%] text-yellow-700/30 rotate-[10deg]'
        height={100}
        width={100}
      />
      <MugIcon
        className='absolute -left-[25%] -bottom-[95%] text-yellow-700/30 rotate-[-45deg]'
        height={80}
        width={80}
      />
      <MugIcon
        className='absolute -left-[88%] -bottom-[10%] text-yellow-700/30 rotate-[-12deg]'
        height={60}
        width={60}
      />
      <MugIcon
        className='absolute -left-[68%] -bottom-[45%] text-yellow-700/30 rotate-[-16deg]'
        height={100}
        width={100}
      />
      <MugIcon
        className='absolute -left-[27%] -bottom-[21%] text-yellow-700/30 rotate-6'
        height={100}
        width={100}
      />
      {/*</div>*/}
    </div>
  );
}
