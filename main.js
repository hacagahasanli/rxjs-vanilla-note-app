import { fromEvent, throttleTime, scan, filter, of } from 'rxjs';
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
      console.log(notes, "NOTES")
      const arrayofNotes = [...notes, note.value]
      const sortedArray = arrayofNotes.sort((a, b) => a.charAt(0).localeCompare(b.charAt(0)))
      return sortedArray
    }, [])
  )


clicks.pipe(
  filter(e => e.target.tagName === "LI"),
).subscribe((li) => {
  li.target.remove()
})

const subscription = addNote.subscribe((notes) => {
  while (lists.firstChild) lists.removeChild(lists.firstChild);
  notes.map((note) => lists.appendChild(createList(note)))
  note.value = ""

  /*
    where mapping notes 
    so we did not unsubsribe elements
  */

})


const sumObserver = {
  sum: 0,
  next(value) {
    console.log('Adding: ' + value);
    this.sum = this.sum + value;
  },
  error() {
    // We actually could just remove this method,
    // since we do not really care about errors right now.
  },
  complete() {
    console.log('Sum equals: ' + this.sum);
  }
};

of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
  .subscribe(sumObserver);