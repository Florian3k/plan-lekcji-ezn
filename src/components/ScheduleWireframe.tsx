import React, { useState, useEffect } from 'react';
import '../styles/ScheduleWireframe.css';
import { Lesson } from './Lesson';

interface ClassProps {
  class: any //przepraszam
}

export const ScheduleWireframe: React.FC<ClassProps> = props => {
  let lessons:any;
  if(props.class !== null && props.class !== undefined) {
    const days = Object.keys(props.class)
    let overallLessonsNumber = 0;
    lessons = days.map(day => {
      const lessonNumbers = Object.keys(day)
      overallLessonsNumber += lessonNumbers.length;
      return lessonNumbers.map( lesson => (
        <Lesson lesson={{...props.class[day][lesson], day}} />
      ))
    })
    lessons.push([]);
    for(let i = 0; i < 14*5 - overallLessonsNumber; i++) {
      lessons[lessons.length - 1].push(<Lesson lesson={null}/>)
    }
    console.log(lessons)
  }
  return (
    <div className="schedule-wireframe">
      {lessons}
    </div>
  )
}
