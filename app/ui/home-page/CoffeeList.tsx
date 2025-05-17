'use client';

import VisitSearch from '@/app/ui/common/VisitSearch';
import CoffeeCard from '@/app/ui/coffee-list/CoffeeCard';
import AddVisitButton from '@/app/ui/coffee-list/AddVisitButton';
import AddVisitPopup from '@/app/ui/coffee-list/AddVisitPopup';
import EditVisitPopup from '@/app/ui/coffee-list/EditVisitPopup';
import React, {useEffect, useState} from 'react';
import {Visit, VisitAction} from '@/app/lib/types';
import {
  createVisit,
  deleteVisit,
  State,
  updateVisit,
} from '@/app/server/visits/actions';
import {VisitActionType} from '@/app/lib/enums';

interface CoffeeListProps {
  hasAnyVisits: boolean;
  visits: Visit[];
}

export default function CoffeeList(props: CoffeeListProps) {
  const {hasAnyVisits, visits} = props;

  const [coffeeVisits, setCoffeeVisits] = useState(visits);
  const [visitAction, setVisitAction] = useState<VisitAction | null>(null);
  const [showAddVisitPopup, setShowAddVisitPopup] = useState(false);
  const [activeVisit, setActiveVisit] = useState<Visit | null>(null);

  useEffect(() => {
    setCoffeeVisits(visits);
  }, [visits]);

  useEffect(() => {
    console.log('useEffect', visitAction?.isClient);
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
            console.log(
              'updated (by add) from useEffect (found visit)',
              visitAction.isClient ? 'client' : 'db',
              visitAction.visit,
            );
          } else if (addedVisitIndex < 0) {
            setCoffeeVisits([visitAction.visit, ...coffeeVisits]);
            console.log(
              'added from useEffect (not found visit)',
              visitAction.isClient ? 'client' : 'db',
              visitAction.visit,
            );
          } else {
            console.log('Else block', visitAction);
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
            console.log(
              'updated (by edit) from useEffect (found visit)',
              visitAction.isClient ? 'client' : 'db',
              visitAction.visit,
            );
          } else {
            console.log('Else block', visitAction);
          }

          break;
        case VisitActionType.Delete:
          const deletedVisitIndex = coffeeVisits.findIndex(
            (visit) => visit.id === visitAction.visit.id,
          );

          if (deletedVisitIndex >= 0) {
            const newVisits = coffeeVisits.toSpliced(deletedVisitIndex, 1);
            setCoffeeVisits(newVisits);
            console.log(
              'updated (by delete) from useEffect (found visit)',
              visitAction.isClient ? 'client' : 'db',
              visitAction.visit,
            );
          } else {
            console.log('Else block', visitAction);
          }
          break;
      }
    }
  }, [visitAction]);

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

    return newState;
  };

  const removeVisitFromDB = async (id: string) => {
    const newState = await deleteVisit(id);
    if (newState.visit) {
      console.log(newState);

      setVisitAction({
        action: VisitActionType.Delete,
        isClient: false,
        visit: newState.visit,
      });
    }

    return newState;
  };

  const addVisitToClient = (visit: Visit) => {
    setVisitAction({
      action: VisitActionType.Add,
      isClient: true,
      visit: visit,
    });
    console.log('updated from client!', visit);
  };

  const updateVisitOnClient = (visit: Visit) => {
    setVisitAction({
      action: VisitActionType.Edit,
      isClient: true,
      visit: visit,
    });
    console.log('updated from client!', visit);
  };

  return (
    <>
      <section className='flex gap-y-3 flex-col mb-24 pb-10 px-6 sm:px-20'>
        {(coffeeVisits.length || hasAnyVisits) && <VisitSearch />}
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
            {!hasAnyVisits && (
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
          onConfirm={addVisitToDB}
          whenConfirm={addVisitToClient}
        />
      )}
      {activeVisit && (
        <EditVisitPopup
          visit={activeVisit}
          onConfirm={updateVisitToDB}
          onDelete={removeVisitFromDB}
          onClose={() => setActiveVisit(null)}
          whenDone={updateVisitOnClient}
        />
      )}
    </>
  );
}
