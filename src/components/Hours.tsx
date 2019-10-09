import React from 'react';
import "../styles/Hours.scss";
import { Period } from '../types';


export const Hours: React.FC<{periods: Period[]}> = (props) => {
  
  const listHoursData = props.periods.map((period) => (
    <li className={`hours-field-item hours-field-item--${period.period}`}>
      <div className="lesson-number">{period.period}</div>
      <div className="lesson-length">
          <div className="lesson-starts">
            {period.starttime}
          </div>
          <div className="lesson-ends">
            {period.endtime}
          </div>
      </div>
    </li>
  ))
  return (
    <ul className="hours-field">
      { listHoursData }
    </ul>
  )
}
