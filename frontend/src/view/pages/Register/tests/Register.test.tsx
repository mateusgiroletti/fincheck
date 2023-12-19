// Arquivo: Register.test.tsx
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Register } from "../index";
import * as useRegisterController from "../useRegisterController";

describe("Button", () => {
    it('should be able render Register component', () => {
        render(
            <QueryClientProvider client={new QueryClient()}>
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    it('should be able submit form on button click', async () => {
        const useRegisterControllerSpy = vi.spyOn(useRegisterController, "useRegisterController");

        useRegisterControllerSpy.mockReturnValue({
            errors: {},
            handleSubmit: vi.fn(),
            register: vi.fn(),
            isLoading: false,
        });

        const { getByText } = render(
            <QueryClientProvider client={new QueryClient()}>
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </QueryClientProvider>
        );

        fireEvent.click(getByText('Criar conta'));

        // Aguarde a execução da função handleSubmit
        await waitFor(() => {
            expect(useRegisterControllerSpy).toHaveBeenCalled();
            // Adicione mais expectativas conforme necessário
        });
    });

});



