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
  
  const isMobile = useMediaQuery({
    query: '(max-width: 900px)'
  })

  if(props.class) {
    // Fill lessonsInfo with [days[lessons[lessonbyperiod]]] 

    const daysId = Object.keys(props.class);
    // eslint-disable-next-line
    daysId.map(dayId => {
      lessonsInfo.push(
        props.class[dayId].reduce( (p: any[], c: {period: number}, i: number) => {      
        if (p && p[p.length - 1] && c.period === p[p.length - 1][0].period) {
          p[p.length - 1].push(c);
          return p
        }
        else {
          return p ? [...p, [{...c, day: dayId}]] : [[c]]
        }
      }, []));
    })
  }
  if(lessonsInfo.length) {
    lessons = lessonsInfo.map( day => {
      return day.map((lesson: any) => {
        return <Lesson lesson={lesson} />
      })
    })

    // fill lessons with empty Lesson component
    const lessonsAmount = lessonsInfo.reduce((p: any, c: any) => c.length + p, 0);
    for (let i = 0;  i < 14*5 - lessonsAmount; i++) {
      lessons.push(<Lesson lesson={null} />)
    }
    
    lessonsByDay = lessonsInfo.map(day => {
      return day.map((lesson: any) => {
        return <Lesson lesson={lesson} />
      })
    });

  }  
  if(isMobile) {
    return (
      <SwipeableViews>
          {lessonsByDay.map(column =><div> {column} </div>)}
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