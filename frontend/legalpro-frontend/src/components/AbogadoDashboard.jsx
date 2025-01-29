/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AbogadoDashboard = () => {
  const navigate = useNavigate();
    const [tiposCasos, setTiposCasos] = useState([]);
    const [formData, setFormData] = useState({
      nombrecliente: "",
      idtipocaso: "",
      fechainiciocabeceracaso: "",
      estadocabeceracaso: true,
      observaciones: "",
      nombreevidencia: "",
      fechaevidencia: "",
      nombreplazo: "",
      fechainicioplazo: "",
      fechafinplazo: "",
    });
  
    useEffect(() => {
      // Fetch tipos de casos desde el backend
      fetch("http://localhost:3000/tipocasos")
        .then((response) => response.json())
        .then((data) => setTiposCasos(data))
        .catch((error) => console.error("Error al cargar tipos de casos:", error));
    }, []);
  
    const handleGoToCalendar = () => {
      navigate("/calendar"); // Navega al calendario
    };

    const handleGoToAssign = () => {
      navigate("/asignar"); // Navega a la asignacion
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Paso 1: Crear CabeceraCaso
        const codigocaso = `CASO-${Date.now().toString().slice(-5)}`;
        const cabeceraCasoData = {
          nombrecliente: formData.nombrecliente,
          fechainiciocabeceracaso: formData.fechaInicio,
          idtipocaso: parseInt(formData.tipoCaso, 10),
          codigocaso,
          estadocabeceracaso: true,
        };
  
        const cabeceraResponse = await fetch("http://localhost:3000/cabeceracasos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cabeceraCasoData),
        });
  
        if (!cabeceraResponse.ok) {
          throw new Error("Error al registrar la cabecera del caso");
        }
  
        const cabeceraCaso = await cabeceraResponse.json();
        const idcabeceracaso = cabeceraCaso.idcabeceracaso;

        console.log("respuesta cabecera: ", cabeceraCaso.idcabeceracaso)
  
        // Paso 2: Crear Evidencia
        const evidenciaData = {
          nombreevidencia: formData.nombreEvidencia,
          estadoevidencia: true,
          fechaingresoevidencia: formData.fechaEvidencia,
        };
  
        const evidenciaResponse = await fetch("http://localhost:3000/evidencias", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(evidenciaData),
        });
  
        if (!evidenciaResponse.ok) {
          throw new Error("Error al registrar la evidencia");
        }
  
        const evidencia = await evidenciaResponse.json();
        const idevidencia = evidencia.idevidencia;

        console.log("respuesta evidencia: ", evidencia.idevidencia)
  
        // Paso 3: Crear Plazo
        const plazoData = {
          nombreplazo: formData.nombrePlazo,
          fechaingresoplazo: new Date().toISOString().split("T")[0],
          fechainicioplazo: formData.fechaInicioPlazo,
          fechafinplazo: formData.fechaFinPlazo,
          estadoplazo: true,
        };
  
        const plazoResponse = await fetch("http://localhost:3000/plazos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(plazoData),
        });
  
        if (!plazoResponse.ok) {
          throw new Error("Error al registrar el plazo");
        }
  
        const plazo = await plazoResponse.json();
        const idplazo = plazo.idplazo;

        console.log("respuesta plazo: ", plazo.idplazo)
  
        console.log("identificadores: ", idevidencia,idplazo,idcabeceracaso)
        // Paso 4: Crear DetalleCaso
        const detalleCasoData = {
          observacionesdetallecaso: formData.observaciones,
          estadodetallecaso: true,
          idevidencia,
          idplazo,
          idcabeceracaso,
        };

        console.log("detalle caso: ", detalleCasoData)
  
        const detalleResponse = await fetch("http://localhost:3000/detallecasos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(detalleCasoData),
        }); 
  
        if (!detalleResponse.ok) {
          throw new Error("Error al registrar el detalle del caso");
        }
  
        alert("Caso registrado exitosamente.");
        setFormData({
          nombreCliente: "",
          tipoCaso: "",
          fechaInicio: "",
          observaciones: "",
          nombreEvidencia: "",
          fechaEvidencia: "",
          nombrePlazo: "",
          fechaInicioPlazo: "",
          fechaFinPlazo: "",
        });
      } catch (error) {
        console.error("Error al procesar el formulario:", error);
        alert("Ocurrió un error al registrar los datos.");
      }
    };
      
      
      
  
    return (
        <div className="container mt-5">
        <h2 className="text-center mb-4">Registro de Caso</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombrecliente" className="form-label">
              Nombre del Cliente
            </label>
            <input
              type="text"
              id="nombrecliente"
              name="nombrecliente"
              value={formData.nombrecliente}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="tipoCaso" className="form-label">
              Tipo de Caso
            </label>
            <select
              id="tipoCaso"
              name="tipoCaso"
              value={formData.tipoCaso}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Seleccione un tipo de caso</option>
              {tiposCasos.map((tipo) => (
                <option key={tipo.idtipocaso} value={tipo.idtipocaso}>
                  {tipo.nombretipocaso}
                </option>
              ))}
            </select>
          </div>
  
          <div className="mb-3">
            <label htmlFor="fechaInicio" className="form-label">
              Fecha de Inicio
            </label>
            <input
              type="date"
              id="fechaInicio"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="observaciones" className="form-label">
              Observaciones
            </label>
            <textarea
              type="text"
              id="observaciones"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="nombreEvidencia" className="form-label">
              Nombre de la evidencia
            </label>
            <input
              type="text"
              id="nombreEvidencia"
              name="nombreEvidencia"
              value={formData.nombreEvidencia}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="nombrePlazo" className="form-label">
              Nombre del plazo
            </label>
            <input
              type="text"
              id="nombrePlazo"
              name="nombrePlazo"
              value={formData.nombrePlazo}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fechaEvidencia" className="form-label">
              Fecha de registro evidencia
            </label>
            <input
              type="date"
              id="fechaEvidencia"
              name="fechaEvidencia"
              value={formData.fechaEvidencia}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fechaInicioPlazo" className="form-label">
              Fecha de inicio plazo
            </label>
            <input
              type="date"
              id="fechaInicioPlazo"
              name="fechaInicioPlazo"
              value={formData.fechaInicioPlazo}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fechaFinPlazo" className="form-label">
              Fecha de fin de plazo
            </label>
            <input
              type="date"
              id="fechaFinPlazo"
              name="fechaFinPlazo"
              value={formData.fechaFinPlazo}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          
  
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Registrar Caso
          </button>
          <button
          type="button"
          className="btn btn-secondary ms-3"
          onClick={handleGoToCalendar}
        >
          Ir al Calendario
        </button>
        </form>

        <button
          type="button"
          className="btn btn-primary ms-3"
          onClick={handleGoToAssign}
        >
          Ir a la Asignacion
        </button>
      </div>
    );
}

export default AbogadoDashboard