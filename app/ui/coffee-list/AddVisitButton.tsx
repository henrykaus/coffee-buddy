import {PlusIcon} from '@/app/ui/icons';
import Form from 'next/form';

interface AddVisitPopupProps {
  onClick: () => void;
}

export default function AddVisitButton(props: AddVisitPopupProps) {
  const {onClick} = props;

  return (
    <Form action={onClick}>
      <button
        type='submit'
        className='flex items-center justify-center fixed end-5 bottom-5 transition
          text-yellow-700 h-16 w-16 shadow-md rounded-full bg-[#f7e2ba]
          hover:bg-[#f7daa3] active:bg-[#f7daa3] active:scale-93'
        aria-label='Add new visit'
      >
        <PlusIcon height={30} width={30} />
      </button>
    </Form>
  );
}
