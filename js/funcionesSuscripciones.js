const url = 'https://api-proyecto-s544.onrender.com/api/suscripciones'
const listarSuscripciones = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    //url: Es la url de la api.
    //Al deslpegarla en el servidor colocar la api del servidor
        fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function(data) {
        let listasuscripciones = data.suscripciones //Capturar el array devuelto por la api
        datos = 
        listasuscripciones.map(function(suscripciones) {//Recorrer el array
            respuesta += `<tr><td>${suscripciones.idservicios}</td>`+
            `<td>${suscripciones.regularidad}</td>`+
            `<td>${suscripciones.fechainicio}</td>`+
            `<td>${suscripciones.fechafin}</td>`+
            `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(suscripciones)})' >Editar</a> 
            <a class="waves-effect waves-light btn modal-danger deep-orange darken-4" href='#' onclick='eliminar("${suscripciones._id}")'>Eliminar</a></td>`+
            

            `</tr>`
            body.innerHTML = respuesta
        })
    })

}

const validaciones =(_idservicios,_regularidad) =>{
    const regxNumeros = /^[0-9]+$/;
    const regxLetras = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;

    if (regxNumeros.test(_idservicios) && regxLetras.test(_regularidad) ) {
        flag = true;
      }
}
    
const registrar = async()=> {
    let _idservicios= document.getElementById('idservicios').value
    let _regularidad= document.getElementById('regularidad').value
    let _fechainicio= document.getElementById('fechainicio').value
    let _fechafin= document.getElementById('fechafin').value

    validaciones(_idservicios,_regularidad);
  
    if(
            _idservicios.length>0&&
            _regularidad.length>0&&
            _fechainicio.length>0&&
            _fechafin.length>0
     ) {

            let suscripciones = {
                idservicios: _idservicios,
                regularidad:_regularidad,
                fechainicio: _fechainicio, 
                fechafin:_fechafin,
                
        };
        try{
            const response= await fetch(url, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(suscripciones), // convertir el usuario a un json
                headers: {"Content-type":"application/json; charset=UTF-8"}
        });
        if (response.ok){
            const data = await response.json();
            if(data.msg ==='Error el dato ya existe en la base de datos'){
                Swal.fire(data.msg, '' , 'error');
            }else{
                Swal.fire(data.msg, 'registrado' , 'registrado');
                setTimeout(() => {
                    window.location.href = "listarsuscripciones.html";
    
                } , 3000);
            }
        } else{
            throw new Error( 'Error al enviar la solicitud ');
        }
    }catch (error){
        Swal.fire('error al registrar la suscripcion', '', 'error');
    }
        }else{
            mostrarmensajesdevalidacion(_idservicios, _regularidad, _fechainicio, _fechafin)
        }
};
      


const mostrarmensajesdevalidacion =(_idservicios, _regularidad, _fechainicio, _fechafin) =>{

        let mensajesvalidacion= [];
        if(_idservicios.length < 5){
            mensajesvalidacion.push('ingrese id de servicio minimo 5 caracteres');
        }
        if(_regularidad.length  === 0){
            mensajesvalidacion.push('Ingrese la regularidad ');
        }
        if(_fechainicio.length ===0){
            mensajesvalidacion.push('ingrese la fecha de inicio');
        }
        if(_fechafin.length === 0){
            mensajesvalidacion.push('ingrese la fecha de fin');
        }
        if(mensajesvalidacion.length>0 ){
            Swal.fire({
                tittle: 'verifique los datos ingresados en los campos',
                html: mensajesvalidacion.join('<br>'),
                icon: 'error'
            })
        }
    
    
    };
        
const editar= (suscripciones)=>{
    document.getElementById('idservicios').value = ''
    document.getElementById('regularidad').value = ''
    document.getElementById('fechainicio').value = ''
    document.getElementById('fechafin').value = ''

    document.getElementById('idservicios').value = suscripciones.idservicios
    document.getElementById('regularidad').value = suscripciones.regularidad
    document.getElementById('fechainicio').value = suscripciones.fechainicio
    document.getElementById('fechafin').value = suscripciones.fechafin
}

const actualizar = async()=>{
    let _idservicios = document.getElementById('idservicios').value
    let _regularidad = document.getElementById('regularidad').value
    let _fechainicio = document.getElementById('fechainicio').value
    let _fechafin = document.getElementById('fechafin').value
     
    
    if(
        _idservicios.length>0&&
        _regularidad.length>0&&
        _fechainicio.length>0&&
        _fechafin.length>0
    ) {

        let suscripciones = {
            idservicios: _idservicios,
            regularidad:_regularidad,
            fechainicio: _fechainicio, 
            fechafin:_fechafin,
            
    };
    try{
        const response= awaitfetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(suscripciones), // convertir el usuario a un json
            headers: {"Content-type":"application/json; charset=UTF-8"}
    });
    if (response.ok){
        const data = await response.json();
        if(data.msg ==='Error el dato ya existe en la base de datos'){
            Swal.fire(data.msg, '' , 'error');
        }else{
            Swal.fire(data.msg, 'registrado' , 'registrado');
            setTimeout(() => {
                window.location.href = "listarsuscripciones.html";

            } , 3000);
        }
    } else{
        throw new Error( 'Error al enviar la solicitud ');
    }
}catch (error){
    Swal.fire('error al registrar el rol', '', 'error');
}
    }else{
        mostrarmensajesdevalidacion2(_idservicios, _regularidad, _fechainicio, _fechafin)
    }
};

const mostrarmensajesdevalidacion2 =(_idservicios, _regularidad, _fechainicio, _fechafin) =>{

    let mensajesvalidacion= [];
    if(_idservicios.length < 5){
        mensajesvalidacion.push('ingrese id de servicio minimo 5 caracteres');
    }
    if(_regularidad.length  === 0){
        mensajesvalidacion.push('Ingrese la regularidad ');
    }
    if(_fechainicio.length ===0){
        mensajesvalidacion.push('ingrese la fecha de inicio');
    }
    if(_fechafin.length === 0){
        mensajesvalidacion.push('ingrese la fecha de fin');
    }
    if(mensajesvalidacion.length>0 ){
        Swal.fire({
            tittle: 'verifique los datos ingresados en los campos',
            html: mensajesvalidacion.join('<br>'),
            icon: 'error'
        })
    }


};
  

    
const eliminar = (id) =>{
        if(confirm('¿Está seguro de realizar la eliminación') == true){
    
               let suscripciones = {
                    _id: id
                }
               fetch(url,  {
                    method: 'DELETE',
                    mode: 'cors',
                    body: JSON.stringify(suscripciones),//Convertir el objeto _usuario  a un JSON
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
                .then(json => {
                    alert(json.msg)//Mensaje que retorna la API
                }) 
        }
    }

if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click',registrar)
}

if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
.addEventListener('click',actualizar)
}




