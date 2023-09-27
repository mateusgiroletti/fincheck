import { BrowserRouter, Route, Routes } from "react-router-dom";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<h1>Login</h1>} />
                <Route path="/register" element={<h1>register</h1>} />
                <Route path="/" element={<h1>Dashboard</h1>} />
            </Routes>
        </BrowserRouter>
    );
}