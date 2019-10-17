import React from 'react';
import { useMediaQuery } from 'react-responsive';
import '../styles/Lesson.scss';
import { Class } from '../types';

interface LessonProps {
  lessonsAtSameTime: any,
  selectedType?: 'class' | 'classroom' | 'teacher',
  period?: {
    period: string,
    endtime: string,
    starttime: string
  }
}
export const Lesson: React.FC<LessonProps> = (props) => {
  const updateRowHeight = (row: number, n: number) => {
    document.documentElement.style.setProperty(`--row-${row}-height`, `${(n-1)*3.25 + 5}em`);
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
  console.log(props)
  if(props.lessonsAtSameTime && props.selectedType) {
    const maxLenghtOfLesson = isMobile ? 20 : 15;
    const period = props.lessonsAtSameTime[0].period;
    const day = props.lessonsAtSameTime[0].days.split("").indexOf("1");

    if(props.lessonsAtSameTime.length > 1) {
      // At this period of time last 2 or more lessons
      updateRowHeight(props.lessonsAtSameTime[0].period, props.lessonsAtSameTime.length)
      const content = props.lessonsAtSameTime.map((partLesson: any, i: number) => {
        const week = partLesson.weeks === '10' ?
          'Parzysty'
          : partLesson.weeks === '01' ?
            'Nieparzysty' : '';

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
                partLesson.subject.length > maxLenghtOfLesson ?
                  partLesson.subject_short
                  : partLesson.subject
              }
            </h3>
            {
              props.selectedType === 'classroom' ?
                props.lessonsAtSameTime.clazz.map((x: Class) => x.name).join(' / ')
                  : partLesson.classroom ?
                  <div className="room">Sala {partLesson.classroom}</div>
                  : null
            }
          </div>
          <div className="bottom-side">
            <div className='teacher'>{lessonWith}</div>
            {
                partLesson.group && partLesson.group !== 'Cała klasa' ? (<div className="group"> {week+ ' ' + partLesson.group} </div>): null}
          </div>
        </div>
      )})
      return (
        <div className={`lesson${isMobile ? "-mobile" : ""} part-${props.lessonsAtSameTime.length}-of-lesson lesson-${period}-${day}`}>
          {displayingHoursElement(isMobile)}
          { content }
        </div>
      )
    }
    else {
      // At this period of time lasts 1 lesson
      const lessonWith = props.selectedType === 'teacher' ? 
        props.lessonsAtSameTime[0].clazz?
          props.lessonsAtSameTime[0].clazz.name
          : ''
        : props.lessonsAtSameTime[0].teacher;
      return (
        <div className={`lesson${isMobile? "-mobile" : ""} lesson-${period}-${day}`}>
            {displayingHoursElement(isMobile)}          
            <div className="upper-side">
              <h3>
                {
                  props.lessonsAtSameTime[0].subject.length > maxLenghtOfLesson ?
                    props.lessonsAtSameTime[0].subject_short
                    : props.lessonsAtSameTime[0].subject
                }
              </h3>
              { props.selectedType === 'classroom' ? 
                <div className="room"> {props.lessonsAtSameTime[0].clazz.map((x: Class) => x.name).join(' / ')} </div>
                : props.lessonsAtSameTime[0].classroom ?
                  <div className="room">Sala {props.lessonsAtSameTime[0].classroom}</div>
                  : null
              }
            </div>
            <div className="bottom-side">
              <div className='teacher'> {lessonWith} </div>
              {props.lessonsAtSameTime[0].group && props.lessonsAtSameTime[0].group !== 'Cała klasa' ? (<div className="group"> {props.lessonsAtSameTime[0].group} </div>) : null}
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

