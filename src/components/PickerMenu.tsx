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
  }[],
  filterGroup?: Function
}

export const PickerMenu: React.FC<PickerMenuProps> = pickerMenuProps => {
  const Menu = () => {

    switch(pickerMenuProps.type) {
      case 'teacher':
        return (
          <div className="teacher-list">
            {
              pickerMenuProps.data.map((teacher: {short: string, name: string}) => (
                <div
                  className={"teacher" + (pickerMenuProps.targetSchedule === teacher.name ? ' current-target' : '')}
                  onClick={() => pickerMenuProps.handleTargetClick(teacher.name, 'teacher')}>
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
        )(pickerMenuProps.data as any)


        return classesByGrade.map((grade: []) => (
          <div className="grade">
            {grade.map((classData: { name: string }) => (
              <div className={"class" + (pickerMenuProps.targetSchedule === classData.name? ' current-target' : '')}
              onClick={() => pickerMenuProps.handleTargetClick(classData.name, 'class')}>
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
          ))(pickerMenuProps.data as any)
        return (
          <div className="classroom-list">
            { pickerMenuProps.data.map((classData: any) => (
              <div className={"classroom" + (pickerMenuProps.targetSchedule === classData.name ? ' current-target' : '')}
              onClick={() => pickerMenuProps.handleTargetClick(classData.name, 'classroom')}>
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
        throw new Error(`Unknown type ${pickerMenuProps.type} =/= 'teacher' | 'class' | 'classroom' | ''`);
    }
  }
  return (
    <div className="picker-menu">
      { Menu() }
    </div>
  )
}
