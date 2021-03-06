import React from 'react';
import "../styles/PickerMenu.scss";
import * as R from 'ramda';

interface PickerMenuProps {
  type: 'teacher' | 'class' | 'classroom' | '',
  // handleTargetClick: (name: string, type: 'teacher' | 'class' | 'classroom' | '') => void,
  handleTargetClick: Function,
  targetSchedule: string,
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
                  className={"teacher" + (props.targetSchedule === teacher.name ? ' current-target' : '')}
                  onClick={() => props.handleTargetClick(teacher.name, 'teacher')}>
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
              <div className={"class" + (props.targetSchedule === classData.name? ' current-target' : '')}
              onClick={() => props.handleTargetClick(classData.name, 'class')}>
                {classData.name}
              </div>)
            )}
          </div>
        ))

      case 'classroom':
        const aaa: any = R.pipe(
          R.groupBy(({ name }) => {
            if(name[0] === 2) return name;
            return name.length;
          }
          ))(props.data as any)
        return (
          <div className="classroom-list">
            { props.data.map((classData: any) => (
              <div className={"classroom" + (props.targetSchedule === classData.name ? ' current-target' : '')}
              onClick={() => props.handleTargetClick(classData.name, 'classroom')}>
                {classData.name}
              </div>
            ))}
          </div>
        );

      case '':
        return (
          null
        );
      default:
        throw new Error(`Unknown type ${props.type} =/= 'teacher' | 'class' | 'classroom' | ''`);
    }
  }
  return (
    <div className="picker-menu">
      { Menu() }
    </div>
  )
}
