import React, { useState } from 'react';
import * as R from 'ramda';
import { useMediaQuery } from 'react-responsive';
import { SettingsPanel } from './components/SettingsPanel';
import { Schedule } from './components/Schedule';
import { useTimetable } from './hooks/useTimetable';
import { getClassTimetable, getTeacherTimetable, getClassroomTimetable } from './utils';
import './styles/App.css';

export const App: React.FC = () => {
  const timetable = useTimetable()
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' })

  const [selectedType, setSelectedType] = useState<'class' | 'teacher' | 'classroom'>('class')
  const [selected, setSelected] = useState('4 H')

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
    classroom: getClassroomTimetable,
  }[selectedType](timetable, selected)

  if (!cards) {
    return <div>
      "Error - not data found"
    </div>
  }
  console.log(cards)

  return (
    <div className={isDesktopOrLaptop ? 'App': isMobile ? 'App-mobile' : 'App-medium'}>
      <SettingsPanel 
        targetSchedule={selected}
        classroom = {null}
        class = {timetable.classes}
        teacher = {timetable.teachers}
        changeClass={changeClass}/>
      <Schedule
        periods={timetable.periods}
        clazz={R.groupBy((l) => l.days, cards)}
      />
    </div>
  )
}
