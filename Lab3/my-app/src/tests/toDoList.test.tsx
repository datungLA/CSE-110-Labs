import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "../toDoList";
import { dummyGroceryList } from "../components/constants";
import '@testing-library/jest-dom';

describe("Test ToDoList component", () => {
    it("renders ToDoList display", () => {
        const mockGroceryList = dummyGroceryList;
        render(<ToDoList />);
        const itemBoughtTitle = screen.getByText("Items bought: 0");
        const appleTitle = screen.getByText(mockGroceryList[0].name);
        const bananaTitle = screen.getByText(mockGroceryList[1].name)
        expect(appleTitle).toBeInTheDocument();
        expect(bananaTitle).toBeInTheDocument();
        expect(itemBoughtTitle).toBeInTheDocument();
    })
    it("click and unclick on items' checkbox", () => {
        render(<ToDoList />)
        const items = screen.getAllByRole("checkbox");
        fireEvent.click(items[0]);
        fireEvent.click(items[0]);
        let itemBoughtTitle = screen.getByText("Items bought: 2")
        expect(itemBoughtTitle).toBeInTheDocument();
        fireEvent.click(items[0]);
        itemBoughtTitle = screen.getByText("Items bought: 1")
        expect(itemBoughtTitle).toBeInTheDocument();
        fireEvent.click(items[1]);
        itemBoughtTitle = screen.getByText("Items bought: 0")
        expect(itemBoughtTitle).toBeInTheDocument();
    })
})