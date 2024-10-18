import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "../toDoList";
import '@testing-library/jest-dom';

describe("ToDo List Component", () => {
    test("displays all items in the list", () => {
        render(<ToDoList />);

        const firstItem = screen.getByText("Apples"); 
        const secondItem = screen.getByText("Bananas"); 

        // Check if both items are rendered on the screen
        expect(firstItem).toBeInTheDocument();
        expect(secondItem).toBeInTheDocument();
    });

    test("updates the number of checked items correctly", () => {
        render(<ToDoList />);
    
        const checkboxes = screen.getAllByRole('checkbox');

        fireEvent.click(checkboxes[0]);
    
        const numRemainingItems = screen.getByText(/items bought/i);
        expect(numRemainingItems).toHaveTextContent("1");
    });
    
});
