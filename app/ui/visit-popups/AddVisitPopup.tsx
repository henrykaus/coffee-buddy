import VisitPopup from '@/app/ui/visit-popups/VisitPopup';
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
      autoFocusShop={false}
      onConfirm={onConfirm}
      onClose={onClose}
      whenDone={whenConfirm}
    />
  );
}
