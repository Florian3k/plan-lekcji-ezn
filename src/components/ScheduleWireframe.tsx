import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import SwipeableViews from 'react-swipeable-views';
import * as R from 'ramda';
import { Lesson } from './Lesson';
import '../styles/ScheduleWireframe.scss';

interface ClassProps {
  class: any,
  periods: any[],
  selectedType: 'class' | 'classroom' | 'teacher'
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
    return Object.entries(unit)
      .sort(([a], [b]) => (b as any) - (a as any))
      .map(([k, v]: any) => R.groupBy((x: any) => x.period, v))
      .map(Object.values)
  }
  
  if(props.class) {
    lessonsInfo = getLessonsByDays(props.class)
    
    lessons = lessonsInfo.map( day => {
      return day.map((lesson: any) => {
        return <Lesson lesson={lesson} selectedType={props.selectedType} />
      })
    })

    // fill lessons with empty Lesson components
    const lessonsAmount = lessonsInfo.reduce((p: any, c: any) => c.length + p, 0);
    for (let i = 0;  i < 12*5 - lessonsAmount; i++) {
      lessons.push(<Lesson lesson={null} />)
    }
    
    // lessons mobile style: daysArray of Lessons compontents
    lessonsByDay = lessonsInfo.map(day =>{
      let previousPeriod: string;
      return day.map((lesson: any, i: number) => {
        // lesson starts more than 1 lesson's hour after previous
        if (previousPeriod && (+previousPeriod) + 1 !== +lesson[0].period) {
          previousPeriod = lesson[0].period;
          return (
              <>
                <div className="free-period">
                  { +day[i-1][0].period + 2 < +lesson[0].period ? 'Okienka' : 'Okienko'}
                </div>
                <Lesson
                  lesson={lesson}
                  period={props.periods[lesson[0].period]}
                  selectedType={props.selectedType}
                />
              </>
            )
            
        }
        previousPeriod = lesson[0].period;
        return (
        <Lesson 
          lesson={lesson}
          period={props.periods[lesson[0].period]}
          selectedType={props.selectedType}
        />)
      }
      )}
    );

  }  
  if(isMobile) {
    return (
      <div className="xd">
        <div className={`days-mobile target-${chosenDay}`}>
          <div className="day-mobile day-0" onClick={() => setchosenDay(0)}>PON</div>
          <div className="day-mobile day-1" onClick={() => setchosenDay(1)}>WT</div>
          <div className="day-mobile day-2" onClick={() => setchosenDay(2)}>ŚR</div>
          <div className="day-mobile day-3" onClick={() => setchosenDay(3)}>CZW</div>
          <div className="day-mobile day-4" onClick={() => setchosenDay(4)}>PT</div>
        </div>
        <SwipeableViews onChangeIndex = {(index) => changeChosenDay(index)} index={chosenDay}>
          {
            lessonsByDay.map(column => <div> {column} </div>)
          }
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