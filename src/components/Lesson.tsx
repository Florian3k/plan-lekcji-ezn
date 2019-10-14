import React from 'react';
import { useMediaQuery } from 'react-responsive';
import '../styles/Lesson.scss';

interface LessonProps {
  lesson: any,
  selectedType?: 'class' | 'classroom' | 'teacher',
  period?: {
    period: string,
    endtime: string,
    starttime: string
  }
}
export const Lesson: React.FC<LessonProps> = (props) => {
  const updateRowHeight = (row: number, n: number) => {
    document.documentElement.style.setProperty(`--row-${row}-height`, `${(n-1)*3 + 4.5}em`);
  }

  const isMobile = useMediaQuery({
    query: '(max-width: 900px)'
  })
  const displayingHoursElement = (isDisplayed: boolean) => {
    if (isDisplayed) {
      return (
        <div className="hours">
          <div className="hour-start">{props.period!.starttime}</div>
          <div className="hour-end">{props.period!.endtime}</div>          
        </div>
    )}
    return null
  }
  const isWindowsOS = (window.navigator.userAgent.indexOf("Windows") !== -1 || window.navigator.userAgent.indexOf("Windows") !== -1)  
  
  if(props.lesson && props.selectedType) {

    const period = props.lesson[0].period;
    const day = props.lesson[0].days.split("").indexOf("1");
    
    if(props.lesson.length > 1) {
      // At this period of time last 2 or more lessons
      updateRowHeight(props.lesson[0].period, props.lesson.length)
      const content = props.lesson.map((partLesson: any, i: number) => {
        console.log(partLesson)        
        const lessonWith = props.selectedType === 'teacher' ?
          partLesson.clazz ?
            partLesson.clazz.name
            : ''
          : partLesson.teacher;
        return (
        <div className={`lesson-divided-part`}>
          <div className="upper-side">
            <h3>
              {
                partLesson.subject.length > 17 ?
                  partLesson.subject_short
                  : partLesson.subject
              }
            </h3>
            {partLesson.classroom ? <div className="room">Sala {partLesson.classroom}</div> : null}
          </div>
          <div className="bottom-side">
            <div className={`teacher ${partLesson.teacher === "Gabor Michał" && isWindowsOS ? "comic": ""}`}>{lessonWith}</div>
            {partLesson.group && partLesson.group !== 'Cała klasa' ? (<div className="group"> {partLesson.group} </div>): null}
          </div>
        </div>
      )})
      return (
        <div className={`lesson${isMobile ? "-mobile" : ""} part-${props.lesson.length}-of-lesson lesson-${period}-${day}`}>
          {displayingHoursElement(isMobile)}
          { content }
        </div>
      )
    }
    else {
      // At this period of time lasts 1 lesson
      const lessonWith = props.selectedType === 'teacher' ? 
        props.lesson[0].clazz?
          props.lesson[0].clazz.name
          : ''
        : props.lesson[0].teacher;
      return (
        <div className={`lesson${isMobile? "-mobile" : ""} lesson-${period}-${day}`}>
            {displayingHoursElement(isMobile)}          
            <div className="upper-side">
              <h3>
                {
                  props.lesson[0].subject.length > 17 ?
                    props.lesson[0].subject_short
                    : props.lesson[0].subject
                }
              </h3>
              {props.lesson[0].classroom ? <div className="room">Sala {props.lesson[0].classroom}</div> : null}
            </div>
            <div className="bottom-side">
              <div className={`teacher ${props.lesson[0].teacher === "Gabor Michał" && isWindowsOS ? "comic" : ""}`}> {lessonWith} </div>
              {props.lesson[0].group && props.lesson[0].group !== 'Cała klasa' ? (<div className="group"> {props.lesson[0].group} </div>) : null}
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

