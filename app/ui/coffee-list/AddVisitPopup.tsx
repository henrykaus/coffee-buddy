import VisitPopup from '@/app/ui/coffee-list/VisitPopup';
import {State} from '@/app/server/visits/actions';
import {Visit} from '@/app/lib/types';

interface AddVisitPopupProps {
  onClose: () => void;
  onConfirm: (
    prevState: State | undefined,
    formData: FormData,
  ) => Promise<State>;
  whenConfirm: (visit: Visit) => void;
}

export default function AddVisitPopup(props: AddVisitPopupProps) {
  const {onClose, onConfirm, whenConfirm} = props;

  return (
    <VisitPopup
      autoFocusShop={true}
      onConfirm={onConfirm}
      onClose={onClose}
      whenDone={whenConfirm}
    />
  );
}
