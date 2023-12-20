import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Register } from "../index";
import * as useRegisterController from "../useRegisterController";

describe("Register Page", () => {
    it("should be able render Register component", () => {
        render(
            <QueryClientProvider client={new QueryClient()}>
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    it("should be able submits form successfully on button click", async () => {
        const useRegisterControllerSpy = vi.spyOn(useRegisterController, "useRegisterController");

        useRegisterControllerSpy.mockReturnValue({
            errors: {},
            handleSubmit: vi.fn(),
            register: vi.fn(),
            isLoading: false,
        });

        render(
            <QueryClientProvider client={new QueryClient()}>
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </QueryClientProvider>
        );

        fireEvent.input(screen.getByTestId('name'), { target: { value: 'John Doe' } });
        fireEvent.input(screen.getByTestId('email'), { target: { value: 'john@example.com' } });
        fireEvent.input(screen.getByTestId('password'), { target: { value: 'password123' } });

        fireEvent.click(screen.getByText("Criar conta"));

        await waitFor(() => {
            expect(useRegisterControllerSpy).toHaveBeenCalled();
        });
    });

    it("should be able displays loading state during registration", async () => {
        const useRegisterControllerSpy = vi.spyOn(useRegisterController, "useRegisterController");

        useRegisterControllerSpy.mockReturnValue({
            errors: {},
            handleSubmit: vi.fn(),
            register: vi.fn(),
            isLoading: true,
        });

        render(
            <QueryClientProvider client={new QueryClient()}>
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("btnCreate")).toHaveAttribute("disabled");
    });
});



