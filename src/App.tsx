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
  // return (
  //   <div>
  //     {Object.entries(timetable).map(([k, v]) => 
  //       <div key={k}>
  //       {k} - {Object.keys(v[0]).join(', ')}
  //       </div>
  //     )}

  //     <div>
  //       {
  //         timetable.classes.map(x => <span style={{marginRight: "10px"}}>{x.name}</span>)
  //       }
  //     </div>

  //     <input value={selected} onChange={(e) => setSelected(e.target.value)}/>

  //     { cards ?
  //       <code>
  //         <pre>
  //         {
  //           // JSON.stringify(R.groupBy((l) => l.daysdefid, lessons), null, 2)
  //           // JSON.stringify(cards, null, 2)
              

  //         }
  //         </pre>
  //       </code>
  //       : null }
  //   </div>
  // );
  // 00001
  // ]]
  console.log(timetable.classes)
  return (
    <AppLayout clazz={R.groupBy((l) => l.days, cards!)}/>
  )
}
