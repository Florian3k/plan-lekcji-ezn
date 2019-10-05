import React from 'react';
import '../styles/SettingsPanel.scss';
import { useMediaQuery } from 'react-responsive';

export const SettingsPanel: React.FC = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  return (
    <form className={`${isDesktopOrLaptop ? "settings-panel" : "settings-panel-medium"}`}>
      <label className="label-for-main-search" htmlFor="searchingObject">plan</label>
      <div className="search-filters">
        <h1 className="main-search"> 4H</h1>
        <button className="classes-search search">Oddziały (klasy)</button>
        <button className="teachers-search search">Nauczyciele</button>
        <button className="room-search search">Sale szkolne</button>
      </div>
    </form>
  )
}
