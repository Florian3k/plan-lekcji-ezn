import React from 'react';
import "../styles/PickerMenu.scss";

interface PickerMenuProps {
  type: 'teachers' | 'classes' | 'classrooms',
  classes?: {
    short: string,
    name: string
  }[]
  teachers?: {
    short: string,
  }[]
}
export const PickerMenu: React.FC< any > = (props) => {
  const Menu = () => {
    switch(props.type) {
      case 'teachers':
        return (
          <div className="teacher-list">
            {
              props.teachers.map((teacher: {short: string}) => (
                <div className="teacher">
                  { teacher.short }
                </div>
              ))
            }
          </div>
        );
      case 'classes':
        const classes = props.classes.map((classData: { short: string, name: string }) => {
          const index: number = +classData.short[0] - 1;          
          return (
            <div className = {`class col-${index}`}>
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
      case 'classrooms':
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
