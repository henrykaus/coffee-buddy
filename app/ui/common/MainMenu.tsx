'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import {ClosePanelIcon, EllipsisIcon, HomeIcon} from '@/app/ui/icons';
import {MainMenuOption, Route} from '@/app/lib/enums';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';
import MoreOptionsPopup from '@/app/ui/user-menu/MoreOptionsPopup';

export default function MainMenu() {
  const pathname = usePathname();

  const [menuOption, setMenuOption] = useState<MainMenuOption | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleOptionClicked = async (option: MainMenuOption) => {
    switch (option) {
      case MainMenuOption.Home: {
        setMenuOption(MainMenuOption.Home);
        break;
      }
      case MainMenuOption.MoreOptions: {
        setMenuOption(MainMenuOption.MoreOptions);
        break;
      }
    }
  };

  const handleClosePopup = () => {
    setMenuOption(null);
  };

  const buttonClasses =
    'flex gap-4 px-4 py-3 rounded-lg transition hover:bg-slate-100 active:bg-slate-100 mb-1 w-full';

  return (
    <>
      <section
        className={clsx(
          'text-slate-700 mx-6 pt-2 hidden md:flex md:flex-col md:justify-between md:h-[calc(100vh-var(--header-height))] sticky top-(--header-height)',
          {
            'w-14': isCollapsed,
            'w-64': !isCollapsed,
          },
        )}
      >
        <ul className='font-medium'>
          <li>
            <Link
              href={Route.Home}
              className={clsx(buttonClasses, {
                'bg-slate-100': pathname === Route.Home,
              })}
              onNavigate={() => handleOptionClicked(MainMenuOption.Home)}
            >
              <HomeIcon />
              {!isCollapsed && <span>Home</span>}
            </Link>
          </li>
          <li>
            <button
              className={buttonClasses}
              onClick={() => handleOptionClicked(MainMenuOption.MoreOptions)}
            >
              <EllipsisIcon />
              {!isCollapsed && <span>More Options</span>}
            </button>
          </li>
        </ul>
        <footer className='text-sm relative flex justify-between items-center pb-3'>
          {!isCollapsed && <span>&#169; 2025 Henry Kaus</span>}
          <button
            className='p-2 rounded-full bg-slate-100'
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ClosePanelIcon />
          </button>
        </footer>
      </section>
      {menuOption === MainMenuOption.MoreOptions && (
        <MoreOptionsPopup onClose={handleClosePopup} />
      )}
    </>
  );
}
