import React, {  useState } from 'react';
import '../styles/SettingsPanel.scss';
import { useMediaQuery } from 'react-responsive';
import { PickerMenu } from './PickerMenu';

interface SettingsProps {
  teachers: {short: string, name: string}[],
  classes: {short: string, name: string}[],
  targetSchedule: string,
  changeClass: (name: string, type: "class" | 'teacher' | 'classroom') => void,
}

export const SettingsPanel: React.FC<any> = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' })
  
  // States: displaying menu for windows and mobile
  const [displayingWindow, setDisplayingWindow] = useState('')
  const [displayingMobileWindow, setDisplayingMobileWindow] = useState('')
  
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
    setDisplayingMobileWindow('');
  }
  // 
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
      {displayingMobileWindow && isMobile?
        (
          <div className = "mobile-menu-wrapper">
            <div className = "mobile-menu">
              <div className="choose" onClick={()=> setDisplayingMobileWindow('class')}>
                Klasy
              </div>
              <div className="choose" onClick={() => setDisplayingMobileWindow('teacher')}>
                Nauczyciele
              </div>
              <div className="choose" onClick={() => setDisplayingMobileWindow('classroom')}>
                Sale
              </div>
            </div>
            <div className="close">
              <button onClick={() => setDisplayingMobileWindow('')}>Wróć</button>
            </div>
            <PickerMenu
              type={displayingMobileWindow}
              data={props[displayingMobileWindow]}
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
              <button className="mobile-search search" onClick={() => setDisplayingMobileWindow('class')}>Zmień</button>
            </div>
          )
        }
      </div>
    </div>
  )
}