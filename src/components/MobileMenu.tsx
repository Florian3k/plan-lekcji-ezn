import React from 'react';
import { PickerMenu } from './PickerMenu';
import '../styles/MobileMenu.scss';

interface MobileMenuProps {
  'teacher': any[],
  'class': any[],
  'classroom': any,
  ''?: any,

  visibleMenu: 'teacher' | 'class' | 'classroom' | '',
  setVisibleMenu: Function,
  handleTargetClick: Function,
  targetSchedule: string
}

export const MobileMenu: React.FC<MobileMenuProps> = mobileMenuProps => {
  return (
    <div className="mobile-menu-wrapper">
      <div className="close">
        <button onClick={() => mobileMenuProps.setVisibleMenu('')}>&#8592;</button>
      </div>

      <div className="mobile-menu">
        <div className="choose" onClick={() => mobileMenuProps.setVisibleMenu('class')}>
          Klasy
        </div>
        <div className="choose" onClick={() => mobileMenuProps.setVisibleMenu('teacher')}>
          Nauczyciele
        </div>
        <div className="choose" onClick={() => mobileMenuProps.setVisibleMenu('classroom')}>
          Sale
        </div>
      </div>
      <PickerMenu
        type={mobileMenuProps.visibleMenu}
        data={mobileMenuProps[mobileMenuProps.visibleMenu]}
        handleTargetClick={(name: string, type: 'class' | 'teacher' | 'classroom') => mobileMenuProps.handleTargetClick(name, type)}
        targetSchedule={mobileMenuProps.targetSchedule}
      />
    </div>
  )
}


