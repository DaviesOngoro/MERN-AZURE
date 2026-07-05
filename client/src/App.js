import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  const API = "";

  const loadNotes = async () => {
    try {
      const res = await axios.get(`${API}/notes`);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const addNote = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(`${API}/notes`, { text });
      setText("");
      loadNotes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>Simple MERN Notes App</h1>

      <input
        type="text"
        placeholder="Enter a note"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addNote}>Add Note</button>

      <ul>
        {notes.map((note) => (
          <li key={note._id}>{note.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;