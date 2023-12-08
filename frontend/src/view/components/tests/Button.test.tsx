import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../Button";

const buttonTestId = "button";

describe("Button", () => {
    it("should be able to render the button", () => {
        render(<Button >Test</Button>);

        expect(screen.getByTestId(buttonTestId)).toHaveTextContent("Test");
    });

    it("should be able to fire event", () => {
        const handleClick = vi.fn();

        render(<Button onClick={handleClick}>Test</Button>);

        fireEvent.click(screen.getByTestId(buttonTestId));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be applies the "danger" variant correctly', () => {
        render(<Button variant="danger" />);
        expect(screen.getByTestId(buttonTestId)).toHaveClass('bg-red-900');
    });

    it('should be applies the "ghost" variant correctly', () => {
        render(<Button variant="ghost" />);
        expect(screen.getByTestId(buttonTestId)).toHaveClass('border-gray-800');
    });

    it('should be disables the button when isLoading is true', () => {
        render(<Button isLoading />);
        expect(screen.getByTestId(buttonTestId)).toBeDisabled();
    });

    it('should be disables the button when disabled is true', () => {
        render(<Button disabled />);
        expect(screen.getByTestId(buttonTestId)).toBeDisabled();
    });

});
