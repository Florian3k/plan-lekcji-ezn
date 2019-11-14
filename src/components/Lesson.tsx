import React from 'react';
import { useMediaQuery } from 'react-responsive';
import '../styles/Lesson.scss';

interface LessonProps {
  lessonsAtSameTime?: any,
  selectedType?: 'class' | 'classroom' | 'teacher',
  period?: {
    name: string,
    endtime: string,
    starttime: string
  }
}
export const Lesson: React.FC<LessonProps> = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' })  

  const maxLenghtOfLesson = isMobile ? 20 : 15;
  const period = props.period!.name;
  const day = props.lessonsAtSameTime[0].days.split("").indexOf("1");
  
  const displayingHoursElement = (
    <div className="hours">
      <div className="hour-start">{props.period!.starttime}</div>
      <div className="hour-end">{props.period!.endtime}</div>
    </div>
  )

  const LessonBlock = props.lessonsAtSameTime.map( (lesson: any) => {
    
    // UpperLeft default -> subject
    let upperLeft: any = lesson.subject.name.length > maxLenghtOfLesson ?
      lesson.subject.short
      : lesson.subject.name
    
    // UpperRight default -> classroom
    let upperRight: any = lesson.classrooms[0]? 'Sala ' + lesson.classrooms[0].name : null
    
    // BottomLeft default -> teacher
    let bottomLeft: any = lesson.teacher.name;
    
    // BottomRight default -> 'parzysty'/'nieparzysty' group
    let bottomRight: any = lesson.weeks === '10' ?
    'Parzysty '
    : lesson.weeks === '01' ?
      'Nieparzysty '
      : '';

    bottomRight += lesson.groups[0].name === 'Cała klasa' ?
      ''
      : lesson.groups[0].name

    switch (props.selectedType) {
      case 'teacher':
        bottomLeft = lesson.classes[0] ? lesson.classes.map((classs: {name: string}) => classs.name).join(', ') : null

      break
      case 'class':
        break
      case 'classroom':
        upperRight = lesson.classes[0] ? lesson.classes.map((classs: { name: string }) => classs.name).join(', ') : null
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
