import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../firebase";
import logo from "../assets/nav.png";

const Navbar = () => {
    const { userAuth, firebase } = useContext(FirebaseContext);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="nav container-fluid">
                    <li className="navbar-brand ">
                        <span className="nav-span" >
                            BoviApp
                            <img
                                src={logo}
                                className="ms-3"
                                alt=""
                                width="40"
                                height="25"
                            ></img>
                        </span>
                    </li>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {userAuth ? (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            onClick={() => firebase.logout()}
                                            className="nav-link"
                                            to="/"
                                        >
                                            Cerrar Sesion
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/add">
                                            Registrar Animal
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/list">
                                            Mis Animales
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">
                                            Iniciar Sesion
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">
                                            Registrarse
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
