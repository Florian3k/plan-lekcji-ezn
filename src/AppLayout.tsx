import React, { useState, useEffect } from 'react';
import { SettingsPanel } from './components/SettingsPanel';
import './styles/App.css';
import { Schedule } from './components/Schedule';
import { useMediaQuery } from 'react-responsive';

export const App: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })

  useEffect(() => {
    fetch('/fakedata.json')
      .then(res => res.json())
      .then( returned  => {
        setData(returned)
      })
  }, []);
  return ( 
    <div className={`${isDesktopOrLaptop ? "App": "App-mobile"}`}>
      <SettingsPanel />
      <Schedule class={data} />
    </div>
  )   
}
