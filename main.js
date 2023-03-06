import { fromEvent, throttleTime, scan, tap, toArray, map, filter, from } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { v4 } from 'uuid';

const note = document.getElementById("note")
const btn = document.getElementById("button")
const lists = document.getElementById("lists")
const clicks = fromEvent(lists, "click")

const createList = (note) => {
  const li = document.createElement("li");
  li.innerText = note;
  li.setAttribute("id", v4())
  return li;
}

const addNote = fromEvent(btn, "click")
  .pipe(
    throttleTime(1000),
    scan((notes) => {
      const arrayofNotes = [...notes, note.value]
      const sortedArray = arrayofNotes.sort((a, b) => a.charAt(0).localeCompare(b.charAt(0)))
      return sortedArray
    }, [])
  )


clicks.pipe(
  filter(e => e.target.tagName === "LI"),
).subscribe((li) => li.target.remove())

const subscription = addNote.subscribe((notes) => {
  while (lists.firstChild) lists.removeChild(lists.firstChild);
  notes.map((note) => lists.appendChild(createList(note)))
  note.value = ""

})
