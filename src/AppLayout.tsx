import React, { useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { SettingsPanel } from './components/SettingsPanel';
import { Schedule } from './components/Schedule';
import { denormalizeData, PopulatedLesson, maybeGetProp } from './utils';
import './styles/App.css';
import { Timetable, TimetableMap } from './types';

interface Props {
  timetables: [Timetable, TimetableMap],
  selectedType: 'class' | 'teacher' | 'classroom',
  selected: string,
  changeSelectedTimetable: (name: string, type: 'class' | 'teacher' | 'classroom') => void,
}

export const AppLayout: React.FC<Props> = ({ timetables, selectedType, selected, changeSelectedTimetable }) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' })

  const [timetable, timetableMap] = timetables

  const filterFn = useMemo(
    () => {
      const fn: (l: PopulatedLesson) => boolean = {
        class: (l: PopulatedLesson) => l.classes.map(c => c.name).includes(selected),
        teacher: (l: PopulatedLesson) => l.teacher.name === selected,
        classroom: (l: PopulatedLesson) => maybeGetProp(l.classrooms[0], 'name') === selected,
      }[selectedType]
      return fn
    },
    [selectedType, selected],
  )

  const lessons = useMemo(
    () => denormalizeData(timetableMap).filter(filterFn),
    [timetableMap, filterFn]
  )

  return (
    <div className={isDesktopOrLaptop ? 'App' : isMobile ? 'App-mobile' : 'App-medium'}>
      <SettingsPanel
        targetSchedule={selected}
        classroom={timetable.classrooms}
        class={timetable.classes}
        teacher={timetable.teachers}
        changeClass={changeSelectedTimetable} />
      <Schedule
        selectedType={selectedType}
        periods={timetable.periods}
        lessons={lessons}
      />
    </div>
  )
}
