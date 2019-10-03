import React, { useState, useEffect } from 'react';
import '../styles/Schedule.css';
import { Hours } from './Hours';
import { DayNames } from './DayNames';
import { ScheduleWireframe } from './ScheduleWireframe';

interface ClassProps {
  class: object
}

export const Schedule: React.FC<ClassProps> = props => {
  return (
    <main>
      <div className="covering-area"></div>
      <Hours />
      <DayNames />
      <ScheduleWireframe class={props.class}/>
    </main>
  )
}
