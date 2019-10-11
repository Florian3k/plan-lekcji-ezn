const fs = require('fs')
const xml2json = require('xml2json')

const xml = fs.readFileSync('planEZN.xml')

const json = xml2json.toJson(xml)

const timetable = JSON.parse(json).timetable

const data = {}

const tables = [
  { singular: 'period',    plural: 'periods' },
  { singular: 'daysdef',   plural: 'daysdefs' },
  { singular: 'weeksdef',  plural: 'weeksdefs' },
  { singular: 'termsdef',  plural: 'termsdefs' },
  { singular: 'subject',   plural: 'subjects' },
  { singular: 'teacher',   plural: 'teachers' },
  { singular: 'building',  plural: 'buildings' },
  { singular: 'classroom', plural: 'classrooms' },
  { singular: 'grade',     plural: 'grades' },
  { singular: 'class',     plural: 'classes' },
  { singular: 'group',     plural: 'groups' },
  { singular: 'lesson',    plural: 'lessons' },
  { singular: 'card',      plural: 'cards' },
]

for (const { singular, plural } of tables) {
  data[plural] = timetable[plural][singular]
}

fs.writeFileSync('public/data.json', JSON.stringify(data, null, 2))

