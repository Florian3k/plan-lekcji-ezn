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
export const Lesson: React.FC<LessonProps> = lessonProps => {

  const isMobile = useMediaQuery({ query: '(max-width: 900px)' })  

  // Return empty lesson when no props
  if (!lessonProps.lessonsAtSameTime || !lessonProps.selectedType) {
    return <div className="lesson-block"></div>
  }

  
  const maxLenghtOfLesson = isMobile ? 20 : 15;
  const period = lessonProps.lessonsAtSameTime[0].period;
  const day = lessonProps.lessonsAtSameTime[0].days.split("").indexOf("1");
  
  const displayingHoursElement = (
    <div className="hours">
      <div className="hour-start">{lessonProps.period!.starttime}</div>
      <div className="hour-end">{lessonProps.period!.endtime}</div>
    </div>
  )

  const LessonBlock = lessonProps.lessonsAtSameTime.map( (lesson: any) => {
    
    // UpperLeft default -> subject
    let upperLeft: any = lesson.subject.length > maxLenghtOfLesson ?
      lesson.subject_short
      : lesson.subject
    
    // UpperRight default -> classroom
    let upperRight: any = lesson.classroom? 'Sala ' + lesson.classroom : null
    
    // BottomLeft default -> teacher
    let bottomLeft: any = lesson.teacher;
    
    // BottomRight default -> 'parzysty'/'nieparzysty' group
    let bottomRight: any = lesson.weeks === '10' ?
    'Parzysty '
    : lesson.weeks === '01' ?
      'Nieparzysty '
      : '';

    bottomRight += lesson.group === 'Cała klasa' ?
      ''
      : lesson.group

    switch (lessonProps.selectedType) {
      case 'teacher':
        bottomLeft = lesson.clazz ? lesson.clazz.name : null
      
      break
      case 'class':
        break
      case 'classroom':
        upperRight = lesson.clazz ? lesson.clazz[0].name : null
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
    { isMobile? displayingHoursElement : null}
    { LessonBlock }
  </div> 
}
