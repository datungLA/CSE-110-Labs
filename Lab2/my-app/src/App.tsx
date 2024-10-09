import './App.css';
import { dummyNoteList } from './component/constant';
import { FavoriteButton, FavoriteList } from './component/hooksExercise';
import { useState, useEffect } from 'react';
import { Note } from './component/types';
function App() {
  const [notes, setNotes] = useState<Note[]>(dummyNoteList.map(note => ({ ...note, liked: false })));
  const toggleFavorite = (id: number) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, liked: !note.liked } : note
    );
    setNotes(updatedNotes);
  };
  return (
    <div className='app-container'>
      <form className="note-form">
        <div><input placeholder="Note Title"></input></div>
        <div><textarea></textarea></div>
        <div><button type="submit">Create Note</button></div>
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-item">
            <div className="notes-header">
              <FavoriteButton note={note} toggleFavorite={toggleFavorite} />
              <button>x</button>
            </div>
            <h2> {note.title} </h2>
            <p> {note.content} </p>
            <p> {note.label} </p>
          </div>
        ))}
      </div>
      <FavoriteList notes={notes} />
    </div>
  );
}

export default App;
