import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthGuard } from "./AuthGuard";

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthGuard isPrivate={false} />} >
                    <Route path="/login" element={<h1>Login</h1>} />
                    <Route path="/register" element={<h1>register</h1>} />
                </Route>
                <Route element={<AuthGuard isPrivate={true} />} >
                    <Route path="/" element={<h1>Dashboard</h1>} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}
