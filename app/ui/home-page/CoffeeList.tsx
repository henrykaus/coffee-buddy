'use client';

import VisitSearch from '@/app/ui/home-page/VisitSearch';
import CoffeeCard from '@/app/ui/coffee-list/CoffeeCard';
import AddVisitButton from '@/app/ui/coffee-list/AddVisitButton';
import AddVisitPopup from '@/app/ui/visit-popups/AddVisitPopup';
import EditVisitPopup from '@/app/ui/visit-popups/EditVisitPopup';
import React, {useEffect, useState} from 'react';
import {ToastConfig, Visit, VisitAction} from '@/app/lib/types';
import {
  createVisit,
  deleteVisit,
  State,
  updateVisit,
} from '@/app/server/visits/actions';
import {ToastType, VisitActionType} from '@/app/lib/enums';
import Toast from '@/app/ui/common/Toast';

interface CoffeeListProps {
  visits: Visit[];
  query: string;
}

export default function CoffeeList(props: CoffeeListProps) {
  const {visits, query} = props;

  const [coffeeVisits, setCoffeeVisits] = useState(visits);
  const [visitAction, setVisitAction] = useState<VisitAction | null>(null);
  const [showAddVisitPopup, setShowAddVisitPopup] = useState(false);
  const [activeVisit, setActiveVisit] = useState<Visit | null>(null);
  const [toastConfig, setToastConfig] = useState<ToastConfig | null>(null);

  useEffect(() => {
    setCoffeeVisits(visits);
  }, [visits]);

  useEffect(() => {
    if (visitAction) {
      switch (visitAction.action) {
        case VisitActionType.Add:
          const addedVisitIndex = coffeeVisits.findIndex(
            (visit) => visit.reconId === visitAction.visit.reconId,
          );

          if (addedVisitIndex >= 0 && !visitAction.isClient) {
            const newVisits = [...coffeeVisits];
            newVisits[addedVisitIndex] = visitAction.visit;
            setCoffeeVisits(newVisits);
          } else if (addedVisitIndex < 0) {
            setCoffeeVisits([visitAction.visit, ...coffeeVisits]);
            window.scrollTo(0, 0);
          }

          break;
        case VisitActionType.Edit:
          const updatedVisitIndex = coffeeVisits.findIndex(
            (visit) => visit.id === visitAction.visit.id,
          );

          if (
            updatedVisitIndex >= 0 &&
            (!visitAction.isClient ||
              coffeeVisits[updatedVisitIndex].reconId !==
                visitAction.visit.reconId)
          ) {
            // Since using server value updates reconId, if reconId is different than client, it has not been touched by server yet
            const newVisits = [...coffeeVisits];
            newVisits[updatedVisitIndex] = visitAction.visit;
            setCoffeeVisits(newVisits);
          }

          break;
        case VisitActionType.Delete:
          const deletedVisitIndex = coffeeVisits.findIndex(
            (visit) => visit.id === visitAction.visit.id,
          );

          if (deletedVisitIndex >= 0) {
            const newVisits = coffeeVisits.toSpliced(deletedVisitIndex, 1);
            setCoffeeVisits(newVisits);
          }
          break;
      }
    }
  }, [visitAction]);

  // SERVER-SIDE METHODS
  const addVisitToDB = async (
    prevState: State | undefined,
    formData: FormData,
  ) => {
    const newState = await createVisit(prevState, formData);

    if (newState.visit) {
      setVisitAction({
        action: VisitActionType.Add,
        isClient: false,
        visit: newState.visit,
      });
    }

    if (newState.message) {
      setToastConfig({type: ToastType.Error, message: newState.message});
    }

    return newState;
  };

  const updateVisitToDB = async (
    prevState: State | undefined,
    formData: FormData,
  ) => {
    const newState = await updateVisit(prevState, formData);

    if (newState.visit) {
      setVisitAction({
        action: VisitActionType.Edit,
        isClient: false,
        visit: newState.visit,
      });
    }

    if (newState.message) {
      setToastConfig({type: ToastType.Error, message: newState.message});
    }

    return newState;
  };

  const removeVisitFromDB = async (visit: Visit) => {
    const newState = await deleteVisit(visit.id);

    if (newState.visit) {
      setVisitAction({
        action: VisitActionType.Delete,
        isClient: false,
        visit: newState.visit,
      });
    }

    if (newState.message) {
      setToastConfig({type: ToastType.Error, message: newState.message});
    }

    return newState;
  };

  // CLIENT-SIDE METHODS
  const addVisitToClient = (state: State) => {
    if (state.visit) {
      setVisitAction({
        action: VisitActionType.Add,
        isClient: true,
        visit: state.visit,
      });
    }

    if (state.message) {
      setToastConfig({type: ToastType.Error, message: state.message});
    }
  };

  const updateVisitOnClient = (state: State) => {
    if (state.visit) {
      setVisitAction({
        action: VisitActionType.Edit,
        isClient: true,
        visit: state.visit,
      });
    }

    if (state.message) {
      setToastConfig({type: ToastType.Error, message: state.message});
    }
  };

  const deleteVisitOnClient = (visit: Visit) => {
    setVisitAction({
      action: VisitActionType.Delete,
      isClient: true,
      visit: visit,
    });
  };

  return (
    <>
      <Toast
        onToastClose={() => setToastConfig(null)}
        show={toastConfig !== null}
        type={ToastType.Error}
      >
        {toastConfig?.message}
      </Toast>
      <section className='flex gap-y-3 flex-col mb-24 pb-10 px-6 sm:px-20'>
        {(coffeeVisits.length || query.length > 0) && (
          <VisitSearch query={query} />
        )}
        {coffeeVisits.length ? (
          coffeeVisits.map((visit) => (
            <CoffeeCard
              key={visit.id}
              onEditClick={() => setActiveVisit(visit)}
              visit={visit}
            />
          ))
        ) : (
          <div className='absolute start-0 mx-auto w-full text-center top-[calc(50%-28px)]'>
            <p className='font-semibold text-xl text-slate-500'>No visits</p>
            {query.length === 0 && (
              <p className='text-lg text-slate-400'>
                Click the + button to add
              </p>
            )}
          </div>
        )}
      </section>
      <AddVisitButton onClick={() => setShowAddVisitPopup(true)} />
      {showAddVisitPopup && (
        <AddVisitPopup
          onClose={() => setShowAddVisitPopup(false)}
          onConfirmClientAction={addVisitToClient}
          onConfirmServerAction={addVisitToDB}
        />
      )}
      {activeVisit && (
        <EditVisitPopup
          onClose={() => setActiveVisit(null)}
          onConfirmClientAction={updateVisitOnClient}
          onConfirmServerAction={updateVisitToDB}
          onDeleteClientAction={deleteVisitOnClient}
          onDeleteServerAction={removeVisitFromDB}
          visit={activeVisit}
        />
      )}
    </>
  );
}
