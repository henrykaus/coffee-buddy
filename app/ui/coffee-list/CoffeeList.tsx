'use client';

import VisitSearch from '@/app/ui/home-page/VisitSearch';
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
import CoffeeGrid from '@/app/ui/coffee-list/CoffeeGrid';

interface CoffeeListProps {
  visits: Visit[];
  query: string;
}

export default function CoffeeList(props: CoffeeListProps) {
  const {visits, query} = props;

  const [coffeeVisits, setCoffeeVisits] = useState(visits);
  const [visitAction, setVisitAction] = useState<VisitAction | null>(null);
  const [deletedVisitIndex, setDeletedVisitIndex] = useState(0);
  const [showAddVisitPopup, setShowAddVisitPopup] = useState(false);
  const [activeVisit, setActiveVisit] = useState<Visit | null>(null);
  const [toastConfig, setToastConfig] = useState<ToastConfig | null>(null);

  useEffect(() => {
    setCoffeeVisits(visits);
  }, [visits]);

  /**
   * This useEffect is my implementation for "Optimistic Rendering". Although this code
   * doesn't look very optimistic, it takes a VisitAction and accordingly updates the
   * list of visit entries based on a variety of factors such as... Add, Edit, Delete;
   * Success, Failure; and Client-side, Server-side.
   */
  useEffect(() => {
    if (visitAction) {
      let visitIndex: number = -1;

      if (!visitAction.isError) {
        // Success case
        switch (visitAction.action) {
          case VisitActionType.Add:
            visitIndex = coffeeVisits.findIndex(
              (visit) => visit.reconId === visitAction.visit.reconId,
            );

            if (visitIndex >= 0 && !visitAction.isClient) {
              const newVisits = [...coffeeVisits];
              newVisits[visitIndex] = visitAction.visit;
              setCoffeeVisits(newVisits);
            } else if (visitIndex < 0) {
              setCoffeeVisits((prevState) => [visitAction.visit, ...prevState]);
              window.scrollTo(0, 0);
            }

            break;
          case VisitActionType.Edit:
            visitIndex = coffeeVisits.findIndex(
              (visit) => visit.id === visitAction.visit.id,
            );

            if (
              visitIndex >= 0 &&
              (!visitAction.isClient ||
                coffeeVisits[visitIndex].reconId !== visitAction.visit.reconId)
            ) {
              // Since using server value updates reconId, if reconId is different than client, it has not been touched by server yet
              const newVisits = [...coffeeVisits];
              newVisits[visitIndex] = visitAction.visit;
              setCoffeeVisits(newVisits);
            }

            break;
          case VisitActionType.Delete:
            visitIndex = coffeeVisits.findIndex(
              (visit) => visit.id === visitAction.visit.id,
            );

            if (visitIndex >= 0) {
              const newVisits = coffeeVisits.toSpliced(visitIndex, 1);
              setDeletedVisitIndex(visitIndex);
              setCoffeeVisits(newVisits);
            }
            break;
        }
      } else {
        // Error case - undo changes (only happens from server-side)
        switch (visitAction.action) {
          case VisitActionType.Add:
            visitIndex = coffeeVisits.findIndex(
              (visit) => visit.reconId === visitAction.visit.reconId,
            );

            if (visitIndex >= 0) {
              const newVisits = coffeeVisits.toSpliced(visitIndex, 1);
              setCoffeeVisits(newVisits);
            }
            break;
          case VisitActionType.Edit:
            visitIndex = coffeeVisits.findIndex(
              (visit) => visit.id === visitAction.visit.id,
            );

            if (visitIndex >= 0) {
              const newVisits = [...coffeeVisits];
              newVisits[visitIndex] = visitAction.visit;
              setCoffeeVisits(newVisits);
            }
            break;
          case VisitActionType.Delete:
            visitIndex = coffeeVisits.findIndex(
              (visit) => visit.id === visitAction.visit.id,
            );

            if (visitIndex < 0) {
              const insertIndex = Math.min(
                deletedVisitIndex,
                coffeeVisits.length,
              );
              const newVisits = coffeeVisits.toSpliced(
                insertIndex,
                0,
                visitAction.visit,
              );
              setCoffeeVisits(newVisits);
            }
            break;
        }
      }
    }
  }, [visitAction]);

  // SERVER-SIDE METHODS

  const refreshVisitFromServerResponse = (
    state: State,
    actionType: VisitActionType,
  ) => {
    if (!state.message && state.visit) {
      // Success
      setVisitAction({
        action: actionType,
        isClient: false,
        isError: false,
        visit: state.visit,
      });
    } else if (state.message && state.visit) {
      // Error
      setVisitAction({
        action: actionType,
        isClient: false,
        isError: true,
        visit: state.visit,
      });
    }

    if (state.message) {
      setToastConfig({type: ToastType.Error, message: state.message});
    }
  };

  const addVisitToDB = async (
    prevState: State | undefined,
    formData: FormData,
  ) => {
    const newState = await createVisit(prevState, formData);
    refreshVisitFromServerResponse(newState, VisitActionType.Add);
    return newState;
  };

  const updateVisitOnDB = async (
    prevState: State | undefined,
    formData: FormData,
  ) => {
    const newState = await updateVisit(prevState, formData);
    refreshVisitFromServerResponse(newState, VisitActionType.Edit);
    return newState;
  };

  const removeVisitFromDB = async (visit: Visit) => {
    const newState = await deleteVisit(visit.id);
    refreshVisitFromServerResponse(newState, VisitActionType.Delete);
    return newState;
  };

  // CLIENT-SIDE METHODS

  const addVisitToClient = (state: State) => {
    if (state.visit) {
      setVisitAction({
        action: VisitActionType.Add,
        isClient: true,
        isError: false,
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
        isError: false,
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
      isError: false,
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
      <section className='flex gap-y-3 flex-col mb-24 md:mb-20 py-2 px-6 w-full h-full'>
        {(coffeeVisits.length || query.length > 0) && (
          <VisitSearch query={query} />
        )}
        {coffeeVisits.length ? (
          <CoffeeGrid items={coffeeVisits} onEditClick={setActiveVisit} />
        ) : (
          <div className='sticky top-[calc(50%-28px)] mx-auto text-center'>
            <p className='font-semibold text-xl text-slate-500'>No visits</p>
            {query.length >= 0 && (
              <p className='text-lg text-slate-400'>
                Click the + button to get started
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
          onConfirmServerAction={updateVisitOnDB}
          onDeleteClientAction={deleteVisitOnClient}
          onDeleteServerAction={removeVisitFromDB}
          visit={activeVisit}
        />
      )}
    </>
  );
}
