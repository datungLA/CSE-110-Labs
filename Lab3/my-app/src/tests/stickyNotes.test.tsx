import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "../StickyNotes";
import '@testing-library/jest-dom';

describe("StickyNotes Component", () => {
    test("renders create note form", () => {
        render(<StickyNotes />);

        const createNoteButton = screen.getByText("Create Note");
        expect(createNoteButton).toBeInTheDocument();
    });

    test("creates a new note", () => {
        render(<StickyNotes />);

        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "Note content" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText("New Note");
        const newNoteContent = screen.getByText("Note content");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
    });

    // Read Test
    test("displays all created notes", () => {
        render(<StickyNotes />);

        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        // Create multiple notes
        fireEvent.change(createNoteTitleInput, { target: { value: "Note 1" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "Content 1" } });
        fireEvent.click(createNoteButton);

        fireEvent.change(createNoteTitleInput, { target: { value: "Note 2" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "Content 2" } });
        fireEvent.click(createNoteButton);

        // Check if both notes are displayed
        expect(screen.getByText("Note 1")).toBeInTheDocument();
        expect(screen.getByText("Content 1")).toBeInTheDocument();
        expect(screen.getByText("Note 2")).toBeInTheDocument();
        expect(screen.getByText("Content 2")).toBeInTheDocument();
    });

    // Update Test
    test("updates a note", () => {
        render(<StickyNotes />);
    
        const editIcons = screen.getAllByLabelText("Edit Note");
    
        // Click the edit icon to enable edit mode for the first note
        fireEvent.click(editIcons[0]);
    
        // Update the note's title and content
        const titleInputs = screen.getByTestId("note-title-1")
        const contentTextareas = screen.getByTestId("note-content-1");
    
        // Use the index to target the correct input fields
        fireEvent.change(titleInputs, { target: { value: "Updated Note Title" } });
        fireEvent.change(contentTextareas, { target: { value: "Updated Note Content" } });
    
        // Save the changes
        const saveButton = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveButton);
    
        // Verify that the updated title and content are displayed
        expect(screen.getByTestId("note-title-1")).toHaveTextContent("Updated Note Title");
        expect(screen.getByTestId("note-content-1")).toHaveTextContent("Updated Note Content");
    });        

    // Delete Test
    test("deletes a note", () => {
        render(<StickyNotes />);

        const noteTitle = screen.getByText("Random Thoughts");
        expect(noteTitle).toBeInTheDocument();

        const deleteButton = screen.getByTestId("note-delete-1");

        // Click the delete button
        fireEvent.click(deleteButton);

        // Verify that the note is no longer in the document
        expect(noteTitle).not.toBeInTheDocument();
    });

    // Edge Case Test
    test("does not create a note when title or content is empty", () => {
        render(<StickyNotes />);

        const createNoteButton = screen.getByText("Create Note");
        fireEvent.click(createNoteButton);

        expect(screen.queryAllByTestId("note")).toHaveLength(0);
    });
});
