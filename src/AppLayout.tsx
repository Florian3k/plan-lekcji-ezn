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

  const [selectedType, setSelectedType] = useState<'class' | 'teacher' | 'classroom'>('class')
  const [selected, setSelected] = useState('4 H')
  // const [selectedGroups, setSelectedGroups] = useState<any>({})

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


  // if(selectedType === 'class') {
  //   cards.map( (card: any) => {
  //     if( !selectedGroups[card.group] ) {
  //       setSelectedGroups({...selectedGroups, [card.group]: true})
  //     }
  //   })
  // }

  // const filterGroup = (name: string) => {
  //   setSelectedGroups({
  //     ...selectedGroups,
  //     [name]: !selectedGroups[name]
  //   })
  // }
  
  // true = user filter them as visible, false = user don't want to see it 
  const randomGroups = {
    'Cała klasa': true,
    'Gr_1': true,
    'Gr_2': false,
    'Jn_1': true,
    'Jn_2': true
  };

  return (
    <div className={isDesktopOrLaptop ? 'App': isMobile ? 'App-mobile' : 'App-medium'}>
      <SettingsPanel
        targetSchedule={selected}
        classroom = {null}
        class = {timetable.classes}
        teacher = {timetable.teachers}
        group = {randomGroups}  
        changeClass={changeClass}
        isFocusOnClass={selectedType === 'class'}
      />
      <Schedule
        periods={timetable.periods}
        clazz={R.groupBy((l) => l.days, cards)}
      />
    </div>
  )
}
