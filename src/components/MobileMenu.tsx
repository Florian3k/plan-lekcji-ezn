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

export const MobileMenu: React.FC<MobileMenuProps> = MobileMenuProps => {
  return (
    <div className="mobile-menu-wrapper">
      <div className="close">
        <button onClick={() => MobileMenuProps.setVisibleMenu('')}>&#8592;</button>
      </div>

      <div className="mobile-menu">
        <div className="choose" onClick={() => MobileMenuProps.setVisibleMenu('class')}>
          Klasy
        </div>
        <div className="choose" onClick={() => MobileMenuProps.setVisibleMenu('teacher')}>
          Nauczyciele
        </div>
        <div className="choose" onClick={() => MobileMenuProps.setVisibleMenu('classroom')}>
          Sale
        </div>
      </div>
      <PickerMenu
        type={MobileMenuProps.visibleMenu}
        data={MobileMenuProps[MobileMenuProps.visibleMenu]}
        handleTargetClick={(name: string, type: 'class' | 'teacher' | 'classroom') => MobileMenuProps.handleTargetClick(name, type)}
        targetSchedule={MobileMenuProps.targetSchedule}
      />
    </div>
  )
}


