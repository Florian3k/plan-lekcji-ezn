import React, { useState, useEffect } from 'react';
import '../styles/ScheduleWireframe.css';
import { Lesson } from './Lesson';

interface ClassProps {
  class: any //przepraszam
}

export const ScheduleWireframe: React.FC<ClassProps> = props => {
  const lessons: JSX.Element[] = [];
  if (props.class !== null && props.class !== undefined) {
    const daysArray = Object.keys(props.class).map((day) => {
      return props.class[day];
    });
    for(let i = 0; i < 5; i++) {
      if(daysArray[i]) {
        const dayArray = Object.keys(daysArray[i]).map((lesson) => {
          return daysArray[i][lesson];
        });
  
        const y = new Map(dayArray.map(({period, ...rest}) => [period, rest]))
        
        for (let lessonNumber = 0; lessonNumber < 14; lessonNumber++) {
          const singleLesson = y.get(`${lessonNumber}`);
          if(singleLesson) {
            const lessonInfo = {...singleLesson, day: i, period: lessonNumber};
            lessons.push((<Lesson lesson={lessonInfo} />))
          }
          else {
            lessons.push((<Lesson lesson={null} />))
          }
        }
      }


    }
  }
  return (
    <div className="schedule-wireframe">
      {lessons}
    </div>
  )
}