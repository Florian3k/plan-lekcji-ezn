import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Hours } from './Hours';
import { DayNames } from './DayNames';
import * as R from 'ramda';

// import { ScheduleWireframe } from './ScheduleWireframe';
import { Period, Lesson as LessonType } from '../types';
import '../styles/Schedule.scss';
import { Lesson } from './Lesson';
import SwipeableViews from 'react-swipeable-views';

interface ScheduleProps {
  periods: Period[],
  selectedType: 'class' | 'classroom' | 'teacher',
  clazz: {
    [index: string]: LessonType[] | any[]
  }
}

export const Schedule: React.FC <ScheduleProps> = ScheduleProps => {  
  const isMobile = useMediaQuery({query: '(max-width: 900px)'})
  const [chosenDay, setchosenDay] = useState(0) // 0 - 4, for Swipeableviews
  
  const overallLessonBlocksNumber: number = 60
  
  // Mobile feature, allow choose day by clicking at day name
  const changeChosenDay = (index: number) => setchosenDay(index)

  if (!ScheduleProps.clazz) {
    return <div>
      Loading data...
    </div>
  }

  //[days][lessons][lessonsAtSameTime]
  const classesAtSameTimeArr: any[][][] = Object.entries(ScheduleProps.clazz)
    .sort(([a], [b]) => (b as any) - (a as any))
    .map(([k, v]: any) => R.groupBy((x: any) => x.period, v))
    .map(Object.values)

  const LessonsArray: JSX.Element[][] = classesAtSameTimeArr.map(day =>
    day.map((lessonsAtSameTime: any, index) => {

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
    })
  )

  const lessonsAmount: number = classesAtSameTimeArr.reduce((p: any, c: any) => c.length + p, 0)

  // fill LessonsArray with empty Lesson components
  for (let i = 0; i < overallLessonBlocksNumber - lessonsAmount; i++) {
    LessonsArray.push([<Lesson lessonsAtSameTime={null} key={i + lessonsAmount} />])
  }

  if(isMobile) {
    const LessonsArrayMobile = LessonsArray.slice(0, 5).map((column: any) => <div> {column} </div>)

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
          <SwipeableViews onChangeIndex={(index) => changeChosenDay(index)} index={chosenDay}>
            {
              LessonsArrayMobile
            }
          </SwipeableViews>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="main">
        <div className="covering-area"></div>
        <Hours periods={ScheduleProps.periods} />
        <DayNames />
        {
          LessonsArray
        }
      </div>
    )
  }
}