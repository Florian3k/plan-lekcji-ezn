import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { PickerMenu } from './PickerMenu';
import '../styles/SettingsPanel.scss';

interface SettingsProps {
  teachers: {short: string, name: string}[],
  classes: {short: string, name: string}[],
  targetSchedule: string,
  changeClass: (name: string, type: 'class' | 'teacher' | 'classroom') => void,
}

export const SettingsPanel: React.FC<SettingsProps> = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' })


  const [isDisplayingWindow, setIsDisplayingWindow] = useState({
    classes: false,
    teachers: false,
    classrooms: false,

  })
  const toggleWindow = (target: 'classes' | 'teachers' | 'classrooms') => {
    setIsDisplayingWindow(
      {
        classes: false,
        teachers: false,
        classrooms: false,
        [target]: !isDisplayingWindow[target]
      }
    )
  }
  const handleTargetClick = (name: string, type: 'class' | 'teacher' | 'classroom') => {
    for (let i = 0; i < 14; i++) {  // set rows to default size
      document.documentElement.style.setProperty(`--row-${i}-height`, "4em");
    }
    props.changeClass(name, type); //change current target
    setIsDisplayingWindow({ //hide all choosement windows
      classes: false,
      teachers: false,
      classrooms: false
    });

  }
  
  return (
    <div className={`${isDesktopOrLaptop ? "settings-panel" : "settings-panel-medium"}`}>
      <label className="label-for-main-search" htmlFor="searchingObject">plan</label>
      <div className="search-filters">
        <h1 className="main-search">
          { props.targetSchedule}
        </h1>
        <div className="btn-wrapper">
          <button className="classes-search search" onClick={() => toggleWindow('classes')}>Oddziały (klasy)</button>
          {isDisplayingWindow.classes ?
            <PickerMenu type="classes" classes={props.classes}/>
            : null}
        </div>
        <div className="btn-wrapper">
          <button className="teachers-search search" onClick={() => toggleWindow('teachers')}>Nauczyciele</button>
          {isDisplayingWindow.teachers ?
            <PickerMenu type="teachers" teachers={props.teachers}/>
            : null}
        </div>
        <div className="btn-wrapper">
          <button className="room-search search" onClick={() => toggleWindow('classrooms')}>Sale szkolne</button>
        </div>
      </div>
    </div>
  )
}
