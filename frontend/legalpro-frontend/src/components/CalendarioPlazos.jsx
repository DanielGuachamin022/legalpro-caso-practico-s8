/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";

const CalendarioPlazos = () => {
    const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const handleGoToCalendar = () => {
    navigate("/abogado"); // Navega al calendario
  };

  // Cargar los plazos desde el backend
  useEffect(() => {
    fetch("http://localhost:3000/plazos") // URL del endpoint para obtener los plazos
      .then((response) => response.json())
      .then((data) => {
        const loadedEvents = data.map((plazo) => ({
          id: plazo.idplazo,
          title: plazo.nombreplazo,
          date: plazo.fechainicioplazo, // Cambia según tu estructura
          description: `Inicio: ${plazo.fechainicioplazo}, Fin: ${plazo.fechafinplazo}`,
        }));
        setEvents(loadedEvents);
      })
      .catch((error) => console.error("Error al cargar los plazos:", error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Seguimiento de Plazos</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => {
          alert(`Evento: ${info.event.title}\nDetalles: ${info.event.extendedProps.description}`);
        }}
      />
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

export default CalendarioPlazos;
