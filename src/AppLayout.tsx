import React, { useState, useEffect } from 'react';
import { SettingsPanel } from './components/SettingsPanel';
import './styles/App.css';
import { Schedule } from './components/Schedule';

export const App: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/fakedata.json')
      .then(res => res.json())
      .then( returned  => {
        setData(returned)
      })
  }, []);
  return (
    <div className="App">
      <SettingsPanel />
      <Schedule class={data}/>
    </div>
  );
}
