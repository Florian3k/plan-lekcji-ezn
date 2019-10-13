import React from 'react';
import "../styles/PickerMenu.scss";

interface PickerMenuProps {
  type: 'teacher' | 'class' | 'classroom',
  handleTargetClick: Function,
  class?: {
    short: string,
    name: string
  }[],
  teacher?: {
    short: string,
  }[]
}
export const PickerMenu: React.FC< any > = (props) => {
  const Menu = () => {
    switch(props.type) {
      case 'teacher':
        return (
          <div className="teacher-list">
            {
              props.data.map((teacher: {short: string, name: string}) => (
                <div
                  className="teacher"
                  onClick={() => props.handleTargetClick(teacher.name, 'teacher')}>
                  <span className="teacher-short">
                    { teacher.short }
                  </span>
                  <span className="teacher-name">
                    { teacher.name }
                  </span>
                </div>
              ))
            }
          </div>
        );
      case 'class':
        const classes = props.data.map((classData: { short: string, name: string }) => {
          const index: number = +classData.short[0] - 1;          
          return (
            <div 
              className = {`class col-${index}`}
              onClick={() => props.handleTargetClick(classData.name, 'class')}
            >              
              { classData.name }
            </div>
          )
        })
        // add all 5 grades
        return (
          <div className="class-list">
            { classes }
          </div>
        );
      case 'classroom':
        return (
          <div className="classroom-list">

          </div>
        );
      default:
        throw new Error("Unknown type =/= 'teacher' | 'class' | 'classroom'");
    }
  }
  return (
    <div className="picker-menu">
      { Menu() }
    </div>
  )
}
