import React, { useState } from 'react';
import * as R from 'ramda';
import { useTimetable } from './hooks/useTimetable';
import { getClassTimetable } from './utils';
import { App as AppLayout} from './AppLayout';
export const App: React.FC = () => {
  const timetable = useTimetable()
  
  // const [selectedType, setSelectedType] = useState<'class' | 'teacher' | 'classroom'>('class')
  const [selected, setSelected] = useState('4 H')
  
  if (!timetable) {
    return <div>Loading...</div>
  }

  const cards = getClassTimetable(timetable, selected)
  return (
    <AppLayout clazz={R.groupBy((l) => l.days, cards!)}/>
  )
}
