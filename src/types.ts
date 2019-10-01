export interface Period {
  name: string;
  short: string;
  period: string;
  starttime: string;
  endtime: string;
}

export interface Daysdef {
  id: string;
  name: string;
  short: string;
  days: string;
}

export interface Weeksdef {
  id: string;
  name: string;
  short: string;
  weeks: string;
}

export interface Subject {
  id: string;
  name: string;
  short: string;
  partner_id: string;
}

export interface Teacher {
  id: string;
  firstname: string;
  lastname: string;
  name: string;
  short: string;
  gender: string;
  color: string;
  email: string;
  mobile: string;
  partner_id: string;
}

export interface Building {
  id: string;
  name: string;
  partner_id: string;
}

export interface Classroom {
  id: string;
  name: string;
  short: string;
  capacity: string;
  buildingid: string;
  partner_id: string;
}

export interface Grade {
  name: string;
  short: string;
  grade: string;
}

export interface Class {
  id: string;
  name: string;
  short: string;
  teacherid: string;
  classroomids: string;
  grade: string;
  partner_id: string;
}

export interface Group {
  id: string;
  name: string;
  classid: string;
  studentids: string;
  entireclass: string;
  divisiontag: string;
  studentcount: string;
}

export interface Lesson {
  id: string;
  classids: string;
  subjectid: string;
  periodspercard: string;
  periodsperweek: string;
  teacherids: string;
  classroomids: string;
  groupids: string;
  capacity: string;
  seminargroup: string;
  termsdefid: string;
  weeksdefid: string;
  daysdefid: string;
  partner_id: string;
}

export interface Card {
  lessonid: string;
  classroomids: string;
  period: string;
  weeks: string;
  terms: string;
  days: string;
}

export interface Timetable {
  periods: Period[];
  daysdefs: Daysdef[];
  weeksdefs: Weeksdef[];
  subjects: Subject[];
  teachers: Teacher[];
  buildings: Building[];
  classrooms: Classroom[];
  grades: Grade[];
  classes: Class[];
  groups: Group[];
  lessons: Lesson[];
  cards: Card[];
}
