import React from 'react';
import { Period } from '../types';
import "../styles/Hours.scss";


export const Hours: React.FC<{periods: Period[]}> = (props) => {
  
  const listHoursData = props.periods.map((period) => (
    <div className={`hours-field-item hours-field-item--${period.period}`}>
      <div className="lesson-number">{period.period}</div>
      <div className="lesson-length">
          <div className="lesson-starts">
            {period.starttime}
          </div>
          <div className="lesson-ends">
            {period.endtime}
          </div>
      </div>
    </div>
  ))
  return (
    <>
      { listHoursData }
    </>
  )
}
