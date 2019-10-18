import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { PickerMenu } from './PickerMenu';
import '../styles/SettingsPanel.scss';
import { MobileMenu } from './MobileMenu';

interface SettingsProps {
  'teacher': any[],
  'class': any[],
  'classroom': any,
  ''?: null,

  targetSchedule: string,
  changeClass: Function,
}

export const SettingsPanel: React.FC <SettingsProps> = (SettingsProps) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' })
  // States: displaying menu for windows and mobile
  const [visibleMenu, setVisibleMenu] = useState<'class' | 'teacher' | 'classroom' | ''>('')
  
  const toggleWindow = (target: 'class' | 'teacher' | 'classroom') => {
    if (visibleMenu === target) setVisibleMenu('');
    else setVisibleMenu(target);
  }
  // happen when clicked on target for example: 3H
  const handleTargetClick = (name: string, type: any) => {  //temp 'class' | 'teacher' | 'classroom'
    if(name === SettingsProps.targetSchedule) {
      setVisibleMenu('');      
      return ;
    }
    SettingsProps.changeClass(name, type); //change current target
    setVisibleMenu('');
  }

  const DesktopPicker = (type: string) => {
    return visibleMenu === type ?
      <PickerMenu
        type={visibleMenu}
        data={SettingsProps[visibleMenu]}
        handleTargetClick={(name: string) => handleTargetClick(name, visibleMenu)}
        targetSchedule = {SettingsProps.targetSchedule}
      /> : null
  }
  const outerInvisibleLayer = () => {
    return visibleMenu && !isMobile? (
      <div 
        className="outer-invisible-layer"
        onClick={() => setVisibleMenu('')}  
      >

      </div>
    ): null
  
  }


  return (
    <div className={`${isDesktopOrLaptop ? "settings-panel" : "settings-panel-medium"}`}>
      { outerInvisibleLayer() }
      {isMobile && visibleMenu ?
        (
          <MobileMenu 
            visibleMenu={visibleMenu}
            teacher={SettingsProps.teacher}
            class={SettingsProps.class}
            classroom={SettingsProps.classroom}
            handleTargetClick={handleTargetClick}
            setVisibleMenu={setVisibleMenu}
            targetSchedule={SettingsProps.targetSchedule}
          />
        )
        : null}
      <label className="label-for-main-search" htmlFor="searchingObject">plan</label>
      <div className="search-filters">
        <h1 className="main-search">
          { SettingsProps.targetSchedule }
        </h1>
        {
          !isMobile ? (
            <>
              <div className="btn-wrapper">
                <button className="classes-search search" onClick={() => toggleWindow('class')}>Oddziały (klasy)</button>
                { DesktopPicker('class') }
              </div>
              <div className="btn-wrapper">
                <button className="teachers-search search" onClick={() => toggleWindow('teacher')}>Nauczyciele</button>
                { DesktopPicker('teacher') }
              </div>
              <div className="btn-wrapper">
                <button className="room-search search" onClick={() => toggleWindow('classroom')}>Sale szkolne</button>
                { DesktopPicker('classroom') }
              </div>
            </>    
          )
          :(
            <div className="btn-wrapper">
              <button className="mobile-search search" onClick={() => setVisibleMenu('class')}>
                <img src={process.env.PUBLIC_URL + 'menu.svg'} alt=""/>
              </button>
            </div>
          )
        }
      </div>
    </div>
  )
}