import React from 'react';
import '../styles/Lesson.scss';
import { useMediaQuery } from 'react-responsive';

interface LessonProps {
  lesson: any //przepraszam
}
export const Lesson: React.FC<LessonProps> = (props) => {
  const updateRowHeight = (row: number, n: number) => {
    document.documentElement.style.setProperty(`--row-${row}-height`, `${(n-1)*2.4 + 4}em`);
  }
  const hours = (period: number) => {
    return {
      start: `${period+7}:15`,
      end: `${period+8}:45`
    }
  }
  const isMobile = useMediaQuery({
    query: '(max-width: 900px)'
  })

  const isWindowsOS = (window.navigator.userAgent.indexOf("Windows") !== -1 || window.navigator.userAgent.indexOf("Windows") !== -1)  
  
  if(props.lesson) {
    const period = props.lesson[0].period;
    const day = props.lesson[0].day.split("").reverse().indexOf("1");
    
    if(props.lesson.length > 1) {
      // At this period of time last 2 or more lessons
      updateRowHeight(props.lesson[0].period, props.lesson.length)
      const content = props.lesson.map((partLesson: any, i: number) => (
        <div className={`lesson-divided-part`}>
          <div className="upper-side">
            <h3>{partLesson.subject}</h3>
            <div className="room">Sala {partLesson.classroom}</div>
          </div>
          <div className="bottom-side">
            <div className={`teacher ${partLesson.teacher === "Michał Gabor" && isWindowsOS ? "comic": ""}`}>{partLesson.teacher}</div>
          </div>
        </div>
      ))
      return (
        <div className={`lesson${isMobile ? "-mobile" : ""} part-${props.lesson.length}-of-lesson lesson-${period}-${day}`}>
          { content }
        </div>
      )
    }
    else {
      // At this period of time lasts 1 lesson
      return (
        <div className={`lesson${isMobile? "-mobile" : ""} lesson-${period}-${day}`}>
          <div className="upper-side">
            <h3>{props.lesson[0].subject}</h3>
            <div className="room">Sala {props.lesson[0].classroom}</div>
          </div>
          <div className="bottom-side">
            <div className={`teacher ${props.lesson[0].teacher === "Michał Gabor" && isWindowsOS ? "comic" : ""}`}>{props.lesson[0].teacher}</div>
          </div>
        </div> 
      )
    }
  }
  else {
    // This is border filler
    return (
      <div className="lesson">
        
      </div>
    )
  }
}

