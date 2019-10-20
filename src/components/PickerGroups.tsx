import React from 'react';
import '../styles/PickerGroups.scss';

interface PickerGroupsProps {
  groups: string[],

  setActiveGroups: Function,
}
export const PickerGroups: React.FC<PickerGroupsProps> = pickerGroupsProps => {
  const Groups = pickerGroupsProps.groups.map( (group: string) => (
    <div className="group"
      onClick={() => pickerGroupsProps.setActiveGroups(group)}
    >
      { group }
    </div>
  ))  
  
  return (
    <div className="picker-groups">
      { Groups }
    </div>
  )
}