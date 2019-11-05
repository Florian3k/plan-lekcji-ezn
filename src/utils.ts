import { Timetable, TimetableMap, Classroom, Lesson, Class, Group, Teacher, Subject } from "./types";
import * as R from 'ramda';

const byId = (id: string) => R.propEq('id', id);

const maybeGetProp = <T extends Object>(obj: T | undefined | null, prop: keyof T) => obj ? obj[prop] : null;

interface PopulatedLesson {
  classrooms: Classroom[];
  lesson: Lesson;
  subject: Subject,
  classes: Class[];
  groups: Group[];
  teacher: Teacher;
  period: string;
  weeks: string;
  terms: string;
  days: string;
}

export function denormalizeData(timetable: TimetableMap): PopulatedLesson[] {
  return timetable.cards.map(({ classroomids, lessonid, ...card }) => {
    const lesson = timetable.lessons.get(lessonid)!
    return {
      ...card,
      classrooms: classroomids.split(',').map(classroomid => timetable.classrooms.get(classroomid)!),
      lesson,
      subject: timetable.subjects.get(lesson.subjectid)!,
      classes: lesson.classids.split(',').map(lessonid => timetable.classes.get(lessonid)!),
      groups: lesson.groupids.split(',').map(groupid => timetable.groups.get(groupid)!),
      teacher: timetable.teachers.get(lesson.teacherids)!,
    }
  })
}

export function getClassTimetable(timetable: Timetable, selectedClass: string) {
  const clazz = timetable.classes.find(({ name }) => name === selectedClass)

  const lessons = clazz && timetable.lessons
    .filter(l => l.classids.split(',').includes(clazz.id))
    .map(l => {
      const subject = timetable.subjects.find(byId(l.subjectid));
      
      return ({
        ...l,
        subject: subject && subject.name,
        subject_short: subject && subject.short,
        week: timetable.weeksdefs.find(byId(l.weeksdefid)),
        day: timetable.daysdefs.find(byId(l.daysdefid)),
        teacher: maybeGetProp(timetable.teachers.find(byId(l.teacherids)), 'name'),
        group: maybeGetProp(timetable.groups.find(grp => l.groupids.split(',').includes(grp.id) && grp.classid === clazz.id), 'name'),
        // period: timetable.periods.find(byId())
      })
    })
  const lessonsIds = clazz && new Set(lessons!.map(x => x.id))

  return lessons && timetable.cards
    .filter(c => lessonsIds!.has(c.lessonid))
    .map(c => ({
      ...c,
      classroom: maybeGetProp(timetable.classrooms.find(byId(c.classroomids)), 'name'),
      lesson: lessons.find(l => l.id === c.lessonid),
    })).map(c => ({
      ...R.pick(['period', 'weeks', 'days', 'classroom'], c),
      ...R.pick(['teacher', 'subject', 'subject_short', 'group', 'groupids'], c.lesson),
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
      ...R.pick(['teacher', 'subject', 'subject_short', 'group', 'clazz'], c.lesson),
    })).sort((a, b) => (a.period as any) - (b.period as any))

}

export function getClassroomTimetable(timetable: Timetable, selectedClassroom: string) {
  const classroom = timetable.classrooms.find(({ name }) => name === selectedClassroom)

  return classroom && timetable.cards
    .filter(c => c.classroomids === classroom.id)
    .map(c => {
      const lesson = timetable.lessons.find(l => l.id === c.lessonid)!
      const subject = timetable.subjects.find(byId(lesson.subjectid));
      return ({
        ...c,
        classids: lesson.classids,
        subject: subject && subject.name,
        subject_short: subject && subject.short,
        teacher: maybeGetProp(timetable.teachers.find(byId(lesson.teacherids)), 'name'),
        group: maybeGetProp(timetable.groups.find(byId(lesson.groupids)), 'name'),
      })
    }).map(c => {
      return ({
        ...R.pick(['period', 'weeks', 'days', 'teacher', 'subject', 'subject_short', 'group'], c),
        clazz: timetable.classes.filter(clazz => c.classids.split(',').includes(clazz.id)),
        classroom: selectedClassroom,
      })
    }).sort((a, b) => (a.period as any) - (b.period as any))
}