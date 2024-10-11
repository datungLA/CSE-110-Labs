import React from 'react'
import { Note } from './types'

type Props = {
    note: Note
    notes: Note[]
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}
const SingleNote = ({ note, notes, setNotes }: Props) => {
    const handleFavorite = (id: number) => () => {
        setNotes(notes.map(note => note.id == id ? { ...note, isLiked: !note.isLiked } : note))
    }
    const handleDelete = (id: number) => () => {
        setNotes(notes.filter(note => note.id !== id))
    }
    return (
        <div key={note.id} className='note-item'>
            <div className="notes-header">
                <span onClick={handleFavorite(note.id)}>
                    {note.isLiked ? '❤️' : '♡'}
                </span>
                <span onClick={handleDelete(note.id)}>
                    <button>x</button>
                </span>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{note.label}</p>
        </div>
    )
}

export default SingleNote
