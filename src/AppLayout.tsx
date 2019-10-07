import React, { useState, useEffect } from 'react';
import { SettingsPanel } from './components/SettingsPanel';
import { getClassTimetable } from './utils';
import { useTimetable } from './hooks/useTimetable';
import * as R from 'ramda';
import { Schedule } from './components/Schedule';
import { useMediaQuery } from 'react-responsive';
import './styles/App.css';

export const App: React.FC<any> = (props) => {
  const [data, setData] = useState<any>(null);
  const timetable = useTimetable()

  // const [selectedType, setSelectedType] = useState<'class' | 'teacher' | 'classroom'>('class')
  const [selected, setSelected] = useState('4 H')

  if (!timetable) {
    return <div>Loading...</div>
  }

  const cards = getClassTimetable(timetable, selected)

  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  const isMobile = useMediaQuery({query: '(max-width: 900px)'})
  
  useEffect(() => {
    fetch('/fakedata.json')
      .then(res => res.json())
      .then( returned  => {
        setData(returned)
      })
  }, []);
  return ( 
    <div className={`${isDesktopOrLaptop ? "App": isMobile? "App-mobile" : "App-medium"}`}>
      <SettingsPanel classes = {}/>
      <Schedule class={props.clazz} />
    </div>
  )   
}
