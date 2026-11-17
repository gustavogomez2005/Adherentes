import './App.css'
import {useState} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function App() {

  const [id, setId] = useState();
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [nomPat, setNomPat] = useState("");
  const [nomMat, setNomMat] = useState("");        
  const [fechaIng, setFechaIng] = useState("");

  const [todosLosSocios, setTodosLosSocios] = useState([]);
  const [editar, setEditar] = useState(false);


  const agregarSocio = ()=>{
    Axios.post('http://localhost:3001/altas' ,{
      nroid: id,
      nom: nombre,
      nomMaterno: nomMat,
      nomPaterno: nomPat,
      nroDni: dni,
      fing: fechaIng
    }).then(()=>{
      mostrarSocio();
      limpiar();
      Swal.fire({
        title: "<strong>Registro Exitoso !!!</strong>",
        text: "Los datos del socio fueron correctamente guardados",
        icon: "success",
        timer: 2000
      });
    });
  }

  const mostrarSocio = ()=>{
    Axios.get('http://localhost:3001/listar')
      .then((registros)=>{
        setTodosLosSocios(registros.data);
      })
      .catch((error) => {
        console.error("Hubo un error al traer los socios:", error);
      Swal.fire({
        title: "<strong>Error !!!</strong>",
        text: "No se pueden mostrar los datos de los socios",
        icon: "error",
        timer: 2000
      });
      });
  }

  const editarSocio = (val)=>{
      setEditar(true);

      setId(val.idadherentes);
      setDni(val.dni);
      setNombre(val.nom);
      setNomPat(val.apemat);
      setNomMat(val.apepat);
      setFechaIng(val.fechaing);
  }

  const actualizar = ()=>{
    Axios.put('http://localhost:3001/modificar' ,{
      nroid: id,
      nom: nombre,
      nomMaterno: nomMat,
      nomPaterno: nomPat,
      nroDni: dni,
      fing: fechaIng
    }).then(()=>{
      mostrarSocio();
      limpiar();
    });    
  }


  const borrarSocio = (id)=>{
    Axios.delete(`http://localhost:3001/eliminar/${id}`).then(()=>{
      mostrarSocio();
      limpiar();
    });    
  }


  const limpiar = ()=>{
    setId("");
    setDni("");
    setNombre("");
    setNomPat("");
    setNomMat("");
    setFechaIng("");
    setEditar(false);
  }



  return (
    <div className="container">

      <div className="card text-center">
        <div className="card-header">
          GESTION DE ADHERENTES
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Código:</span>
            <input type="text" value={id} onChange={(event)=>{
            setId(event.target.value)
            }} className="form-control" placeholder="Ingrese el código" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>          

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">DNI:</span>
            <input type="text" value={dni} onChange={(event)=>{
            setDni(event.target.value)
            }} className="form-control" placeholder="Ingrese el Dni" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text" value={nombre} onChange={(event)=>{
            setNombre(event.target.value)
            }} className="form-control" placeholder="Ingrese el nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Apellido Paterno:</span>
            <input type="text" value={nomPat} onChange={(event)=>{
            setNomPat(event.target.value)
            }} className="form-control" placeholder="Ingrese el apellido paterno" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Apellido Materno:</span>
            <input type="text" value={nomMat} onChange={(event)=>{
            setNomMat(event.target.value)
            }} className="form-control" placeholder="Ingrese el apellido materno" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Fecha de ingreso:</span>
            <input type="date" value={fechaIng} onChange={(event)=>{
            setFechaIng(event.target.value)
            }} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
          </div><br/>

        </div>
        <div className="card-footer text-muted">
          {
            editar == true ? 
            <div>
              <button className='btn btn-warning m-2' onClick={actualizar}>Actualizar</button>
              <button className='btn btn-info m-2' onClick={limpiar}>Cancelar</button>
            </div>
            : <button className='btn btn-success' onClick={agregarSocio}>Registrar</button>          
          }

          <button className='btn btn-info' onClick={mostrarSocio}>Listar</button>          
        </div>
      </div>  

      <table className="table table-success table-striped">
        <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">DNI</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido Materno</th>
              <th scope="col">Apellido Paterno</th>
              <th scope="col">Fecha de Ingreso</th>
              <th scope="col">Acciones</th>                            
            </tr>
          </thead>
          <tbody>

            {
              todosLosSocios.map( (val)=>{
                return <tr  key={val.idadherentes}>
                      <th>{val.idadherentes}</th>
                      <td>{val.dni}</td>
                      <td>{val.nom}</td>
                      <td>{val.apemat}</td>
                      <td>{val.apepat}</td>
                      <td>{val.fechaing}</td>
                      <td>
                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button type="button" onClick={()=>{
                              editarSocio(val)
                            }} className="btn btn-danger ">Editar</button>
                            <button type="button" className="btn btn-success" onClick={ ()=>{
                              borrarSocio(val.idadherentes);
                            }}>Eliminar</button>
                        </div>
                      </td>
                    </tr> 
              })
            }
          </tbody>      
      </table>    
    </div>
  )
}

export default App
