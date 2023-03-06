import { fromEvent, throttleTime, scan } from 'rxjs';
import { v4 } from 'uuid';

const note = document.getElementById("note")
const btn = document.getElementById("button")
const lists = document.getElementById("lists")

const addNote = fromEvent(btn, "click")
  .pipe(
    throttleTime(1000),
    scan((notes) => [...notes, note.value], [note.value])
  )

const subscription = addNote.subscribe((notes) => {
  if (note.value) {
    const li = document.createElement("li");
    li.innerText = notes[notes.length - 1];
    li.setAttribute("id", v4())
    lists.appendChild(li)
    return li;
  }
  subscription?.unsubscribe();
})

import { of, map } from 'rxjs';

of(1, 2, 3)
  .pipe(map((x) => x * x))
  .subscribe((v) => console.log(`value: ${v}`));