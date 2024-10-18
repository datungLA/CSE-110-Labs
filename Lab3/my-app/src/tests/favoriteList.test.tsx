import { render, screen } from "@testing-library/react";
import FavoriteList from "../components/FavoriteList";
import { Note, Label } from "../components/types";
import '@testing-library/jest-dom';
describe("FavoriteList", () => {
    it("renders an empty favorite list", () => {
        const mockNotes: Note[] = [];
        render(<FavoriteList notes={mockNotes} />);
        const favoriteListHeading = screen.getByText("List of favorites:");
        expect(favoriteListHeading).toBeInTheDocument();
    })
    it("renders a favorite list with favorited and unfavorited notes", () => {
        const mockNotes: Note[] = [
            {
                id: 1,
                title: "Test Note",
                content: "This is a test note",
                label: Label.personal,
                isLiked: true,
                isDone: false,
            },
            {
                id: 2,
                title: "Test Note 2",
                content: "This is another test note",
                label: Label.work,
                isLiked: false,
                isDone: true,
            },
            {
                id: 3,
                title: "Test Note 3",
                content: "This is a third test note",
                label: Label.study,
                isLiked: true,
                isDone: false,
            }
        ]
        render(<FavoriteList notes={mockNotes} />);
        const favoriteListOne = screen.getByText("Test Note");
        const favoriteListTwo = screen.getByText("Test Note 3");
        expect(favoriteListOne).toBeInTheDocument();
        expect(favoriteListTwo).toBeInTheDocument();
        expect(screen.queryByText("Test Note 2")).toBeNull();
    })
});