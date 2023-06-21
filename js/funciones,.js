

const url = 'https://api-proyecto-s544.onrender.com/api/roles'
const listarRoles = async() => {
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
        let listarRoles = data.roles //Capturar el array devuelto por la api
        datos = 
        listarRoles.map(function(roles) {//Recorrer el array
            respuesta += `<tr><td>${roles.nombrerol}</td>`+
            `<td>${roles.idusuario}</td>`+
            `<td>${roles.permisosrol}</td>`+
            `<td>${roles.estadorol}</td>`+
            `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(roles)})' >Editar</a> 
            <a class="waves-effect waves-light btn modal-danger deep-orange darken-4" href='#' onclick='eliminar("${roles._id}")'>Eliminar</a></td>`+
            `</tr>`
            body.innerHTML = respuesta
        })
    })
}

const validaciones =(_nombrerol,_idusuario,_permisosrol) =>{
    const regxNumeros = /^[0-9]+$/;
    const regxLetras = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;

    if (regxNumeros.test(_idusuario) && regxLetras.test(_nombrerol) && regxLetras.test(_permisosrol)) {
        flag = true;
      }
}
    

const registrar = async()=> {
    let _nombrerol= document.getElementById('nombrerol').value
    let _idusuario= document.getElementById('idusuario').value
    let _permisosrol= document.getElementById('permisosrol').value
    let _estadorol= document.getElementById('estadorol').value
  
    validaciones(_nombrerol,_idusuario,_permisosrol);

    if(
        _nombrerol.length>0 &&
        _idusuario.length>0 &&
        _permisosrol.length>0 &&
        _estadorol.length>0
    ){
        let roles = {
        nombrerol: _nombrerol,
        idusuario:_idusuario,
        permisosrol: _permisosrol, 
        estadorol:_estadorol,
        
    };
    try{
    const response= await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(roles), // convertir el usuario a un json
        headers: {"Content-type":"application/json; charset=UTF-8"} 
    });
    if (response.ok){
    const data = await response.json();
    if(data.msg ==='Error el dato ya existe en la base de datos'){
        Swal.fire(data.msg, '' , 'error');
    }else{
        Swal.fire(data.msg, 'registrado' , 'registrado');
        setTimeout(() => {
            window.location.href = "listarRoles.html";

        } , 3000);
    }
    } else{
        throw new Error( 'Error al enviar la solicitud ');
    }
    }catch (error){
    Swal.fire('error al registrar el rol', '', 'error');
    }
    }else{
        mostrarmensajesdevalidacion(_nombrerol, _idusuario, _permisosrol, _estadorol)
    }
};
  

const mostrarmensajesdevalidacion =(_nombrerol, _idusuario, _permisosrol, _estadorol) =>{

    let mensajesvalidacion= [];
    if(_nombrerol.length === 0){
        mensajesvalidacion.push('ingrese un nombre de rol');
    }
    if(_idusuario.length  <5){
        mensajesvalidacion.push('Ingrese id de usuario con mas de 5 caracteres');
    }
    if(_permisosrol.length <5){
        mensajesvalidacion.push('ingrese por favor los permisos del rol minimo 5 caracteres');
    }
    if(_estadorol.length === 0){
        mensajesvalidacion.push('escoja un estado');
    }
    if(mensajesvalidacion.length>0 ){
        Swal.fire({
            tittle: 'verifique los datos ingresados en los campos',
            html: mensajesvalidacion.join('<br>'),
            icon: 'error'
        })
    }


};
    


    


    
    


const editar= (roles)=>{
    document.getElementById('nombrerol').value = ''
    document.getElementById('idusuario').value = ''
    document.getElementById('permisosrol').value = ''
    document.getElementById('estadorol').value = ''

    document.getElementById('nombrerol').value = roles.nombrerol
    document.getElementById('idusuario').value = roles.idusuario
    document.getElementById('permisosrol').value = roles.permisosrol
    document.getElementById('estadorol').value = roles.estadorol
}

const actualizar = async()=>{
    let _nombrerol = document.getElementById('nombrerol').value
    let _idusuario = document.getElementById('idusuario').value
    let _permisosrol = document.getElementById('permisosrol').value
    let _estadorol = document.getElementById('estadorol').value
    if(
        _nombrerol.length>0 &&
        _idusuario.length>0 &&
        _permisosrol.length>0 &&
        _estadorol.length>0
    ){
        let roles = {
        nombrerol: _nombrerol,
        idusuario:_idusuario,
        permisosrol: _permisosrol, 
        estadorol:_estadorol,
        
    };
    try{
        const response = await fetch(url, {
            method:'PUT',
            mode:'cors',
            body: JSON.stringify(roles), // convertir el usuario a un json
            headers: {"Content-type":"application/json; charset=UTF-8"}
    });


    if (response.ok){
        const data = await response.json();
        if(data.msg ==='Error el dato ya existe en la base de datos'){
            Swal.fire(data.msg, '' , 'error');
        }else{
            Swal.fire(data.msg, '' , 'success');
            setTimeout(() => {
                window.location.href = "listarRoles.html";

            } ,2000);
        }
    } else{
        throw new Error( 'Error al enviar la solicitud ');
    }
}catch (error){
    Swal.fire('error al actualizar el rol', '', 'error');
}
    }else{
        mostrarmensajesdevalidacion2(_nombrerol, _idusuario, _permisosrol, _estadorol)
    }
};


const mostrarmensajesdevalidacion2 =(_nombrerol, _idusuario, _permisosrol, _estadorol) =>{

    let mensajesvalidacion= [];
    if(_nombrerol.length === 0){
        mensajesvalidacion.push('ingrese un nombre de rol');
    }
    if(_idusuario.length < 5){
        mensajesvalidacion.push('Ingrese id de usuario de mas de 5 caracteres');
    }
    if(_permisosrol.length >5){
        mensajesvalidacion.push('ingrese por favor los permisos del rol minimo 5 caracteres');
    }
    if(_estadorol.length === 0){
        mensajesvalidacion.push('escoja un estado');
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

           let roles = {
                _id: id
            }
           fetch(url,  {
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(roles),//Convertir el objeto _usuario  a un JSON
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
            .then(json => {
                Swal.fire(
                    json.msg,
                    'se elimino correctamente',
                    'succes'
                )
                setTimeout(() => {
                    window.location.href = "listarRoles.html"
           }, 5000);//Mensaje que retorna la API
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





