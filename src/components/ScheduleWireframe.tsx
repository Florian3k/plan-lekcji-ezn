import React, { useState, useEffect } from 'react';
import '../styles/ScheduleWireframe.scss';
import { Lesson } from './Lesson';

interface ClassProps {
  class: any //przepraszam
}

export const ScheduleWireframe: React.FC<ClassProps> = props => {
  let lessons: JSX.Element[] = [];
  let lessonsInfo: any[] = [];
  if(props.class) {
    // Fill lessonsInfo with [days[lessons[lessonbyperiod]]] 

    const daysId = Object.keys(props.class);
    daysId.map(dayId => {
      lessonsInfo.push(
        props.class[dayId].reduce( (p: any[], c: {period: number}, i: number) => {      
        if (p && p[p.length - 1] && c.period === p[p.length - 1][0].period) {
          p[p.length - 1].push(c);
          return p
        }
        else {
          return p ? [...p, [{...c, day: dayId}]] : [[c]]
        }
      }, []));
    })
  }
  if(lessonsInfo.length) {
    lessons = lessonsInfo.map( day => {
      return day.map((lesson: any) => {
        return <Lesson lesson={lesson} />
      })
    })
  }
  
  return (
    <div className="schedule-wireframe">
      {lessons}
    </div>
  )
}