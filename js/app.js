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
   agrgarCita(cita) {
       this.citas = [...this.citas, cita];

       console.log(this.citas);
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
    mascotaInput.addEventListener('input', datosCita);
    propietariooInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

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

    // Generar ID unico para cada cita
    citaObj.id = Date.now();

    //Creando una nueva cita
    administrarCitas.agrgarCita({...citaObj});

    // Reiniciamos el obj
    reniciarObjeto(); 
    
    //reniciar formulario despues de mandar una cita
    formulario.reset();

}

function reniciarObjeto(){
    citaObj.mascota= '';
    citaObj.propietario= '';
    citaObj.telefono= '';
    citaObj.fecha= '';
    citaObj.hora= '';
    citaObj.sintomas= '';
}