import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "../StickyNotes";
import { Label } from "../components/types";
import '@testing-library/jest-dom';
describe("Create StickyNote", () => {
    test("renders create note form", () => {
        render(<StickyNotes />);

        const titleInput = screen.getByPlaceholderText("Note Title");
        const contentInput = screen.getByPlaceholderText("Note Content");
        const labelSelect = screen.getByText("Other");
        expect(titleInput).toBeInTheDocument();
        expect(contentInput).toBeInTheDocument();
        expect(labelSelect).toBeInTheDocument();
    });

    test("creates a new note", () => {
        render(<StickyNotes />);

        // Please make sure your sticky note has a title and content input field with the following placeholders.
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteLabelSelect = screen.getByText("Other") as HTMLSelectElement;
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "Note content" },
        });
        fireEvent.change(createNoteLabelSelect, { target: { value: Label.work } });
        fireEvent.click(createNoteButton);
        const newNoteTitle = screen.getByText("New Note");
        const newNoteContent = screen.getByText("Note content");
        const newNoteLabel = screen.getByText("Work");
        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
        expect(newNoteLabel).toBeInTheDocument();
    });

    test("create empty note", () => {
        render(<StickyNotes />);
        const createNoteButton = screen.getByText("Create Note");
        const titleInput = screen.getByPlaceholderText("Note Title");
        const contentInput = screen.getByPlaceholderText("Note Content");
        fireEvent.click(createNoteButton);

        expect(titleInput).toBeInvalid();
        expect(contentInput).toBeInvalid();
    })

    test("create note with empty title", () => {
        render(<StickyNotes />);
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(screen.getByPlaceholderText("Note Title"), { target: { value: "" } });
        fireEvent.change(screen.getByPlaceholderText("Note Content"), { target: { value: "asdfsdfasdf" } });

        fireEvent.click(createNoteButton);

        const titleInput = screen.getByPlaceholderText("Note Title");
        const contentInput = screen.getByPlaceholderText("Note Content");

        expect(titleInput).toBeInvalid();
        expect(contentInput).toBeInTheDocument();
    });

    test("create note with empty content", () => {
        render(<StickyNotes />);
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(screen.getByPlaceholderText("Note Title"), { target: { value: "dfwefw" } });
        fireEvent.change(screen.getByPlaceholderText("Note Content"), { target: { value: "" } });

        fireEvent.click(createNoteButton);

        const titleInput = screen.getByPlaceholderText("Note Title");
        const contentInput = screen.getByPlaceholderText("Note Content");

        expect(titleInput).toBeInTheDocument();
        expect(contentInput).toBeInvalid();
    })
    test("select different label", () => {
        render(<StickyNotes />);
        const createNoteLabelSelect = screen.getByText("Other") as HTMLSelectElement;
        fireEvent.change(createNoteLabelSelect, { target: { value: Label.study } });
        expect(createNoteLabelSelect.value).toBe(Label.study);
        fireEvent.change(createNoteLabelSelect, { target: { value: Label.work } });
        expect(createNoteLabelSelect.value).toBe(Label.work);
        fireEvent.change(createNoteLabelSelect, { target: { value: Label.personal } });
        expect(createNoteLabelSelect.value).toBe(Label.personal);
        fireEvent.change(createNoteLabelSelect, { target: { value: Label.other } });
        expect(createNoteLabelSelect.value).toBe(Label.other);
    })
});