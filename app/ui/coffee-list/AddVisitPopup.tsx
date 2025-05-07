import VisitPopup from '@/app/ui/coffee-list/VisitPopup';
import {addVisit} from '@/app/server/visits/actions';

export default function AddVisitPopup() {
  return <VisitPopup autoFocusShop={true} onConfirm={addVisit} />;
}
