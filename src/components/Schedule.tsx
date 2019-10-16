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

export const Schedule: React.FC <ScheduleProps> = ScheduleProps => {
  const isMobile = useMediaQuery({query: '(max-width: 900px)'})

  return (
    <div className={isMobile? 'mobile-main' : 'main'}>
      {
        !isMobile ?
        <>
          <div className="covering-area"></div>
          <Hours periods={ScheduleProps.periods}/>
          <DayNames />
        </>
        : null
        }
      <ScheduleWireframe 
        class       = {ScheduleProps.clazz}
        periods     = {ScheduleProps.periods}
        selectedType= {ScheduleProps.selectedType}/>
    </div>
  )
}
