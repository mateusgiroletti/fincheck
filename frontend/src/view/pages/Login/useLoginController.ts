import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    email: z.string()
        .nonempty("E-mail é obrigatório")
        .email("Informe um e-mail válido"),
    password: z.string()
        .nonempty("Senha é obrigatória")
        .min(8, "Senha deve conter pelo menos 8 dígitos"),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const handleSubmit = hookFormSubmit(async (data) => {
        console.log(data);
    });

    return { handleSubmit, register, errors };
}
