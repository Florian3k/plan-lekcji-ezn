import React from 'react';
import "../styles/PickerMenu.scss";
import * as R from 'ramda';

interface PickerMenuProps {
  type: 'teacher' | 'class' | 'classroom' | '',
  handleTargetClick: Function,
  data: {
    short: string,
    name: string
  }[]
}
export const PickerMenu: React.FC<PickerMenuProps> = (props) => {
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
        const classesByGrade: any = R.pipe(
          R.groupBy(({ name }) => {
            if (name.length === 3) return name[0]
            return name[0] + name[3]
          }),
          Object.entries,
          R.sort(([a], [b]) => {
            if (a.length === 2 && b.length === 2 && a[0] === b[0]) {
              return b[1].charCodeAt(0) - a[1].charCodeAt(0)
            }
            // @ts-ignore
            return a[0] - b[0]
          }),
          R.map(x => x[1]),
          R.map(R.sortBy(R.prop('name'))),
        )(props.data as any)


        return classesByGrade.map((grade: []) => (
          <div className="grade">
            {grade.map((classData: { name: string }) => (
              <div className="class" onClick={() => props.handleTargetClick(classData.name, 'class')}>
                {classData.name}
              </div>)
            )}
          </div>
        ))

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
      case '':
        return (
          null
        );
      default:
        throw new Error("Unknown type =/= 'teacher' | 'class' | 'classroom' | ''");
    }
  }
  return (
    <div className="picker-menu">
      { Menu() }
    </div>
  )
}
