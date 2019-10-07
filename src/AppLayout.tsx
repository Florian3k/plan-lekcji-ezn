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
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  const isMobile = useMediaQuery({query: '(max-width: 900px)'})

  // const [selectedType, setSelectedType] = useState<'class' | 'teacher' | 'classroom'>('class')
  const [selected, setSelected] = useState('4 H')
  



  
  useEffect(() => {
    fetch('/fakedata.json')
      .then(res => res.json())
      .then( returned  => {
        setData(returned)
      })
  }, []);

  if (!timetable) {
    return <div>Loading...</div>
  }
  const cards = getClassTimetable(timetable, selected)

  return ( 
    <div className={`${isDesktopOrLaptop ? "App": isMobile? "App-mobile" : "App-medium"}`}>
      <SettingsPanel classes = {timetable.classes}/>
      <Schedule class={R.groupBy((l) => l.days, cards!)} />
    </div>
  )   
}
