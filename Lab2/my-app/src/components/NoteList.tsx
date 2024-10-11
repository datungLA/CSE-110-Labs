import React from 'react'
import { Note } from "./types"
import "./styles.css"
import SingleNote from './SingleNote'
type Props = {
    notes: Note[]
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}
const NoteList = ({ notes, setNotes }: Props) => {
    return (
        <>
            <div className="notes">
                <div className="notes-grid">
                    {
                        notes.map((note) => (
                            <SingleNote note={note} key={note.id} notes={notes} setNotes={setNotes} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default NoteList
