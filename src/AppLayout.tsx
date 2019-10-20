import React, { useState, useEffect } from 'react';
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
  // temp
  const exampleGroups = ['G_1', 'G_2', 'Jn_1', 'Jn_2']
  const groups: any = {}
  exampleGroups.map((group: string) => groups[group] = true)
  groups['Jn_2'] = false
  const [activeGroups, setActiveGroups] = useState(groups)
  const toggleActiveGroup = (group: string) => {
    setActiveGroups({
      ...activeGroups,
      [group]: !activeGroups[group]
    })
  }
  // temp
  const [selectedType, setSelectedType] = useState<'class' | 'teacher' | 'classroom'>('class')
  const [selected, setSelected] = useState('4 H')
  // const [selectedGroups, setSelectedGroups] = useState<any>({})

  const changeSelectedTimetable = (name: string, type: typeof selectedType) => {
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
      "Error - not data found"class
    </div>
  }

  
  return (
    <div className={isDesktopOrLaptop ? 'App': isMobile ? 'App-mobile' : 'App-medium'}>
      <SettingsPanel 
        targetSchedule    = {selected}
        classroom         = {timetable.classrooms}
        class             = {timetable.classes}
        teacher           = {timetable.teachers}
        changeClass       = {changeSelectedTimetable}

        activeGroups      = {activeGroups}
        toggleActiveGroup = {toggleActiveGroup}
        />
      <Schedule
        selectedType  = {selectedType}
        periods       = {timetable.periods}
        clazz         = {R.groupBy((l) => l.days, cards)}
      />
    </div>
  )
}
