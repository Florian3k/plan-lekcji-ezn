import React, { useState, useEffect } from 'react';
import "../styles/Hours.css";

export const Hours: React.FC = () => {
  const hoursArr: { starts: string; ends: string } [] = [];
  for(let i=0; i<14; i++) {
    hoursArr.push(
      {
        starts: `${i+7}:15`,
        ends: `${i+8}:15`
      }
    );
  }
  const listItems = hoursArr.map((item, index) => (
    <li className="hours-field-item">
      <div className="lesson-number">{index}</div>
      <div className="lesson-length">
          <div className="lesson-starts">
            {item.starts}
          </div>
          <div className="lesson-ends">
            {item.ends}
          </div>
      </div>
    </li>
  ))
  return (
    <ul className="hours-field">
      {listItems}
    </ul>
  )
}
