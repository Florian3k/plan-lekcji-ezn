import React from 'react';
import '../styles/Schedule.css';
import { Hours } from './Hours';
import { DayNames } from './DayNames';
import { ScheduleWireframe } from './ScheduleWireframe';
import { useMediaQuery } from 'react-responsive';

interface ClassProps {
  class: object
}

export const Schedule: React.FC<ClassProps> = props => {
  const isMobile = useMediaQuery({
    query: '(max-width: 900px)'
  })

  if(isMobile){
    return (
      <div className="mobile-main">
        <ScheduleWireframe class={props.class} />
      </div>
    )
  }
  else {
    return (
      <main>
        <div className="covering-area"></div>
        <Hours />
        <DayNames />
        <ScheduleWireframe class={props.class}/>
      </main>
    )
  }
}
