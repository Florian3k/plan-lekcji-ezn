import React, { useState } from 'react';
import * as R from 'ramda';
import { useTimetable } from './hooks/useTimetable';

export const App: React.FC = () => {
  const timetable = useTimetable()
  
  const [selectedType, setSelectedType] = useState<'class' | 'teacher' | 'classroom'>('class')
  const [selected, setSelected] = useState('lol')
  
  if (!timetable) {
    return <div>Loading...</div>
  }

  const clazz = timetable.classes.find(({ name }) => name === selected)

  const lessons = clazz && timetable.lessons.filter(l => l.classids === clazz.id)

  return (
    <div>
      {Object.entries(timetable).map(([k, v]) => 
        <div key={k}>
        {k} - {Object.keys(v[0]).join(', ')}
        </div>
      )}

      <input value={selected} onChange={(e) => setSelected(e.target.value)}/>

      { lessons ?
        <code>
          <pre>
          {
            JSON.stringify(R.groupBy((l) => l.daysdefid, lessons), null, 2)
          }
          </pre>
        </code>
        : null }
    </div>
  );
}
