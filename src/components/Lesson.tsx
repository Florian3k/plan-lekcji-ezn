import React from 'react';
import { useMediaQuery } from 'react-responsive';
import '../styles/Lesson.scss';

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

  const isMobile = useMediaQuery({ query: '(max-width: 900px)' })

  const displayingHoursElement = (isDisplayed: boolean) => {
    if (isDisplayed) {
      return (
        <div className="hours">
          <div className="hour-start">{props.period!.starttime}</div>
          <div className="hour-end">{props.period!.endtime}</div>
        </div>
      )
    }
    return null
  }

  const updateRowHeight = (row: number, n: number) => {
    const rowHeightInEm = +document.documentElement.style.getPropertyValue(`--row-${row}-height`).slice(0, -2);
    if (rowHeightInEm < (n - 1) * 3.25 + 5) {
      document.documentElement.style.setProperty(`--row-${row}-height`, `${(n - 1) * 3.25 + 5}em`);
    }
  }

  // Return empty lesson when no props
  if (!props.lessonsAtSameTime || !props.selectedType) {
    return <div className="lesson-block"></div>
  }
  const maxLenghtOfLesson = isMobile ? 20 : 15;
  const period = props.lessonsAtSameTime[0].period;
  const day = props.lessonsAtSameTime[0].days.split("").indexOf("1");


  // Make row higher when inside of LessonBlock are more lessons than 1
  if (props.lessonsAtSameTime.length > 1) {
    updateRowHeight(period, props.lessonsAtSameTime.length)
  }

  const LessonBlock = props.lessonsAtSameTime.map( (lesson: any) => {
    
    // UpperLeft default -> subject
    let upperLeft: any = lesson.subject.length > maxLenghtOfLesson ?
      lesson.subject_short
      : lesson.subject
    // UpperRight default -> classroom
    let upperRight: any = lesson.classroom? 'Sala ' + lesson.classroom : null
    // BottomLeft default -> none
    let bottomLeft: any;
    // BottomRight default -> group
    let bottomRight: any = lesson.group === 'Cała klasa' ?
      null
      : lesson.group

    switch (props.selectedType) {
      case 'teacher':
        bottomLeft = lesson.clazz ? lesson.clazz.name : null
      break
      case 'class':
        bottomLeft = lesson.teacher + ' Jankiewicz-bankiewicz'
        break
      case 'classroom':
        break
      default:
        throw new Error('Wrong selectedtype in lesson')
    }
    return (
      <div className="lesson">
        <div className="lesson__upper-panel">
          <div className="lesson__upper-panel-left lesson__info-field">
            { upperLeft }
          </div>
          <div className="lesson__upper-panel-right lesson__info-field">
            { upperRight }
          </div>
        </div>
        <div className="lesson__bottom-panel lesson__info-field">
          <div className="lesson__bottom-panel-left lesson__info-field">
            { bottomLeft }
          </div>
          <div className="lesson__bottom-panel-right lesson__info-field">
            { bottomRight }
          </div>
        </div>
      </div>
    )
  })
  return <div className={`lesson-block lesson-block-${period}-${day}`}>
    { LessonBlock }
  </div> 
}
