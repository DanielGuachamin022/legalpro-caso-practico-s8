/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AsignarCasoUsuario = () => {
    const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [casos, setCasos] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState("");
  const [selectedCaso, setSelectedCaso] = useState("");

  const handleGoToCalendar = () => {
    navigate("/abogado"); // Navega al calendario
  };
  // Cargar usuarios
  useEffect(() => {
    fetch("http://localhost:3000/usuarios")
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error("Error al cargar los usuarios:", error));
  }, []);

  // Cargar casos
  useEffect(() => {
    fetch("http://localhost:3000/cabeceracasos")
      .then((response) => response.json())
      .then((data) => setCasos(data))
      .catch((error) => console.error("Error al cargar los casos:", error));
  }, []);

  // Cargar asignaciones
  useEffect(() => {
    fetch("http://localhost:3000/casousuario")
      .then((response) => response.json())
      .then((data) => setAsignaciones(data))
      .catch((error) => console.error("Error al cargar las asignaciones:", error));
  }, []);

  // Asignar usuario a caso
  const handleAssign = () => {
    if (!selectedUsuario || !selectedCaso) {
      alert("Debe seleccionar un usuario y un caso.");
      return;
    }
    fetch("http://localhost:3000/casousuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idusuario: selectedUsuario,
        idcabeceracaso: selectedCaso,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Usuario asignado al caso con éxito.");
          setSelectedUsuario("");
          setSelectedCaso("");
          // Recargar asignaciones
          fetch("http://localhost:3000/casousuario")
            .then((response) => response.json())
            .then((data) => setAsignaciones(data));
        } else {
          alert("Error al asignar el usuario.");
        }
      })
      .catch((error) => console.error("Error al asignar el usuario:", error));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Asignar Usuarios a Casos</h2>
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="usuario">Usuarios</label>
          <select
            id="usuario"
            className="form-control"
            value={selectedUsuario}
            onChange={(e) => setSelectedUsuario(e.target.value)}
          >
            <option value="">Seleccionar Usuario</option>
            {usuarios.map((usuario) => (
              <option key={usuario.idusuario} value={usuario.idusuario}>
                {usuario.nombreusuario}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="caso">Casos</label>
          <select
            id="caso"
            className="form-control"
            value={selectedCaso}
            onChange={(e) => setSelectedCaso(e.target.value)}
          >
            <option value="">Seleccionar Caso</option>
            {casos.map((caso) => (
              <option key={caso.idcabeceracaso} value={caso.idcabeceracaso}>
                {caso.codigocaso}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 text-center">
        <button className="btn btn-primary" onClick={handleAssign}>
          Asignar Usuario a Caso
        </button>
      </div>

      <h3 className="mt-5">Asignaciones actuales</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Código del Caso</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
          {asignaciones.map((asignacion) => (
            <tr key={`${asignacion.idcabeceracaso}-${asignacion.idusuario}`}>
              <td>{asignacion.CabeceraCaso.codigocaso}</td>
              <td>{asignacion.Usuario.nombreusuario}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
          type="button"
          className="btn btn-secondary ms-3"
          onClick={handleGoToCalendar}
        >
          Ir a Registro de Casos
        </button>
    </div>
  );
};

export default AsignarCasoUsuario;
