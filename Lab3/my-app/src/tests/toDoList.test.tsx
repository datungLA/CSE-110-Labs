import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "../toDoList";
import { Label } from "../components/types";
import '@testing-library/jest-dom';

describe("Test ToDoList component", () => {
    it("renders ToDoList display", () => {
        /* Are all the items in the list displayed on the screen */
        render(<ToDoList />);
        const listItems = screen.getAllByRole("listitem");
        expect(listItems.length).toBeGreaterThan(0);
    })
})