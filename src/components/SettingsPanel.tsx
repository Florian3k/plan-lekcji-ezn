import React, { useState } from 'react';
import '../styles/SettingsPanel.scss';
import { useMediaQuery } from 'react-responsive';

export const SettingsPanel: React.FC<any> = (props) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const [isDisplayingClasses, setIsDisplayingClasses] = useState(false)  
  const toggleDisplayClasses = () => {
    setIsDisplayingClasses(!isDisplayingClasses)
  }

  let classesByGrade: any = [[],[],[],[],[]];
  // add all 5 grades
  props.classes.map((classData: {short: String}) => {
    classesByGrade[+classData.short[0] - 1].push(classData)
  })
  // delete empty grades
  classesByGrade = classesByGrade.filter((e: []) => e.length);

  // final classes components
  const classesWindow = classesByGrade.map((grade: []) => (
    <div className="grade">
      {grade.map((classData: { name: string }) => (
        <div className="class" onClick={() => props.changeClass(classData.name)}> 
          {classData.name} 
        </div>)
      )}
    </div>
  ))

  return (
    <div className={`${isDesktopOrLaptop ? "settings-panel" : "settings-panel-medium"}`}>
      <label className="label-for-main-search" htmlFor="searchingObject">plan</label>
      <div className="search-filters">
        <h1 className="main-search"> 4H</h1>
        <div className="btn-wrapper">
          <button className="classes-search search" onClick={toggleDisplayClasses}>Oddziały (klasy)</button>
          {isDisplayingClasses ?
            <div className="classes-window">{classesWindow}</div> 
            : null}
        </div>
        <div className="btn-wrapper">
          <button className="teachers-search search">Nauczyciele</button>
        </div>
        <div className="btn-wrapper">
          <button className="room-search search">Sale szkolne</button>
        </div>
      </div>
    </div>
  )
}
