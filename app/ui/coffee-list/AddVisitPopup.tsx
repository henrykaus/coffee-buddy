import VisitPopup from '@/app/ui/coffee-list/VisitPopup';
import {addVisit} from '@/app/server/visits/actions';

export default function AddVisitPopup() {
  return (
    <VisitPopup
      title='Add visit'
      confirmButtonText='Add'
      onConfirm={addVisit}
    />
  );
}
