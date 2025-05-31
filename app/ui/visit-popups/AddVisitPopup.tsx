import VisitPopup from '@/app/ui/visit-popups/VisitPopup';
import {State} from '@/app/server/visits/actions';

interface AddVisitPopupProps {
  onClose: () => void;
  onConfirmClientAction: (state: State) => void;
  onConfirmServerAction: (
    prevState: State | undefined,
    formData: FormData,
  ) => Promise<State>;
}

export default function AddVisitPopup(props: AddVisitPopupProps) {
  const {onClose, onConfirmClientAction, onConfirmServerAction} = props;

  return (
    <VisitPopup
      autoFocusShop={false}
      onClose={onClose}
      onConfirmClientAction={onConfirmClientAction}
      onConfirmServerAction={onConfirmServerAction}
    />
  );
}
