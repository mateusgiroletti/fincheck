import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Login } from "../index";
import * as useLoginController from "../useLoginController";

describe("Login Page", () => {
    it("should be able render Login component", () => {
        render(
            <QueryClientProvider client={new QueryClient()}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    it("should be able submits form successfully on button click", async () => {
        const useLoginControllerSpy = vi.spyOn(useLoginController, "useLoginController");

        useLoginControllerSpy.mockReturnValue({
            errors: {},
            handleSubmit: vi.fn(),
            register: vi.fn(),
            isLoading: false,
        });

        render(
            <QueryClientProvider client={new QueryClient()}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </QueryClientProvider>
        );

        fireEvent.input(screen.getByTestId('email'), { target: { value: 'john@example.com' } });
        fireEvent.input(screen.getByTestId('password'), { target: { value: 'password123' } });

        fireEvent.click(screen.getByText("Entrar"));

        await waitFor(() => {
            expect(useLoginControllerSpy).toHaveBeenCalled();
        });
    });

    it("should be able displays loading state during login", async () => {
        const useLoginControllerSpy = vi.spyOn(useLoginController, "useLoginController");

        useLoginControllerSpy.mockReturnValue({
            errors: {},
            handleSubmit: vi.fn(),
            register: vi.fn(),
            isLoading: true,
        });

        render(
            <QueryClientProvider client={new QueryClient()}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("btnLogin")).toHaveAttribute("disabled");
    });
});
