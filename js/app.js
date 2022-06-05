//Inputs
const mascotaInput = document.querySelector('#mascota');
const propietariooInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');


// User interface
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

// Registrar eventos
eventListener();
function eventListener(){
    mascotaInput.addEventListener('change', datosCita);
    propietariooInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);
}

//objeto con info de la Cita
const citaObj = {
    mascota:'',
    propietario:'',
    telefono:'',
    fecha:'',
    hora:'',
    sintomas:''
    //para utilizarlo de esta manera, nos aseguramos que en el index esté definido el name = mascota/proprietario/telefono..
}

//Agrega datos al objeto de Cita.
function datosCita(e){
    //Accedemos a las propiedades del objeto
    citaObj[e.target.name] = e.target.value

    console.log(citaObj);

}