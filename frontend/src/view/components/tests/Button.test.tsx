import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import {describe, test, expect} from "vitest";
import {Button} from "../Button";

describe("Button", () => {
    test("should be render", () => {
        const {getByText} =  render(<Button>Teste</Button>);

        expect(getByText("Teste")).toBeInTheDocument();
    })
})
