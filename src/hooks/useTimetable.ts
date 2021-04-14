import { useState, useEffect, useMemo } from 'react';
import { Timetable, TimetableMap } from '../types';

export const useTimetable: () => [Timetable, TimetableMap] | null = () => {
  const [data, setData] = useState<Timetable | null>(null);

  useEffect(() => {
    fetch('/data.json', { cache: 'no-store' })
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

  const map = useMemo<TimetableMap>(() => {
    const map: any = {}
    for (const key in data) {
      // @ts-ignore
      if ('id' in data[key][0]) {
        map[key] = new Map(
          // @ts-ignore
          data[key].map(entry => [entry.id, entry])
        )
      } else {
        // @ts-ignore
        map[key] = data[key]
      }
    }
    return map
  }, [data])

  if (data) {
    console.log(map)
    return [data, map];
  }
  return null
}
