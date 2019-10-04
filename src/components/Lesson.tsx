import React, { useState, useEffect } from 'react';
import '../styles/Lesson.css';
interface LessonProps {
  lesson: any //przepraszam
}

export const Lesson: React.FC<LessonProps> = (props) => {
  if(props.lesson) {
    const period = props.lesson.period;
    // const day = props.lesson.day.split("").reverse().indexOf("1");
    return (
      <div className="lesson">
        <h3>{props.lesson.subject}</h3>
        <div className="teacher">{props.lesson.teacher}</div>
        <div className="room">Sala {props.lesson.classroom}</div>
      </div> 
    )
  }
  else {
    return (
      <div className="lesson">
        
      </div>
    )
  }
}

