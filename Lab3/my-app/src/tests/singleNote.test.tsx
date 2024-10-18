import { render, screen, fireEvent } from "@testing-library/react";
import SingleNote from "../components/SingleNote";
import { Label, Note } from "../components/types";
import '@testing-library/jest-dom';

describe("Test SingleNote component", () => {
    it("renders SingleNote display", () => {
        const mockNote: Note = {
            id: 1,
            title: "Test Note",
            content: "This is a test note",
            label: Label.personal,
            isLiked: false,
            isDone: false,
        }
        const mockSetNotes = jest.fn();
        render(<SingleNote note={mockNote} notes={[mockNote]} setNotes={mockSetNotes} />);
        const noteTitle = screen.getByText("Test Note");
        const noteContent = screen.getByText("This is a test note");
        const noteLabel = screen.getByText("personal");
        const deleteButton = screen.getByText("x");
        const likeButton = screen.getAllByLabelText("Like Note");
        const editButton = screen.getAllByLabelText("Edit Note");
        expect(noteTitle).toBeInTheDocument();
        expect(noteContent).toBeInTheDocument();
        expect(noteLabel).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
        expect(likeButton[0]).toBeInTheDocument();
        expect(editButton[0]).toBeInTheDocument();
    });

    it("deletes a note", () => {
        const mockNote: Note = {
            id: 1,
            title: "Test Note",
            content: "This is a test note",
            label: Label.personal,
            isLiked: false,
            isDone: false,
        }
        const mockSetNotes = jest.fn();
        render(<SingleNote note={mockNote} notes={[mockNote]} setNotes={mockSetNotes} />);
        const deleteButton = screen.getByText("x");
        fireEvent.click(deleteButton);
        expect(mockSetNotes).toBeCalledWith([]);
    })
    it("likes a note", () => {
        const mockNote: Note = {
            id: 1,
            title: "Test Note",
            content: "This is a test note",
            label: Label.personal,
            isLiked: false,
            isDone: false,
        }
        const mockSetNotes = jest.fn();
        render(<SingleNote note={mockNote} notes={[mockNote]} setNotes={mockSetNotes} />);
        const likeButton = screen.getAllByLabelText("Like Note");
        fireEvent.click(likeButton[0]);
        expect(mockSetNotes).toBeCalledWith([
            {
                id: 1,
                title: "Test Note",
                content: "This is a test note",
                label: Label.personal,
                isLiked: true,
                isDone: false
            }])
    })
    it("edits a note", () => {
        const mockNote: Note = {
            id: 1,
            title: "Test Note.",
            content: "This is a test note.",
            label: Label.personal,
            isLiked: false,
            isDone: false,
        }
        const mockSetNotes = jest.fn();
        render(<SingleNote note={mockNote} notes={[mockNote]} setNotes={mockSetNotes} />);
        const editIcons = screen.getAllByLabelText("Edit Note");
        fireEvent.click(editIcons[0]);
        const updatedTitle = "Updated Note Title";
        const updatedContent = "Updated Note Content";
        fireEvent.change(screen.getByTestId("note-title-1"), { target: { value: updatedTitle } });
        fireEvent.change(screen.getByTestId("note-content-1"), { target: { value: updatedContent } });
        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);
        expect(mockSetNotes).toBeCalledWith([
            {
                id: 1,
                title: updatedTitle,
                content: updatedContent,
                label: Label.personal,
                isLiked: false,
                isDone: false,
            }])
    })
})
