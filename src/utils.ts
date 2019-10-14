import { Timetable } from "./types";
import * as R from 'ramda';

const byId = (id: string) => R.propEq('id', id);

const maybeGetProp = <T extends Object>(obj: T | undefined | null, prop: keyof T) => obj ? obj[prop] : null;

export function getClassTimetable(timetable: Timetable, selectedClass: string) {
  const clazz = timetable.classes.find(({ name }) => name === selectedClass)

  const lessons = clazz && timetable.lessons
    .filter(l => l.classids.split(',').includes(clazz.id))
    .map(l => ({
      ...l,
      subject: maybeGetProp(timetable.subjects.find(byId(l.subjectid)), 'name'),
      week: timetable.weeksdefs.find(byId(l.weeksdefid)),
      day: timetable.daysdefs.find(byId(l.daysdefid)),
      teacher: maybeGetProp(timetable.teachers.find(byId(l.teacherids)), 'name'),
      group: maybeGetProp(timetable.groups.find(byId(l.groupids)), 'name'),
      // period: timetable.periods.find(byId())
    }))

  const lessonsIds = clazz && new Set(lessons!.map(x => x.id))

  return lessons && timetable.cards
    .filter(c => lessonsIds!.has(c.lessonid))
    .map(c => ({
      ...c,
      classroom: maybeGetProp(timetable.classrooms.find(byId(c.classroomids)), 'name'),
      lesson: lessons.find(l => l.id === c.lessonid),
    })).map(c => ({
      ...R.pick(['period', 'weeks', 'days', 'classroom'], c),
      ...R.pick(['teacher', 'subject', 'group'], c.lesson),
    })).sort((a, b) => (a.period as any) - (b.period as any))

}

export function getTeacherTimetable(timetable: Timetable, selectedTeacher: string) {
  const teacher = timetable.teachers.find(({ name }) => name === selectedTeacher)

  const lessons = teacher && timetable.lessons
    .filter(l => l.teacherids === teacher.id)
    .map(l => {
      const subject = timetable.subjects.find(byId(l.subjectid));
      return ({
        ...l,
        clazz: timetable.classes.find(byId(l.classids)),
        subject: subject && subject.name,
        subject_short: subject && subject.short,
        week: timetable.weeksdefs.find(byId(l.weeksdefid)),
        day: timetable.daysdefs.find(byId(l.daysdefid)),
        teacher: maybeGetProp(timetable.teachers.find(byId(l.teacherids)), 'name'),
        group: maybeGetProp(timetable.groups.find(byId(l.groupids)), 'name'),
        // period: timetable.periods.find(byId())
      })
    })

  const lessonsIds = teacher && new Set(lessons!.map(x => x.id))

  return lessons && timetable.cards
    .filter(c => lessonsIds!.has(c.lessonid))
    .map(c => ({
      ...c,
      classroom: maybeGetProp(timetable.classrooms.find(byId(c.classroomids)), 'name'),
      lesson: lessons.find(l => l.id === c.lessonid),
    })).map(c => ({
      ...R.pick(['period', 'weeks', 'days', 'classroom'], c),
      ...R.pick(['teacher', 'subject', 'group', 'clazz'], c.lesson),
    })).sort((a, b) => (a.period as any) - (b.period as any))

}

export function getClassroomTimetable(timetable: Timetable, selectedClassroom: string) {
  const classroom = timetable.classrooms.find(({ name }) => name === selectedClassroom)

  const lessons = classroom && timetable.lessons
    .filter(l => l.classroomids.split(',').includes(classroom.id))
    .map(l => ({
      ...l,
      clazz: timetable.classes.find(byId(l.classids)),
      subject: maybeGetProp(timetable.subjects.find(byId(l.subjectid)), 'name'),
      week: timetable.weeksdefs.find(byId(l.weeksdefid)),
      day: timetable.daysdefs.find(byId(l.daysdefid)),
      teacher: maybeGetProp(timetable.teachers.find(byId(l.teacherids)), 'name'),
      group: maybeGetProp(timetable.groups.find(byId(l.groupids)), 'name'),
      // period: timetable.periods.find(byId())
    }))

  const lessonsIds = classroom && new Set(lessons!.map(x => x.id))

  return lessons && timetable.cards
    .filter(c => lessonsIds!.has(c.lessonid))
    .map(c => ({
      ...c,
      classroom: maybeGetProp(timetable.classrooms.find(byId(c.classroomids)), 'name'),
      lesson: lessons.find(l => l.id === c.lessonid),
    })).map(c => ({
      ...R.pick(['period', 'weeks', 'days', 'classroom'], c),
      ...R.pick(['teacher', 'subject', 'group'], c.lesson),
    })).sort((a, b) => (a.period as any) - (b.period as any))
}