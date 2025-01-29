import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const InfoUsuario = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state || {}; // Acceder al id enviado
    const [data, setData] = useState({
        usuario: {},
        perfil: {},
        cabeceracaso: {},
        detallecaso: {},
        plazo: {},
        evidencia: {},
      });

    const handleGoToLogin = () => {
      navigate("/login"); // Navega al calendario
    };
    
      useEffect(() => {
        // Fetch usuario
        fetch(`http://localhost:3000/usuarios/${id}`)
          .then((response) => response.json())
          .then((usuario) => {
            setData((prevData) => ({ ...prevData, usuario }));
    
            // Fetch perfil
            return fetch(`http://localhost:3000/perfiles/${usuario.idperfil}`);
          })
          .then((response) => response.json())
          .then((perfil) => {
            setData((prevData) => ({ ...prevData, perfil }));
            // Fetch caso usuario
            return fetch(`http://localhost:3000/casousuario/${data.usuario.idusuario}`);
          })
          .then((response) => response.json())
          .then((casousuario) => {
            // Fetch cabecera caso
            return fetch(`http://localhost:3000/cabeceracasos/${casousuario[0].idcabeceracaso}`);
          })
          .then((response) => response.json())
          .then((cabeceracaso) => {
            setData((prevData) => ({ ...prevData, cabeceracaso }));
    
            // Fetch detalle casoa
            return fetch(`http://localhost:3000/detallecasos/${cabeceracaso.idcabeceracaso}`);
          })
          .then((response) => response.json())
          .then((detallecaso) => {
            setData((prevData) => ({ ...prevData, detallecaso }));
    
            // Fetch plazo
            return fetch("http://localhost:3000/plazos")
            .then((response) => response.json())
            .then((plazos) => {
              // Buscar el plazo con el id especificado
              const plazoEncontrado = plazos.find((plazo) => plazo.idplazo === detallecaso.idplazo) || null;
          
              setData((prevData) => ({ ...prevData, plazo: plazoEncontrado }));
            })
            .catch((error) => console.error("Error al obtener los plazos:", error));
          })
      }, []);
    
      return (
        <div className="container mt-4">
          <h2 className="mb-4">Información del Usuario</h2>
          <form>
            <fieldset disabled>
              <div className="mb-3">
                <label className="form-label">Nombre Usuario</label>
                <input type="text" className="form-control" value={data.usuario.nombreusuario || ""} />
              </div>
              <div className="mb-3">
                <label className="form-label">Perfil</label>
                <input type="text" className="form-control" value={data.perfil.nombreperfil || ""} />
              </div>
              <div className="mb-3">
                <label className="form-label">Código Caso</label>
                <input type="text" className="form-control" value={data.cabeceracaso.codigocaso || ""} />
              </div>
              <div className="mb-3">
                <label className="form-label">Observaciones Caso</label>
                <textarea className="form-control" value={data.detallecaso.observacionesdetallecaso || ""} />
              </div>
              <div className="mb-3">
                <label className="form-label">Plazo Inicio</label>
                <input type="text" className="form-control" value={data.plazo.fechainicioplazo || ""} />
              </div>
            </fieldset>
          </form>
          <button
          type="button"
          className="btn btn-primary ms-3"
          onClick={handleGoToLogin}
        >
          Regresar
        </button>
        </div>
      );
    };

export default InfoUsuario;