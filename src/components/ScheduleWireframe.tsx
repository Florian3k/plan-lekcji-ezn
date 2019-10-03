import React, { useState, useEffect } from 'react';
import '../styles/ScheduleWireframe.css';

interface ClassProps {
  class: object
}

export const ScheduleWireframe: React.FC<ClassProps> = props => {
  console.log(props.class)
  return (
    <div className="schedule-wireframe">
      
    </div>
  )
}
