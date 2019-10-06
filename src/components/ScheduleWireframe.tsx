import React from 'react';
import '../styles/ScheduleWireframe.scss';
import { Lesson } from './Lesson';
import { useMediaQuery } from 'react-responsive';
import SwipeableViews from 'react-swipeable-views';

interface ClassProps {
  class: any //przepraszam
}

export const ScheduleWireframe: React.FC<ClassProps> = props => {
  let lessons: JSX.Element[] = [];
  let lessonsByDay: JSX.Element[][] = [];
  let lessonsInfo: any[] = [];
  const isMobile = useMediaQuery({query: '(max-width: 900px)'})
  
  
  // return [days[lessons[lessonbyperiod]]] 
  const getLessonsByDays = (unit: any) => {
    const daysId = Object.keys(unit).sort((a: any, b: any) => a - b);
    const lessonsByDaysArray: any = []
    // eslint-disable-next-line
    
    daysId.map(dayId => {
      lessonsByDaysArray.push(
        unit[dayId].reduce((p: any[], c: { period: number }, i: number) => {
          if (p && p[p.length - 1] && c.period === p[p.length - 1][0].period) {
            p[p.length - 1].push(c);
            return p
          }
          else {
            return p ? [...p, [{ ...c, day: dayId }]].sort((a, b) => a[0].period - b[0].period) : [[c]];
          }
        }, []));
    })
    return lessonsByDaysArray;
  }
  
  if(props.class) {
    lessonsInfo = getLessonsByDays(props.class)
    
    lessons = lessonsInfo.map( day => {
      return day.map((lesson: any) => {
        return <Lesson lesson={lesson} />
      })
    })

    // fill lessons with empty Lesson components
    const lessonsAmount = lessonsInfo.reduce((p: any, c: any) => c.length + p, 0);
    for (let i = 0;  i < 14*5 - lessonsAmount; i++) {
      lessons.push(<Lesson lesson={null} />)
    }
    
    // lessons mobile style: daysArray of Lessons compontents
    lessonsByDay = lessonsInfo.map(day => {
      return day.map((lesson: any) => {
        return <Lesson lesson={lesson} />
      })
    });

  }  
  if(isMobile) {
    return (
      <SwipeableViews>
          {lessonsByDay.map(column => <div> {column} </div>)}
      </SwipeableViews>
    )
  }
  else {
    return (
      <div className="schedule-wireframe">
        {lessons}
      </div>
    )
  }
}