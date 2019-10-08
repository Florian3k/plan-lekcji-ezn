import React, { useState } from 'react';
import { SettingsPanel } from './components/SettingsPanel';
import { getClassTimetable, getTeacherTimetable } from './utils';
import { useTimetable } from './hooks/useTimetable';
import * as R from 'ramda';
import { Schedule } from './components/Schedule';
import { useMediaQuery } from 'react-responsive';
import './styles/App.css';

export const App: React.FC<any> = (props) => {
  const timetable = useTimetable()
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  const isMobile = useMediaQuery({query: '(max-width: 900px)'})

  const [selectedType, setSelectedType] = useState<'class' | 'teacher' | 'classroom'>('teacher')
  const [selected, setSelected] = useState('Gabor Michał')
  
  const changeClass = (name: string, type: typeof selectedType) => {
    setSelectedType(type)
    setSelected(name)
  }
  
  if (!timetable) {
    return <div>Loading...</div>
  }

  const cards = {
    class: getClassTimetable,
    teacher: getTeacherTimetable,
    classroom: getClassTimetable,
  }[selectedType](timetable, selected)

  console.log({cards})

  if (!cards) {
    return <div>
      "twoja stara"
    </div>
  }

  return ( 
    <div className={`${isDesktopOrLaptop ? "App": isMobile? "App-mobile" : "App-medium"}`}>
      <SettingsPanel classes = {timetable.classes} changeClass={changeClass}/>
      <Schedule class={R.groupBy((l) => l.days, cards!)} />
    </div>
  )   
}
