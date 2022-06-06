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

class Citas {
   constructor() {
       this.citas = [];
   }

};

class UI {
    imprimirAlerta(mensaje,tipo) {
        //Crear div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert','d-block','col-12');

        //Agregar clase en base al tipo de error
        if(tipo==='error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        //Mensaje de error
        divMensaje.textContent = mensaje;

        //Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //Quitar la alerta dso de 2 seg
        setTimeout(() => {
            divMensaje.remove();
        }, 2000);
    }
};

// las instanciamos globalmente
const ui = new UI ();
const administrarCitas = new Citas();

// Registrar eventos
eventListener();
function eventListener(){
    mascotaInput.addEventListener('change', datosCita);
    propietariooInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);

    formulario.addEventListener('submit',nuevaCita);
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

//Valida y agrega una nueva Cita a la class de citas
function nuevaCita(e){
    e.preventDefault();

    //Extraer informacion del objeto de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    //validar
    if(mascota === '' || propietario=== '' || telefono=== ''|| fecha=== ''|| hora=== '' || sintomas=== ''){
        ui.imprimirAlerta("Todos los campos son obligatorios","error");
        
        return;
    }
}