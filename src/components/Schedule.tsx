import React from 'react';
import '../styles/Schedule.scss';
import { Hours } from './Hours';
import { DayNames } from './DayNames';
import { ScheduleWireframe } from './ScheduleWireframe';
import { useMediaQuery } from 'react-responsive';
import { Period, Lesson } from '../types';

interface ScheduleProps {
  periods: any,
  clazz: any
}
export const Schedule: React.FC <ScheduleProps> = props => {
  const isMobile = useMediaQuery({
    query: '(max-width: 900px)'
  })
  return (
    <div className={`${isMobile? "mobile-" : ""}main`}>
      {!isMobile? (
        <>
          <div className="covering-area"></div>
          <Hours periods={props.periods}/>
          <DayNames />
        </>
      ) : null}
      <ScheduleWireframe class={props.clazz} />
    </div>
  )
}
