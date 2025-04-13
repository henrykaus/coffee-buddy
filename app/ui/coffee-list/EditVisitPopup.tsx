import VisitPopup from '@/app/ui/coffee-list/VisitPopup';
import {deleteVisit, getVisit, updateVisit} from '@/app/server/visits/actions';

interface EditVisitPopupProps {
  id: string;
}

export default async function EditVisitPopup(props: EditVisitPopupProps) {
  const {id} = props;

  if (id === undefined || id === '') {
    console.error('FIXME: no id found');
  }

  const visit = await getVisit(id);

  return (
    <VisitPopup
      title='Edit visit'
      confirmButtonText='Save'
      onConfirm={updateVisit}
      onDelete={deleteVisit}
      visit={visit}
      cancelButton={true}
    />
  );
}
