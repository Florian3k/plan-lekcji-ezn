import React from 'react';
import '../styles/DayNames.css';

export const DayNames: React.FC = () => {
  return (
    <div className="day-names">
      <div className="day">Poniedziałek</div>
      <div className="day">Wtorek</div>
      <div className="day">Środa</div>
      <div className="day">Czwartek</div>
      <div className="day">Piątek</div>
    </div>
  )
}
