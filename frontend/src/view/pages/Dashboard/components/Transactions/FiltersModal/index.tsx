import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { cn } from "../../../../../../app/utils/cn";
import { Button } from "../../../../../components/Button";
import { Modal } from "../../../../../components/Modal";
import { useFiltersModalController } from "./useFiltersModalController";

import * as ToggleGroup from "@radix-ui/react-toggle-group";

interface FiltersModalProps {
    open: boolean;
    onClose(): void;
    onApplyFilters(filters: {
        bankAccountId: string[] | undefined;
        year: number;
    }): void;
}

export function FiltersModal({
    open,
    onClose,
    onApplyFilters,
}: FiltersModalProps) {
    const {
        selectedBankAccountId,
        handleSelectBankAccount,
        selectedYear,
        handleChangeYear,
        accounts,
    } = useFiltersModalController();

    return (
        <Modal open={open} onClose={onClose} title="Filtros">
            <div>
                <span className="text-lg tracking-[-1px] font-bold text-gray-800">
                    Conta
                </span>

                <ToggleGroup.Root
                    type="multiple"
                    className="ToggleGroup space-y-2 mt-2"
                    onValueChange={(accountId) =>
                        handleSelectBankAccount(accountId)
                    }
                    defaultValue={selectedBankAccountId}
                >
                    {accounts.map((account) => (
                        <ToggleGroup.Item
                            key={account.id}
                            value={account.id}
                            aria-label={account.name}
                            className={cn(
                                "p-2 bg-gray-50 rounded-2xl w-full text-center text-gray-800 hover:bg-gray-200 transition-colors",
                                "data-[state=on]:bg-gray-300",
                                selectedBankAccountId?.includes(account.id) &&
                                    "bg-gray-300",
                            )}
                        >
                            {account.name}
                        </ToggleGroup.Item>
                    ))}
                </ToggleGroup.Root>
            </div>

            <div className="mt-10 text-gray-800">
                <span className="text-lg tracking-[-1px] font-bold">Ano</span>

                <div className="mt-2 w-auto flex items-center">
                    <button
                        className="w-12 h-12 flex items-center justify-between"
                        onClick={() => handleChangeYear(-1)}
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>

                    <div className="flex-1 text-center">
                        <span className="text-sm font-medium tracking-[-0.5px]">
                            {selectedYear}
                        </span>
                    </div>

                    <button
                        className="w-12 h-12 flex items-center justify-center"
                        onClick={() => handleChangeYear(1)}
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <Button
                className="w-full mt-10"
                onClick={() =>
                    onApplyFilters({
                        bankAccountId: selectedBankAccountId,
                        year: selectedYear,
                    })
                }
            >
                Aplicar Filtros
            </Button>
        </Modal>
    );
}
