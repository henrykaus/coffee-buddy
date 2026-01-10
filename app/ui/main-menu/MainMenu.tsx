'use client';

import React, {useEffect, useState} from 'react';
import {OpenClosePanelIcon, EllipsisIcon, HomeIcon} from '@/app/ui/icons';
import {
  LocalStorageItem,
  MainMenuOption,
  MenuPreference,
  Route,
} from '@/app/lib/enums';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';
import MoreOptionsPopup from '@/app/ui/user-menu/MoreOptionsPopup';
import MenuItem from '@/app/ui/main-menu/MenuItem';
import Collapsible from '@/app/ui/common/Collapsible';

export default function MainMenu() {
  const pathname = usePathname();

  const [menuOption, setMenuOption] = useState<MainMenuOption | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const menuPref = localStorage.getItem(LocalStorageItem.MenuPreference);
    setIsCollapsed(menuPref === MenuPreference.Collapsed);
  }, []);

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

  const handleClickExpandCollapse = () => {
    // On click, update localstorage to switch from collapsed to expanded and vice versa
    const menuPreference = isCollapsed
      ? MenuPreference.Expanded
      : MenuPreference.Collapsed;
    localStorage.setItem(LocalStorageItem.MenuPreference, menuPreference);

    setIsCollapsed(!isCollapsed);
  };

  const handleClosePopup = () => {
    setMenuOption(null);
  };

  return (
    <>
      <section
        className={clsx(
          'text-slate-700 mx-6 pt-2 transition sticky top-(--header-height) hidden md:flex flex-col justify-between h-[calc(100vh-var(--header-height))]',
        )}
      >
        <ul className='font-medium'>
          <li>
            <MenuItem
              href={Route.Home}
              isActive={pathname === Route.Home}
              isCollapsed={isCollapsed}
              icon={<HomeIcon />}
              onClick={() => handleOptionClicked(MainMenuOption.Home)}
            >
              Home
            </MenuItem>
          </li>
          <li>
            <MenuItem
              icon={<EllipsisIcon />}
              isCollapsed={isCollapsed}
              onClick={() => handleOptionClicked(MainMenuOption.MoreOptions)}
            >
              More Options
            </MenuItem>
          </li>
        </ul>
        <footer
          className={clsx('relative flex items-center text-sm pb-3', {
            'justify-between': !isCollapsed,
            'justify-center': isCollapsed,
          })}
        >
          <Collapsible direction='horizontal' isCollapsed={isCollapsed}>
            <span className='inline-block text-left text-nowrap'>
              &#169; 2026 Henry Kaus
            </span>
          </Collapsible>
          <button
            className={clsx(
              'transition p-1.5 rounded-lg bg-slate-200/65 hover:bg-slate-200/90 active:bg-slate-200/90',
              {
                'active:translate-x-1.5': isCollapsed,
                'active:-translate-x-1.5': !isCollapsed,
              },
            )}
            onClick={handleClickExpandCollapse}
            title={isCollapsed ? 'Expand menu' : 'Collapse menu'}
          >
            <OpenClosePanelIcon
              innerClassName={clsx('transition', {
                '-scale-100 origin-[63%_50%]': !isCollapsed,
              })}
            />
          </button>
        </footer>
      </section>
      {menuOption === MainMenuOption.MoreOptions && (
        <MoreOptionsPopup onClose={handleClosePopup} />
      )}
    </>
  );
}
