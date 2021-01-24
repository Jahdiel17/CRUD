import React, {Component} from 'react';

class MiComponente extends Component{
    render(){
        let receta = {
            nombre: 'balucas',
            ingredientes: 'Frijoles, queso, huevos',
            calorias: 250

        };
        
        return(
            <div className="mi-componente">
        <h1>{'Receta: ' + receta.nombre}</h1>
        <h2>{'Calorias: ' + receta.calorias}</h2>
        <hr/>
        </div>
        );
    }
}
export default MiComponente;