import { useState, useEffect } from 'react';
import { Timetable } from '../types';

export const useTimetable: () => Timetable | null = () => {
  const [data, setData] = useState<Timetable | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(({ termsdefs, ...data }) => {
        if (!data) {
          console.log('error when fetching data.json')
          return;
        }
        setData(data)
        // console.log(data)
      })
  }, []);

  return data;
}
