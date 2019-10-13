import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { PickerMenu } from './PickerMenu';
import '../styles/SettingsPanel.scss';

interface SettingsProps {
  'teacher': any[],
  'class': any[],
  'classroom': any,
  ''?: null,

  targetSchedule: string,
  changeClass: Function,
}

export const SettingsPanel: React.FC <SettingsProps> = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' })
  
  // States: displaying menu for windows and mobile
  const [displayingWindow, setDisplayingWindow] = useState<'class' | 'teacher' | 'classroom' | ''>('')
  
  const toggleWindow = (target: 'class' | 'teacher' | 'classroom') => {
    if (displayingWindow === target) setDisplayingWindow('');
    else setDisplayingWindow(target);
  }
  // happen when clicked on target for example: 3H
  const handleTargetClick = (name: string, type: any) => {  //temp 'class' | 'teacher' | 'classroom'
    for (let i = 0; i < 14; i++) {  // set rows to default size
      document.documentElement.style.setProperty(`--row-${i}-height`, "4em");
    }
    props.changeClass(name, type); //change current target
    setDisplayingWindow('');
  }

  const DesktopPicker = (type: string) => {
    return displayingWindow === type ?
      <PickerMenu
        type={displayingWindow}
        data={props[displayingWindow]}
        handleTargetClick={(name: string) => handleTargetClick(name, displayingWindow)}
      /> : null
  }



  return (
    <div className={`${isDesktopOrLaptop ? "settings-panel" : "settings-panel-medium"}`}>
      {isMobile && displayingWindow?
        (
          <div className = "mobile-menu-wrapper">
            <div className = "mobile-menu">
              <div className="choose" onClick={()=> setDisplayingWindow('class')}>
                Klasy
              </div>
              <div className="choose" onClick={() => setDisplayingWindow('teacher')}>
                Nauczyciele
              </div>
              <div className="choose" onClick={() => setDisplayingWindow('classroom')}>
                Sale
              </div>
            </div>
            <div className="close">
              <button onClick={() => setDisplayingWindow('')}>Wróć</button>
            </div>
            <PickerMenu
              type={displayingWindow}
              data={props[displayingWindow]}
              handleTargetClick={(name: string, type: 'class' | 'teacher' | 'classroom') => handleTargetClick(name, type)}
            />
          </div>
        )
        : null}
      <label className="label-for-main-search" htmlFor="searchingObject">plan</label>
      <div className="search-filters">
        <h1 className="main-search">
          { props.targetSchedule }
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
              </div>
            </>    
          ): (
            <div className="btn-wrapper">
              <button className="mobile-search search" onClick={() => setDisplayingWindow('class')}>Zmień</button>
            </div>
          )
        }
      </div>
    </div>
  )
}