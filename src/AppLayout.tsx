import React, { useState, useEffect } from 'react';
import { SettingsPanel } from './components/SettingsPanel';
import './styles/App.css';

export const App: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/fakedata.json')
      .then(res => res.json())
      .then( returned  => {
        setData({ ...returned})
      })
  }, []);

  return (
    <div className="App">
      <SettingsPanel />
    </div>
  );
}
