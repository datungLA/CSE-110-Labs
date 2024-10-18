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
        const likeButton = screen.getByText("♡");
        const editButton = screen.getByTestId("edit-button");
        expect(noteTitle).toBeInTheDocument();
        expect(noteContent).toBeInTheDocument();
        expect(noteLabel).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
        expect(likeButton).toBeInTheDocument();
        expect(editButton).toBeInTheDocument();
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
        const likeButton = screen.getByText("♡");
        fireEvent.click(likeButton);
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
        const noteTitle = screen.getByText(mockNote.title);
        console.log(noteTitle);
        const editButton = screen.getByTestId("edit-button");
        const updatedTitle = "Updated Note Title";
        const updatedContent = "Updated Note Content";
        fireEvent.click(editButton);
        fireEvent.change(screen.getByPlaceholderText(mockNote.title), { target: { value: updatedTitle } });
        fireEvent.change(screen.getByPlaceholderText(mockNote.content), { target: { value: updatedContent } });
        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);
        expect(mockSetNotes).toBeCalledWith([
            {
                id: 1,
                title: "Updated Note Title",
                content: "Updated Note Content",
                label: Label.personal,
                isLiked: false,
                isDone: false,
            }])
    })
})
