import React, { useState } from 'react';
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


  const [displayingWindow, setDisplayingWindow] = useState('')
  const toggleWindow = (target: 'classes' | 'teachers' | 'classrooms') => {
    if (displayingWindow === target) setDisplayingWindow('');
    else setDisplayingWindow(target);
  }
  const handleTargetClick = (name: string, type: 'class' | 'teacher' | 'classroom') => {
    for (let i = 0; i < 14; i++) {  // set rows to default size
      document.documentElement.style.setProperty(`--row-${i}-height`, "4em");
    }
    props.changeClass(name, type); //change current target
    setDisplayingWindow('');
  }
  
  return (
    <div className={`${isDesktopOrLaptop ? "settings-panel" : "settings-panel-medium"}`}>
      <label className="label-for-main-search" htmlFor="searchingObject">plan</label>
      <div className="search-filters">
        <h1 className="main-search">
          { props.targetSchedule }
        </h1>
        <div className="btn-wrapper">
          <button className="classes-search search" onClick={() => toggleWindow('classes')}>Oddziały (klasy)</button>
          {displayingWindow === "classes" && !isMobile ?
            <PickerMenu type="classes" data={props.classes}/>
            : null}
        </div>
        <div className="btn-wrapper">
          <button className="teachers-search search" onClick={() => toggleWindow('teachers')}>Nauczyciele</button>
          {displayingWindow === "teachers" && !isMobile ?
            <PickerMenu type="teachers" data={props.teachers}/>
            : null}
        </div>
        <div className="btn-wrapper">
          <button className="room-search search" onClick={() => toggleWindow('classrooms')}>Sale szkolne</button>
        </div>
      </div>
      {displayingWindow && isMobile ?
        <PickerMenu type={displayingWindow} data={props[displayingWindow]} />
        : null}
    </div>
  )
}
