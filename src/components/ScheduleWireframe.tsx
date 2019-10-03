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
    lessons = days.map(day => {
      console.log(day)
      const lessonNumbers = Object.keys(day)
      return lessonNumbers.map( lesson => (
        <Lesson lesson={{...props.class[day][lesson], day}} />
      ))
    })
  }
  return (
    <div className="schedule-wireframe">
      {lessons}
    </div>
  )
}
