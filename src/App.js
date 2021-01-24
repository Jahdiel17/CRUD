import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalHeader, ModalBody,FormGroup, ModalFooter,} from "reactstrap"

const data = [
  { id: 1, producto: "Dell Latitude E6440", descripcion: "Windows 10 Pro; DDR3 1600Mhz 8GB; Core i7 4th-gen", precio: "Lps. 9,500.00"},
  { id: 2, producto: "Asus ROG Strix b450-f", descripcion: "Soporta DDR4 3200MHz; SATA 6Gbps; HDMI 2.0; dual NVMe M.2", precio: "Lps. 2,500.00" },
  { id: 3, producto: "Nvidia Geforce GTX 1070", descripcion: "Nucleos 1920; Bufer de tramas GDDR5 de 8GB; ", precio: "Lps. 5,600.00" },
  { id: 4, producto: "Asus ROG Strix SCAR III", descripcion: "Windows 10 Pro; Intel Core i9 9th-gen;", precio: "Lps. 24,000.00" },
  { id: 5, producto: "HyperX Fury DDR4 8GB/2400MHz", descripcion: "Compatible con XMP de Intel; Compatible con AMD Ryzen", precio: "Lps. 1,400.00"},
  { id: 6, producto: "ACER SWIFT 3 AMD", descripcion: "Windows 10 Home; AMD Ryzen 7 4700U; 16GB LPDDR4X RAM", precio: "Lps. 26,000.00" },
];

class App extends React.Component{
state={
  data : data,
  form:{
    id:'',
    producto:'',
    descripcion:'',
    precio:''
  },
  modalInsertar: false,
  modalEditar: false,
};

handleChange=e=>{
  this.setState({
    form:{
      ...this.state.form,
      [e.target.name]: e.target.value,
    }
  });
}

mostrarModalInsertar=()=>{
  this.setState({modalInsertar: true});
}

ocultarModalInsertar=()=>{
  this.setState({modalInsertar: false});
}

mostrarModalEditar=(registro)=>{
  this.setState({modalEditar: true, form: registro});
}

ocultarModalEditar=()=>{
  this.setState({modalEditar: false});
}

insertar=()=>{
  var valorNuevo={...this.state.form};
  valorNuevo.id=this.state.data.length+1;
  var lista=this.state.data;
  lista.push(valorNuevo);
  this.setState({data: lista, modalInsertar: false});
}

editar=(dato)=>{
  var contador=0;
  var lista=this.state.data;
  lista.map((registro)=>{
    if(dato.id==registro.id){
      lista[contador].producto=dato.producto;
      lista[contador].descripcion=dato.descripcion;
      lista[contador].precio=dato.precio;
    }
    contador++;
  });
  this.setState({data: lista, modalEditar: false});
}

eliminar=(dato)=>{
  var opcion=window.confirm("Realmente desea eliminar el registro "+dato.id);
  if(opcion){
    var contador=0;
    var lista = this.state.data;
    lista.map((registro)=>{
      if(registro.id==dato.id){
        lista.splice(contador, 1);
      }
      contador++;
    });
    this.setState({data: lista});
  }
}

render(){
    return(
      <>
      <Container>
        <br />
        <Button color= "success" onClick={()=>this.mostrarModalInsertar()} >Insertar Nuevo Producto</Button>
        <br /><br />

        <Table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Accion</th>
            </tr>
          </thead>

          <tbody>
            {this.state.data.map((elemento)=> (
              <tr>
                <td>{elemento.id}</td>
                <td>{elemento.producto}</td>
                <td>{elemento.descripcion}</td>
                <td>{elemento.precio}</td>
                <td>
                  <Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{"  "}
                  <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>

        </Table>
      </Container>

      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Registro</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Id: </label>
            <input className="form-control" readOnly type="text" value={this.state.data.length+1} />
          </FormGroup>

          <FormGroup>
            <label>Producto:</label>
            <input className="form-control" name="producto" type="text" onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <label>Descripcion:</label>
            <input className="form-control" name="descripcion" type="text" onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <label>Precio</label>
            <input className="form-control" name="precio" type="text" onChange={this.handleChange} />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={()=>this.insertar()} >Insertar</Button>
          <Button color="danger" onClick={()=>this.ocultarModalInsertar()} >Cancelar</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.modalEditar}>
            <ModalHeader>
              <div>
                <h3>Editar Producto</h3>
              </div>
            </ModalHeader>

            <ModalBody>
              <FormGroup>
                <label>Id:</label>
                <input className="form-control" readOnly type="text" value={this.state.form.id} />
              </FormGroup>

              <FormGroup>
                <label>Producto:</label>
                <input className="form-control" name="producto" type="text"  onChange={this.handleChange} value={this.state.form.producto} />
              </FormGroup>
              <FormGroup>
                <label>Descripcion:</label>
                <input className="form-control" name="descripcion" type="text" onChange={this.handleChange} value={this.state.form.descripcion} />
              </FormGroup>

              <FormGroup>
              <label>Precio:</label>
              <input className="form-control" name="precio" type="text" onChange={this.handleChange} value={this.state.form.precio} />
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" onClick={()=>this.editar(this.state.form)} >Editar</Button>
              <Button color="danger" onClick={()=>this.ocultarModalEditar()} >Cancelar</Button>
            </ModalFooter>
      </Modal>
    </>
    )
  }
}

export default App;
