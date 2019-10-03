import React, { useState, useEffect } from 'react';
import '../styles/Schedule.css';
import { Hours } from './Hours';
import { DayNames } from './DayNames';
import { ScheduleWireframe } from './ScheduleWireframe';

export const Schedule: React.FC = () => {
  return (
    <main>
      <div className="covering-area"></div>
      <Hours />
      <DayNames />
      <ScheduleWireframe />
    </main>
  )
}
