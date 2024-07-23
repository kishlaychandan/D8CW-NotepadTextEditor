import { useState } from "react";
import NoteCard from "./components/NoteCard";
import "./app.css";

import MarkdownEditor from "@uiw/react-markdown-editor";
function App() {
  const [notes, setNotes] = useState([]);
  const [currentEditing, setCurrentEditing] = useState(null);

  const addNote = () => {
    const newNote = {
      title: "#Enter your title",
      desc: "",
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (index) => {
    let newArray = notes.filter((item, ind) => {
      if (ind != index) {
        return item;
      }
    });
    if (newArray.length == 0) {
      setCurrentEditing(null);
    }
    setNotes(newArray);
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div>
        <button onClick={addNote}>Add Note</button>

        {notes.map((item, index) => {
          return (
            <NoteCard
              title={item.title}
              setCurrentEditing={setCurrentEditing}
              index={index}
              deleteNote={deleteNote}
            />
          );
        })}
      </div>
      <div>
        {currentEditing != null ? (
          <MarkdownEditor
            height="200px"
            onChange={(value, viewUpdate) => {
              let newValue = value;
              let localCopy = [...notes];
              localCopy[currentEditing].desc = newValue;
              localCopy[currentEditing].title = newValue.split("\n")[0];
              setNotes(localCopy);
            }}
            value={notes[currentEditing].desc}
          />
        ) : (
          <p>Please click on a specific note to edit</p>
        )}
      </div>
    </div>
  );
}

export default App;
