import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import firebase, { FirebaseContext } from "./firebase";
import useAuth from "./hooks/useAuth";
import Form from "./components/Form";
import List from "./components/List";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";

function App() {
    const userAuth = useAuth();
    return (
        <FirebaseContext.Provider value={{ firebase, userAuth }}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/add" element={<Form />} />
                    <Route path="/list" element={<List />} />
                </Routes>
            </BrowserRouter>
        </FirebaseContext.Provider>
    );
}

export default App;
