import VisitPopup from '@/app/ui/visit-popups/VisitPopup';
import {State} from '@/app/server/visits/actions';
import {Visit} from '@/app/lib/types';

interface EditVisitPopupProps {
  onClose: () => void;
  onConfirmClientAction: (state: State) => void;
  onConfirmServerAction: (
    prevState: State | undefined,
    formData: FormData,
  ) => Promise<State>;
  onDeleteClientAction: (visit: Visit) => void;
  onDeleteServerAction: (visit: Visit) => Promise<State>;
  visit: Visit;
}

export default function EditVisitPopup(props: EditVisitPopupProps) {
  const {
    onClose,
    onConfirmClientAction,
    onConfirmServerAction,
    onDeleteClientAction,
    onDeleteServerAction,
    visit,
  } = props;

  return (
    <VisitPopup
      onClose={onClose}
      onConfirmClientAction={onConfirmClientAction}
      onConfirmServerAction={onConfirmServerAction}
      onDeleteClientAction={onDeleteClientAction}
      onDeleteServerAction={onDeleteServerAction}
      visit={visit}
    />
  );
}
