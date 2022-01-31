import React, { useState, useEffect, useContext } from "react";
import cow from "../assets/cow.png";
import { useForm } from "react-hook-form";
import firebase from "../firebase/firebase";
import { FirebaseContext } from "../firebase";

const Form = () => {
    const { userAuth } = useContext(FirebaseContext);
    console.log(userAuth);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [bovino, setBovino] = useState({
        sexo: "",
        gestante: "",
        lechera: "",
        categoria: "",
    });
    const [err, setErr] = useState(true);
    const { sexo, gestante, lechera, categoria } = bovino;

    const registerData = async (data) => {
        try {
            data.uid = userAuth.uid;
            await firebase.createData(data);
            setErr(false);
            clean();
        } catch (ex) {
            console.log(ex.message);
        }
    };

    const clean = () => {
        setErr(true);
    };

    const onChange = (e) => {
        setBovino({
            ...bovino,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [err]);
    return (
        <>
            <div className="container mt-5">
                <h2 className="mb-3">Crear</h2>
                {!err ? (
                    <div className="alert alert-success">
                        <strong>Exito!</strong> Registro exitoso
                    </div>
                ) : null}
                <form className="row g-3" onSubmit={handleSubmit(registerData)}>
                    <div className="col-md-6">
                        <label className="form-label">Hacienda (Busqueda)</label>
                        <input
                            {...register("hacienda", { required: true })}
                            type="text"
                            className="form-control"
                            id="hacienda"
                            placeholder="..."
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Numero Animal</label>
                        <input
                            {...register("numero", { required: true })}
                            type="number"
                            className="form-control"
                            id="numero"
                            placeholder="Id"
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Lote</label>
                        <input
                            {...register("lote", { required: true })}
                            type="number"
                            className="form-control"
                            id="lote"
                            placeholder="Lote"
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Nombre</label>
                        <input
                            {...register("nombre")}
                            type="text"
                            className="form-control"
                            id="nombre"
                            placeholder="Nombre/Apodo"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Estado</label>
                        <input
                            {...register("estado")}
                            type="text"
                            className="form-control"
                            id="estado"
                            placeholder="Estado del animal"
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">Categoria</label>
                        <select
                            {...register("categoria", { required: true })}
                            className="form-select"
                            value={categoria}
                            onChange={onChange}
                            required
                        >
                            <option defaultValue></option>
                            <option value="Cria">Cria</option>
                            <option value="Novillo">Novillo</option>
                            <option value="Adulto">Adulto</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">Raza</label>
                        <select
                            {...register("raza", { required: true })}
                            className="form-select"
                            required
                        >
                            <option defaultValue></option>
                            <option value="Cebu">Cebú</option>
                            <option value="Simmental">Simmental</option>
                            <option value="Pardo suizo">Pardo suizo</option>
                            <option value="Normando">Normando</option>
                            <option value="Gyr">Gyr</option>
                            <option value="Angus">Angus</option>
                            <option value="Brahman americano">Brahman americano</option>
                            <option value="Guzerat">Guzerat</option>
                            <option value="Criollo">Criollo</option>
                            <option value="Jersey">Jersey</option>
                            <option value="Guernsey">Guernsey</option>
                            <option value="Otra">Otra</option>
                        </select>
                    </div>
                    {categoria === "Cria" ? (
                        <div className="col-md-2">
                            <label className="form-label">V. Brucelosis</label>
                            <select
                                {...register("brucelosis", { required: true })}
                                className="form-select"
                                required
                            >
                                <option defaultValue></option>
                                <option value="SI">SI</option>
                                <option value="NO">NO</option>
                            </select>
                        </div>
                    ) : null}
                    <div className="col-md-2">
                        <label className="form-label">Sexo</label>
                        <select
                            {...register("sexo", { required: true })}
                            className="form-select"
                            value={sexo}
                            onChange={onChange}
                            required
                        >
                            <option defaultValue></option>
                            <option value="Hembra">Hembra</option>
                            <option value="Macho">Macho</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">Peso</label>
                        <input
                            {...register("peso", { required: true })}
                            type="number"
                            className="form-control"
                            id="peso"
                            placeholder="kg"
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Fecha Nacimiento</label>
                        <input
                            {...register("nacimiento")}
                            type="date"
                            className="form-control"
                            id="date"
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">Hierro</label>
                        <select
                            {...register("hierro", { required: true })}
                            className="form-select"
                            required
                        >
                            <option defaultValue></option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Fecha de Entrada</label>
                        <input
                            {...register("entrada")}
                            type="date"
                            className="form-control"
                            id="date1"
                            required
                        />
                    </div>
                    {sexo === "Hembra" && categoria === "Adulto" ? (
                        <>
                            <div className="col-md-4">
                                <label className="form-label">Ultimo Celo</label>
                                <input
                                    {...register("celo")}
                                    type="date"
                                    className="form-control"
                                    id="celo"
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Ultimo Parto</label>
                                <input
                                    {...register("parto")}
                                    type="date"
                                    className="form-control"
                                    id="parto"
                                />
                            </div>
                            <div className="col-md-1">
                                <label className="form-label">#Partos</label>
                                <input
                                    {...register("partos", { required: true })}
                                    type="number"
                                    className="form-control"
                                    id="partos"
                                    placeholder="#"
                                    required
                                />
                            </div>
                            <div className="col-md-1">
                                <label className="form-label">Gestante</label>
                                <select
                                    {...register("gestante", { required: true })}
                                    onChange={onChange}
                                    value={gestante}
                                    className="form-select"
                                    required
                                >
                                    <option defaultValue></option>
                                    <option value="SI">SI</option>
                                    <option value="NO">NO</option>
                                </select>
                            </div>
                            {gestante === "SI" ? (
                                <>
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Fecha de Preñez
                                        </label>
                                        <input
                                            {...register("preñez")}
                                            type="date"
                                            className="form-control"
                                            id="preñez"
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-label">
                                            Dias de Preñez
                                        </label>
                                        <input
                                            {...register("dias")}
                                            type="number"
                                            className="form-control"
                                            id="dias"
                                            placeholder="#"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">
                                            Parto Esperado
                                        </label>
                                        <input
                                            {...register("fparto")}
                                            type="date"
                                            className="form-control"
                                            id="fparto"
                                        />
                                    </div>
                                    <div className="col-md-1">
                                        <label className="form-label">Lechera</label>
                                        <select
                                            {...register("lechera", { required: true })}
                                            type="boolean"
                                            onChange={onChange}
                                            value={lechera}
                                            className="form-select"
                                            required
                                        >
                                            <option defaultValue></option>
                                            <option value="SI">SI</option>
                                            <option value="NO">NO</option>
                                        </select>
                                    </div>
                                    {lechera === "SI" ? (
                                        <div className="col-md-2">
                                            <label className="form-label">
                                                Litros Diarios
                                            </label>
                                            <input
                                                {...register("litros")}
                                                type="number"
                                                className="form-control"
                                                id="litros"
                                                placeholder="#"
                                            />
                                        </div>
                                    ) : null}
                                </>
                            ) : null}
                        </>
                    ) : null}
                    <div>
                        <button
                            type="submit"
                            className="d-grid gap-2 col-6 mx-auto btn btn-primary"
                        >
                            Registar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Form;
