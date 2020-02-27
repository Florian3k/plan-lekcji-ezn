import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import SwipeableViews from 'react-swipeable-views';
import * as R from 'ramda';

import { DayNames } from './DayNames';
import { Hours } from './Hours';
import { Period } from '../types';
import '../styles/Schedule.scss';
import { Lesson } from './Lesson';
import { EmptyLesson } from './EmptyLesson';
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
    R.sort<PopulatedLesson>((a, b) => a.days.indexOf('1') - b.days.indexOf('1')),
    R.groupBy<PopulatedLesson>(R.prop('days')),
    R.values,
    R.map(R.groupBy(R.prop('period'))),
    R.map(R.values),
  )(ScheduleProps.lessons)

  // Create array filled with Lesson components
  const LessonsArray: JSX.Element[][] | null[] = [[],[],[],[],[]]
  
  classesAtSameTimeArr.map((day: any, i: number) => {
    const currentDayIndex = day[0][0].days.split("").indexOf("1")

      const dayJSX = day.map((lessonsAtSameTime: any, index: number) => {
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
      LessonsArray[currentDayIndex].push(dayJSX)
    }
  )
  const lessonsAmount: number = classesAtSameTimeArr.reduce((p: any, c: any) => c.length + p, 0)
  const EmptyLessonsArray: JSX.Element[][] = []

  // fill LessonsArray with empty Lesson components
  for (let i = 0; i < overallLessonBlocksNumber - lessonsAmount; i++) {
    EmptyLessonsArray.push([<EmptyLesson />])
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
        <div className="left-panel-filler panel-filler"></div>        
        <div className="covering-area"></div>
        <Hours periods={ScheduleProps.periods} />
        <DayNames />
        {
          [...LessonsArray, ...EmptyLessonsArray]
        }
        <div className="right-panel-filler panel-filler"></div>
      </div>
    )
  }
}