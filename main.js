import { fromEvent, throttleTime, scan, tap, toArray, map, filter } from 'rxjs';
import { v4 } from 'uuid';

const note = document.getElementById("note")
const btn = document.getElementById("button")
const lists = document.getElementById("lists")


const addNote = fromEvent(btn, "click")
  .pipe(
    throttleTime(1000),
    scan((notes) => [...notes, note.value], []),
    map(arr => arr.sort((a, b) => a.charAt(0).localeCompare(b.charAt(0))))
  )

const subscription = addNote.subscribe((notes) => {
  console.log(notes, "NOTES")
  if (note.value) {
    const li = document.createElement("li");
    li.innerText = notes[notes.length - 1];
    li.setAttribute("id", v4())
    lists.appendChild(li)
    return lists;
  }
  subscription?.unsubscribe();
})
