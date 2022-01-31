import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase/firebase";

const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        //formState: { errors },
    } = useForm();

    const registerUser = async (data) => {
        try {
            const { nombre, email, password } = data;
            await firebase.register(nombre, email, password);
            navigate("/");
        } catch (ex) {
            console.log(ex.message);
            //serErr(e.message);
        }
    };
    const onSubmit = (data) => {
        registerUser(data);
    };
    return (
        <>
            <div className="container forms ">
                <h2 className="mb-3">Registrarse</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">
                            Nombre
                        </label>
                        <input
                            {...register("nombre")}
                            type="text"
                            className="form-control"
                            id="nombre"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                        <input
                            {...register("password")}
                            type="password"
                            className="form-control"
                            id="password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Cpassword" className="form-label">
                            Ingresa nuevamente tu contraseña
                        </label>
                        <input
                            {...register("Cpassword")}
                            type="password"
                            className="form-control"
                            id="Cpassword"
                            required
                        />
                    </div>
                    <button type="submit" className="d-grid gap-2 col-6 mx-auto btn btn-primary">
                        Registrar
                    </button>
                </form>
            </div>
        </>
    );
};

export default Register;
