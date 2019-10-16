import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import SwipeableViews from 'react-swipeable-views';
import * as R from 'ramda';
import { Lesson } from './Lesson';
import '../styles/ScheduleWireframe.scss';
import { Lesson as LessonType } from '../types';

interface ClassProps {
  class: any,
  periods: any[],
  selectedType: 'class' | 'classroom' | 'teacher'
}

export const ScheduleWireframe: React.FC<ClassProps> = props => {
  // let lessons: any = [] //JSX.Element[] = []
  let lessonsByDay: JSX.Element[][] = []
  const isMobile = useMediaQuery({query: '(max-width: 900px)'})
  const [chosenDay, setchosenDay] = useState(0)

  // Mobile feature, allow choose day by clicking at day name
  const changeChosenDay = (index: number) => {
    setchosenDay(index)
  }

  if(!props.class) {
    return <div>
      Loading data...
    </div>
  }

  //[days][lessons][lessonsAtSameTime]
  const lessonsInfo: any[][][] = Object.entries(props.class)
    .sort(([a], [b]) => (b as any) - (a as any))
    .map(([k, v]: any) => R.groupBy((x: any) => x.period, v))
    .map(Object.values)
  

  const LessonsArray: JSX.Element[][] = lessonsInfo.map( day => 
  day.map((lessonsAtSameTime: any, index) => 
    <Lesson 
      lessonsAtSameTime = {lessonsAtSameTime}
      selectedType = {props.selectedType}
      key = {index}
    />
  ))

  const lessonsAmount: number = lessonsInfo.reduce((p: any, c: any) => c.length + p, 0)

  // fill LessonsArray with empty Lesson components
  for (let i = 0;  i < 12*5 - lessonsAmount; i++) {
    LessonsArray.push([<Lesson lessonsAtSameTime={null} key={i + lessonsAmount} />])
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
              lessonsAtSameTime={lesson}
              period={props.periods[lesson[0].period]}
              selectedType={props.selectedType}
            />
          </>
        )
          
        }
        previousPeriod = lesson[0].period;
        return (
        <Lesson 
          lessonsAtSameTime={lesson}
          period={props.periods[lesson[0].period]}
          selectedType={props.selectedType}
        />)
      }
      )}
    );
  if(isMobile) {
    // Mobile
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
    // Desktop, laptop etc
    return (
      <div className="schedule-wireframe">
        {LessonsArray}
      </div>
    )
  }
}