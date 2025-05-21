import VisitPopup from '@/app/ui/visit-popups/VisitPopup';
import {State} from '@/app/server/visits/actions';
import {Visit} from '@/app/lib/types';

interface EditVisitPopupProps {
  onClose: () => void;
  onConfirm: (
    prevState: State | undefined,
    formData: FormData,
  ) => Promise<State>;
  onDelete: (id: string) => Promise<State>;
  whenDone: (visit: Visit) => void;
  visit: Visit;
}

export default function EditVisitPopup(props: EditVisitPopupProps) {
  const {onClose, onConfirm, onDelete, visit, whenDone} = props;

  return (
    <VisitPopup
      onConfirm={onConfirm}
      onDelete={onDelete}
      onClose={onClose}
      visit={visit}
      whenDone={whenDone}
    />
  );
}
