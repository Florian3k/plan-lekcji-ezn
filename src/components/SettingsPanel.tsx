import React, { useState } from 'react';
import '../styles/SettingsPanel.scss';
import { useMediaQuery } from 'react-responsive';

interface SettingsProps {
  teachers: {short: string, name: string}[],
  classes: {short: string, name: string}[],
  changeClass: (name: string, type: 'class' | 'teacher' | 'classroom') => void,
}

export const SettingsPanel: React.FC<SettingsProps> = (props) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
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

  let classesByGrade: any = [[],[],[],[],[]];
  // add all 5 grades
  props.classes.map((classData: {short: string}) => {
    classesByGrade[+classData.short[0] - 1].push(classData)
  })
  // delete empty grades
  classesByGrade = classesByGrade.filter((e: []) => e.length);
  // windows (teacher choose window, class choose, etc) 
  const window = (target: string) => {
    switch(target) {
      case 'classes':
        return classesByGrade.map((grade: []) => (
          <div className="grade">
            {grade.map((classData: { name: string }) => (
              <div className="class" onClick={() => props.changeClass(classData.name, 'class')}>
                {classData.name}
              </div>)
            )}
          </div>
        ))
      case 'teachers':
        return props.teachers.map((teacher: {short: string, name: string}) => (
          <div className="teacher" onClick={() => props.changeClass(teacher.name, 'teacher')}>
            {teacher.short}
          </div>
        ))
      case 'classrooms':
        return ''
      default: return (<div></div>)
    }
  }
  

  return (
    <div className={`${isDesktopOrLaptop ? "settings-panel" : "settings-panel-medium"}`}>
      <label className="label-for-main-search" htmlFor="searchingObject">plan</label>
      <div className="search-filters">
        <h1 className="main-search"> 4H</h1>
        <div className="btn-wrapper">
          <button className="classes-search search" onClick={() => toggleWindow('classes')}>Oddziały (klasy)</button>
          {isDisplayingWindow.classes ?
            <div className="classes-window choose-filter-window">{window('classes')}</div> 
            : null}
        </div>
        <div className="btn-wrapper">
          <button className="teachers-search search" onClick={() => toggleWindow('teachers')}>Nauczyciele</button>
          {isDisplayingWindow.teachers ?
            <div className="teachers-window choose-filter-window">{window('teachers')}</div>
            : null}
        </div>
        <div className="btn-wrapper">
          <button className="room-search search" onClick={() => toggleWindow('classrooms')}>Sale szkolne</button>
        </div>
      </div>
    </div>
  )
}
