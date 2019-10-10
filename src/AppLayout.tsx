import React, { useState } from 'react';
import { SettingsPanel } from './components/SettingsPanel';
import { getClassTimetable, getTeacherTimetable } from './utils';
import { useTimetable } from './hooks/useTimetable';
import * as R from 'ramda';
import { Schedule } from './components/Schedule';
import { useMediaQuery } from 'react-responsive';
import './styles/App.css';

export const App: React.FC = () => {
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


  if (!cards) {
    return <div>
      "twoja stara"
    </div>
  }
  console.log(cards)
  return (
    <div className={`${isDesktopOrLaptop ? "App": isMobile? "App-mobile" : "App-medium"}`}>
      <SettingsPanel targetSchedule={selected} classes = {timetable.classes} teachers = {timetable.teachers} changeClass={changeClass}/>
      <Schedule periods={timetable.periods} clazz={R.groupBy((l) => l.days, cards!)} />
    </div>
  )   
}
