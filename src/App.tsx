import React, { useState } from 'react';
import * as R from 'ramda';
import { useTimetable } from './hooks/useTimetable';

export const App: React.FC = () => {
  const timetable = useTimetable()
  
  // const [selectedType, setSelectedType] = useState<'class' | 'teacher' | 'classroom'>('class')
  const [selected, setSelected] = useState('4 H')
  
  const byId = (id: string) => R.propEq('id', id);

  if (!timetable) {
    return <div>Loading...</div>
  }

  const clazz = timetable.classes.find(({ name }) => name === selected)

  const lessons = clazz && timetable.lessons
    .filter(l => l.classids === clazz.id)
    .map(l =>
      ({
      ...l,
      subject: timetable.subjects.find(byId(l.subjectid))!.name,
      week: timetable.weeksdefs.find(byId(l.weeksdefid)),
      day: timetable.daysdefs.find(byId(l.daysdefid)),
      teacher: timetable.teachers.find(byId(l.teacherids))!.name,
      group: timetable.groups.find(byId(l.groupids))!.name,
      // period: timetable.periods.find(byId())
    }))

  const lessonsIds = clazz && new Set(lessons!.map(x => x.id))

  const cards = lessons && timetable.cards
    .filter(c => lessonsIds!.has(c.lessonid))
    .map(c => ({
      ...c,
      classroom: timetable.classrooms.find(byId(c.classroomids))!.name,
      lesson: lessons.find(l => l.id === c.lessonid),
    }))

  const cards2 = cards && cards.map(c => ({
    ...R.pick(['period', 'weeks', 'days', 'classroom'], c),
    ...R.pick(['teacher', 'subject', 'group'], c.lesson),
  })).sort((a,b) => (a.period as any) - (b.period as any))

  return (
    <div>
      {Object.entries(timetable).map(([k, v]) => 
        <div key={k}>
        {k} - {Object.keys(v[0]).join(', ')}
        </div>
      )}

      <div>
        {
          timetable.classes.map(x => <span style={{marginRight: "10px"}}>{x.name}</span>)
        }
      </div>

      <input value={selected} onChange={(e) => setSelected(e.target.value)}/>

      { lessons ?
        <code>
          <pre>
          {
            // JSON.stringify(R.groupBy((l) => l.daysdefid, lessons), null, 2)
            // JSON.stringify(cards, null, 2)
            JSON.stringify(R.groupBy((l) => l.days, cards2!), null, 2)
          }
          </pre>
        </code>
        : null }
    </div>
  );
}
