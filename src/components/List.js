import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebase/firebase";
import { FirebaseContext } from "../firebase";

const List = () => {
    const { userAuth } = useContext(FirebaseContext);
    const [data, setData] = useState([]);
    const [hacienda, setHacienda] = useState([]);
    const [filtrer, setFiltrer] = useState({
        haciend: "",
        raza: "",
        sexo: "",
    });
    const { haciend, sexo, raza } = filtrer;
    const getData = async () => {
        try {
            const get = await firebase.getData(userAuth.uid);
            setData(get);
        } catch (ex) {
            console.log(ex.message);
        }
    };
    const getH = async () => {
        try {
            var get = await firebase.getData(userAuth.uid);
            var a = [];
            get.map((ha) => a.push(ha.data.hacienda));
            var uniqueArr = [...new Set(a)];
            setHacienda(uniqueArr);
        } catch (ex) {
            console.log(ex.message);
        }
    };
    const filttrer = async () => {
        if (haciend === "" && sexo === "" && raza === "") {
            getData();
        } else {
            const dat = await firebase.getDataQ("hacienda", haciend,userAuth.uid);
            setData(dat);
        }
    };

    const onChange = (e) => {
        setFiltrer({
            ...filtrer,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        filttrer();
        getH();
    }, [userAuth]);

    return (
        <>
            <div className="container mt-5">
                <div className="row g-3">
                    <div className="col-md-6">
                        <select
                            className="form-select"
                            aria-label=".form-select-sm example"
                            name="haciend"
                            value={haciend}
                            onChange={onChange}
                            placeholder="hacienda"
                            required
                        >
                            <option value="" defaultValue>
                                Selecciona una Hacienda
                            </option>
                            {Object.keys(hacienda).length !== 0
                                ? hacienda.map((ha) => (
                                      <option key={ha} value={ha}>
                                          {ha}
                                      </option>
                                  ))
                                : null}
                        </select>
                    </div>
                    {/*
                        
                    <div className="col-md-3">
                        <label className="form-label">Sexo</label>
                        <select
                            className="form-select"
                            aria-label=".form-select-sm example"
                            name="sexo"
                            value={sexo}
                            onChange={onChange}
                        >
                            <option defaultValue></option>
                            <option value="Macho">Macho</option>
                            <option value="Hembra">Hembra</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Raza</label>
                        <select
                            className="form-select"
                            aria-label=".form-select-sm example"
                            name="raza"
                            value={raza}
                            onChange={onChange}
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
                        */}
                    <div className="col-md-6 ">
                        <button
                            type="button"
                            onClick={filttrer}
                            className="btn btn-primary mb-3 btn-list"
                        >
                            Filtrar
                        </button>
                    </div>
                </div>
            </div>
            <div className="table-responsive container mt-5">
                {data ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Hacienda</th>
                                <th scope="col">Lote</th>
                                <th scope="col">Sexo</th>
                                <th scope="col">Raza</th>
                                <th scope="col">Peso</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Hierro</th>
                                <th scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((animal) => (
                                <tr key={animal.id}>
                                    <th scope="row">{animal.data.numero} </th>
                                    <td>{animal.data.nombre}</td>
                                    <td>{animal.data.hacienda}</td>
                                    <td>{animal.data.lote}</td>
                                    <td>{animal.data.sexo}</td>
                                    <td>{animal.data.raza}</td>
                                    <td>{animal.data.peso}</td>
                                    <td>{animal.data.categoria}</td>
                                    <td>{animal.data.hierro}</td>
                                    <td>{animal.data.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : null}
            </div>
        </>
    );
};

export default List;
