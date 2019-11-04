import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import SwipeableViews from 'react-swipeable-views';
import * as R from 'ramda';

import { DayNames } from './DayNames';
import { Hours } from './Hours';
import { Period } from '../types';
import '../styles/Schedule.scss';
import { Lesson } from './Lesson';
import { PopulatedLesson } from '../utils';

interface ScheduleProps {
  periods: Period[],
  selectedType: 'class' | 'classroom' | 'teacher',
  lessons: PopulatedLesson[],
}

export const Schedule: React.FC <ScheduleProps> = ScheduleProps => {  
  const isMobile = useMediaQuery({query: '(max-width: 900px)'})
  const [chosenDay, setchosenDay] = useState(0) // 0 - 4, for Swipeableviews
  
  const overallLessonBlocksNumber: number = 60
  
  // Mobile feature, allow choose day by clicking at day name
  const changeChosenDay = (index: number) => setchosenDay(index)

  const classesAtSameTimeArr = R.pipe(
    R.groupBy((lesson: {days: string}) => lesson.days),
    days => Object.values(days),
    days => days.map((day: any[]) => R.groupBy((lesson: {period: string}) => lesson.period)(day)),
    days => days.map(day => Object.values(day)),
  )(ScheduleProps.lessons)


  // const lessonsByDayObj = R.groupBy( (lesson: {days: string}) => lesson.days)(ScheduleProps.lessons)
  // // console.log(lessonsByDayObj)
  // const lessonsByDayArr = Object.entries(lessonsByDayObj)
  //   .map(e => R.groupBy( (lesson:any) => lesson.period )(R.sort((a: any, b: any) => a.period - b.period)(e[1])) )
  
  // console.log(xdd)


  //[days][lessons][lessonsAtSameTime]
  // const classesAtSameTimeArr: any[][][] = Object.entries(ScheduleProps.lessons)
  //   .sort(([a], [b]) => (b as any) - (a as any))
  //   .map(([k, v]: any) => R.groupBy((x: any) => x.period, v))
  //   .map(Object.values)

  // Create array filled with Lesson components
  const LessonsArray: JSX.Element[][] = classesAtSameTimeArr.map((day: any) => {
    console.log(day)
    return day.map((lessonsAtSameTime: any, index: number) => {

      // Check if between two lessons are free periods
      let FreePeriod: JSX.Element | null = null
      if (index) {
        const previousPeriod: number = +day[index - 1][0].period
        const currentPeriod: number = +lessonsAtSameTime[0].period

        switch (currentPeriod) {
          case previousPeriod + 1:
            FreePeriod = null
            break
          case previousPeriod + 2:
            FreePeriod = <div className="free-period">Okienko</div>
            break
          default:
            FreePeriod = <div className="free-period">Okienka</div>
        }
      }
      return (
        <>
          {FreePeriod}
          <Lesson
            lessonsAtSameTime={lessonsAtSameTime}
            period={ScheduleProps.periods[lessonsAtSameTime[0].period]}
            selectedType={ScheduleProps.selectedType}
            key={index}
          />
        </>
      )
    })}
  )

  const lessonsAmount: number = classesAtSameTimeArr.reduce((p: any, c: any) => c.length + p, 0)
  const EmptyLessonsArray: JSX.Element[][] = []
  
  // fill LessonsArray with empty Lesson components
  for (let i = 0; i < overallLessonBlocksNumber - lessonsAmount; i++) {
    EmptyLessonsArray.push([<Lesson lessonsAtSameTime={null} key={i + lessonsAmount} />])
  }

  if(isMobile) {
    // Mobile view
    const LessonsArrayMobile = LessonsArray.map((column: any) => <div className="day-lessons-wrapper"> {column} </div>)
    return (
      <div className="mobile-main">
        <div className="xd">
          <div className={`days-mobile target-${chosenDay}`}>
            <div className="day-mobile day-0" onClick={() => setchosenDay(0)}>PON</div>
            <div className="day-mobile day-1" onClick={() => setchosenDay(1)}>WT</div>
            <div className="day-mobile day-2" onClick={() => setchosenDay(2)}>ŚR</div>
            <div className="day-mobile day-3" onClick={() => setchosenDay(3)}>CZW</div>
            <div className="day-mobile day-4" onClick={() => setchosenDay(4)}>PT</div>
          </div>
          <SwipeableViews className="swipeable-views" onChangeIndex={(index) => changeChosenDay(index)} index={chosenDay}>
            {
              LessonsArrayMobile
            }
          </SwipeableViews>
        </div>
      </div>
    )
  }
  else {
    // Desktop view
    return (
      <div className="main">
        <div className="covering-area"></div>
        <Hours periods={ScheduleProps.periods} />
        <DayNames />
        {
          [...LessonsArray, ...EmptyLessonsArray]
        }
      </div>
    )
  }
}