import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Hours } from './Hours';
import { DayNames } from './DayNames';
import { ScheduleWireframe } from './ScheduleWireframe';
import { Period, Lesson } from '../types';
import '../styles/Schedule.scss';

interface ScheduleProps {
  periods: Period[],
  selectedType: 'class' | 'classroom' | 'teacher',
  clazz: {
    [index: string]: Lesson[] | any[]
  }
}
export const Schedule: React.FC <ScheduleProps> = props => {
  const isMobile = useMediaQuery({
    query: '(max-width: 900px)'
  })
  return (
    <div className={`${isMobile? "mobile-" : ""}main`}>
      {!isMobile ? (
        <>
          <div className="covering-area"></div>
          <Hours periods={props.periods}/>
          <DayNames />
        </>
      ) : null}
      <ScheduleWireframe 
        class={props.clazz}
        periods={props.periods}
        selectedType={props.selectedType}
        />
    </div>
  )
}
