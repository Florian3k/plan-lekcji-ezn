import React, { useState, useEffect } from 'react';
import '../styles/Schedule.css';
import { Hours } from './Hours';
import { DayNames } from './DayNames';

export const Schedule: React.FC = () => {
  return (
    <main>
      <Hours />
      <DayNames />
    </main>
  )
}
