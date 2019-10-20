import React from 'react';
import '../styles/PickerGroups.scss';

interface PickerGroupsProps {
  activeGroups: {
    [key: string]: string
  },

  setActiveGroups: Function,
}
export const PickerGroups: React.FC<PickerGroupsProps> = pickerGroupsProps => {
  const Groups = Object.keys(pickerGroupsProps.activeGroups).map( (group: string) => (
    <div className={pickerGroupsProps.activeGroups[group] ? "active-group group" : "inactive-group group"}
      onClick={() => pickerGroupsProps.setActiveGroups(group)}
    >
      <div className="group-name">
        { group }
      </div>
      <div className="toggle-button">
        <div className="toggle-button__dot">

        </div>
      </div>
    </div>
  ))  
  
  return (
    <div className="picker-groups">
      { Groups }
    </div>
  )
}