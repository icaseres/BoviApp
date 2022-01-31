import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import firebase from "../firebase/firebase";

const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const login = async (data) => {
        try {
            const { email, password } = data;
            await firebase.login(email, password);
            navigate("/list");
        } catch (ex) {
            console.log(ex.message);
            //serErr(e.message);
        }
    };

    return (
        <>
            <div className="container forms ">
                <h2 className="mb-3">Ingresar</h2>

                {errors.email?.type === "required" && (
                    <div className="alert alert-danger">
                        <strong>Ingresa un email</strong>
                    </div>
                )}
                {errors.password?.type === "required" && (
                    <div className="alert alert-danger">
                        <strong>Ingresa una contraseña</strong>
                    </div>
                )}
                <form className="" onSubmit={handleSubmit(login)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                        <input
                            {...register("password", {
                                required: true,
                            })}
                            type="password"
                            className="form-control"
                            id="password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="d-grid gap-2 col-6 mx-auto btn btn-primary"
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
