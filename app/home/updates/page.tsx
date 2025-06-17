import {PatchNoteContents} from '@/app/home/updates/PatchNotes';
import {CircleIcon} from '@/app/ui/icons';

export default function Page() {
  return (
    <div className='flex gap-y-8 flex-col my-3 px-6 sm:px-20'>
      {PatchNoteContents.map((note, index) => {
        return note.divider ? (
          <div className='relative w-full' key={index}>
            <div
              className='bg-slate-200 h-[2px] w-full absolute top-3'
              aria-hidden
            />
            <p className='bg-(--background) inline relative pl-1 pr-3 text-slate-500'>
              {note.title}
            </p>
          </div>
        ) : (
          <article
            className='flex flex-col gap-4 relative bg-slate-50 p-5 rounded-md shadow-xs text-slate-700'
            key={index}
          >
            <header className='flex justify-between items-baseline'>
              <h2 className='font-semibold text-lg'>{note.title}</h2>
              <p className='text-slate-500 text-sm'>{note.date}</p>
            </header>
            {note.features && note.features.length > 0 && (
              <section>
                <h3 className='font-medium text-md mb-2'>New Features</h3>
                <ul>
                  {note.features.map((feature, index) => (
                    <li className='ml-7 relative' key={index}>
                      <CircleIcon
                        height={8}
                        className='absolute -start-[1.65rem] top-2 text-slate-500/90'
                        fill='currentColor'
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {note.fixes && note.fixes.length > 0 && (
              <section>
                <h3 className='font-medium text-md mb-2'>Bug Fixes</h3>
                <ul>
                  {note.fixes.map((fix, index) => (
                    <li className='ml-7 relative' key={index}>
                      <CircleIcon
                        height={8}
                        className='absolute -start-[1.65rem] top-2 text-slate-500/90'
                        fill='currentColor'
                      />
                      {fix}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        );
      })}
    </div>
  );
}
