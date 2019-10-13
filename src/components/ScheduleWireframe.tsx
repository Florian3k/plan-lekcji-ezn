import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import SwipeableViews from 'react-swipeable-views';
import { Lesson } from './Lesson';
import '../styles/ScheduleWireframe.scss';

interface ClassProps {
  class: any,
  periods: any[]
}

export const ScheduleWireframe: React.FC<ClassProps> = props => {
  let lessons: JSX.Element[] = [];
  let lessonsByDay: JSX.Element[][] = [];
  let lessonsInfo: any[] = [];
  const isMobile = useMediaQuery({query: '(max-width: 900px)'})
  const [chosenDay, setchosenDay] = useState(0)
  const changeChosenDay = (index: number) => {
    setchosenDay(index)
  }
  // return [days[lessons[lessonbyperiod]]] 
  const getLessonsByDays = (unit: any) => {
    const daysId = Object.keys(unit).sort((a: any, b: any) => a - b);
    const lessonsByDaysArray: any = []
    // eslint-disable-next-line
    daysId.map(dayId => {
      return lessonsByDaysArray.push(
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
    lessonsByDay = lessonsInfo.map(day => 
      day.map((lesson: any) => <Lesson lesson={lesson} period={props.periods[lesson[0].period]}/>)
    );

  }  
  if(isMobile) {
    return (
      <div>
        <div className={`days-mobile target-${chosenDay}`}>
          <div className="day-mobile day-0" onClick={() => setchosenDay(0)}>PON</div>
          <div className="day-mobile day-1" onClick={() => setchosenDay(1)}>WT</div>
          <div className="day-mobile day-2" onClick={() => setchosenDay(2)}>ŚR</div>
          <div className="day-mobile day-3" onClick={() => setchosenDay(3)}>CZW</div>
          <div className="day-mobile day-4" onClick={() => setchosenDay(4)}>PT</div>
        </div>
        <SwipeableViews onChangeIndex = {(index) => changeChosenDay(index)} index={chosenDay}>
          {lessonsByDay.map(column => <div> {column} </div>)}
        </SwipeableViews>
      </div>
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