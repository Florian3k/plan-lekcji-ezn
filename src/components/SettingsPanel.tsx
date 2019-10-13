import React, { useRef, useState } from 'react';
import '../styles/SettingsPanel.scss';
import { useMediaQuery } from 'react-responsive';
import { PickerMenu } from './PickerMenu';

interface SettingsProps {
  teachers: {short: string, name: string}[],
  classes: {short: string, name: string}[],
  targetSchedule: string,
  changeClass: (name: string, type: 'class' | 'teacher' | 'classroom') => void,
}

export const SettingsPanel: React.FC<any> = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' })
  
  // States: displaying menu for windows and mobile
  const [displayingWindow, setDisplayingWindow] = useState('')
  const [displayingMobileWindow, setDisplayingMobileWindow] = useState('')
  
  const toggleWindow = (target: 'classes' | 'teachers' | 'classrooms') => {
    if (displayingWindow === target) setDisplayingWindow('');
    else setDisplayingWindow(target);
  }
  // happen when clicked on target for example: 3H
  const handleTargetClick = (name: string, type: 'class' | 'teacher' | 'classroom') => {
    for (let i = 0; i < 14; i++) {  // set rows to default size
      document.documentElement.style.setProperty(`--row-${i}-height`, "4em");
    }
    props.changeClass(name, type); //change current target
    setDisplayingWindow('');
    setDisplayingMobileWindow('');
  }
  // const DesktopPicker
  return (
    <div className={`${isDesktopOrLaptop ? "settings-panel" : "settings-panel-medium"}`}>
      {displayingMobileWindow && isMobile?
        (
          <div className = "mobile-menu-wrapper">
            <div className="mobile-menu">
              <div className="choose" onClick={()=> setDisplayingMobileWindow('classes')}>
                Klasy
              </div>
              <div className="choose" onClick={() => setDisplayingMobileWindow('teachers')}>
                Nauczyciele
              </div>
              <div className="choose" onClick={() => setDisplayingMobileWindow('classrooms')}>
                Sale
              </div>
            </div>
            <PickerMenu
              type={displayingMobileWindow}
              data={props[displayingMobileWindow]}
              handleTargetClick={(name: string, type: 'class' | 'teacher' | 'classroom') => handleTargetClick(name, type)} />
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
                <button className="classes-search search" onClick={() => toggleWindow('classes')}>Oddziały (klasy)</button>
                {displayingWindow === "classes" ?
                  (
                    <>
                      <PickerMenu
                        type="classes"
                        data={props.classes} 
                        handleTargetClick={
                          (name: string) => handleTargetClick(name, 'class')} 
                      />                        
                      {/* <div className="outside-checker"></div> */}
                    </>
                  )
                  : null}
              </div>
              <div className="btn-wrapper">
                <button className="teachers-search search" onClick={() => toggleWindow('teachers')}>Nauczyciele</button>
                {displayingWindow === "teachers" ?
                  (
                    <PickerMenu
                      type="teachers"
                      data={props.teachers} 
                      handleTargetClick={
                        (name: string) => handleTargetClick(name, 'teacher')}
                    />
                  )
                  : null}
              </div>
              <div className="btn-wrapper">
                <button className="room-search search" onClick={() => toggleWindow('classrooms')}>Sale szkolne</button>
              </div>
            </>    
          ): (
            <div className="btn-wrapper">
              <button className="mobile-search search" onClick={() => setDisplayingMobileWindow('classes')}>Zmień</button>
            </div>
          )
        }
      </div>
    </div>
  )
}
