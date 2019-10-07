import React from 'react';
import '../styles/Schedule.scss';
import { Hours } from './Hours';
import { DayNames } from './DayNames';
import { ScheduleWireframe } from './ScheduleWireframe';
import { useMediaQuery } from 'react-responsive';


export const Schedule: React.FC <{class: object}> = props => {
  const isMobile = useMediaQuery({
    query: '(max-width: 900px)'
  })
  return (
    <div className={`${isMobile? "mobile-" : ""}main`}>
      {!isMobile? (
        <>
          <div className="covering-area"></div>
          <Hours />
          <DayNames />
        </>
      ) : null}
      <ScheduleWireframe class={props.class} />
    </div>
  )
}
