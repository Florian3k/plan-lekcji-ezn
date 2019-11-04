import React, { useState, useMemo, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTimetable } from './hooks/useTimetable';
import './styles/App.css';
import { AppLayout } from './AppLayout';

export const App: React.FC = () => {
  const timetables = useTimetable()
  const [selectedType, setSelectedType] = useState<'class' | 'teacher' | 'classroom'>('teacher')
  const [selected, setSelected] = useState('Gabor Michał')

  const changeSelectedTimetable = (name: string, type: typeof selectedType) => {
    setSelectedType(type)
    setSelected(name)
  }

  if (!timetables) {
    return <div>Loading...</div>
  }

  return <AppLayout
    timetables={timetables}
    selectedType={selectedType}
    selected={selected}
    changeSelectedTimetable={changeSelectedTimetable}
  />;

}
