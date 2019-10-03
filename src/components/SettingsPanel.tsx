import React, { useState, useEffect } from 'react';
import '../styles/SettingsPanel.css';

export const SettingsPanel: React.FC = () => {
  return (
    <form className="settings-panel">
      <label className="label-for-main-search" htmlFor="searchingObject">plan</label>
      <div className="search-filters">
        <input type="text" className="main-search search"name="searchingObject"/>
        <button className="classes-search search">Oddziały (klasy)</button>
        <button className="teachers-search search">Nauczyciele</button>
        <button className="room-search search">Sale szkolne</button>
      </div>
    </form>
  )
}
