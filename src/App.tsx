import React, { useState, useEffect } from 'react';
import { Timetable } from './types';

export const App: React.FC = () => {
  const [data, setData] = useState<Timetable | null>(null);

  const [selectedType, setSelectedType] = useState<'class' | 'teacher' | 'classroom'>('class')
  const [selected, setSelected] = useState('lol')

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(({termsdefs, ...data}) => {
        if (!data) {
          console.log('zesrało się')
          return;
        }
        setData(data)
        console.log(data)
      })
  }, []);

  if (!data) {
    return <div>Loading...</div>
  }


  const clazz = data.classes.find(({ name }) => name === selected)

  return (
    <div>
      {Object.entries(data).map(([k, v]) => 
        <div key={k}>
        {k} - {Object.keys(v[0]).join(', ')}
        </div>
      )}

      <input value={selected} onChange={(e) => setSelected(e.target.value)}/>

      { clazz ? data.lessons
          .filter(l => l.classids === clazz.id)
          .map(x => 
            <div>
              {Object.entries(x).map(([k,v])=> k + '=' +v).join('\n')}
            </div>
          ) : null }
    </div>
  );
}
