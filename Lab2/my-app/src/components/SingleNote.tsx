import React from 'react'
import { Note } from './types'

type Props = {
    note: Note
    notes: Note[]
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}
const SingleNote = ({ note, notes, setNotes }: Props) => {
    return (
        <div key={note.id} className='note-item'>
            <div className="notes-header">
                <span>
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
