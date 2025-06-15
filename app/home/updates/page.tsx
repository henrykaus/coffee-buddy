import {PatchNoteContents} from '@/app/home/updates/PatchNotes';

export default function Page() {
  return (
    <div className='flex gap-y-8 flex-col mb-20 mt-3 px-6 sm:px-20'>
      {PatchNoteContents.map((note, index) => (
        <section
          className='flex flex-col gap-1 relative [&:not(:last-of-type)]:after:bg-slate-200 after:h-[2px] after:content-[""] after:w-full after:start-0 after:absolute after:-bottom-[1em]'
          key={index}
        >
          <header className='flex justify-between'>
            <h2 className='font-semibold text-lg'>{note.title}</h2>
            <p className='text-slate-500'>{note.date}</p>
          </header>
          <p>{note.description}</p>
        </section>
      ))}
    </div>
  );
}
