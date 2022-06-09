import Citas from './Clases/citas.js';
import UI from './Clases/ui.js';

import {
    mascotaInput,
     propietarioInput,
     telefonoInput, 
     fechaInput,
     horaInput, 
     sintomasInput, 
     formulario} from './selectores.js';

// las instanciamos globalmente
const ui = new UI ();
const administrarCitas = new Citas();

//modo edicion
let editando= false;


//objeto con info de la Cita
const citaObj = {
    mascota:'',
    propietario:'',
    telefono:'',
    fecha:'',
    hora:'',
    sintomas:''
    //para utilizarlo de esta manera, nos aseguramos que en el index esté definido el name = mascota/proprietario/telefono..
};

//Agrega datos al objeto de Cita.
export function datosCita(e){
    //Accedemos a las propiedades del objeto
    citaObj[e.target.name] = e.target.value
};


//Valida y agrega una nueva Cita a la class de citas
export function nuevaCita(e){
    e.preventDefault();

    //Extraer informacion del objeto de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    //validar
    if(mascota === '' || propietario=== '' || telefono=== ''|| fecha=== ''|| hora=== '' || sintomas=== ''){
        ui.imprimirAlerta("Todos los campos son obligatorios","error");
        
        return;
    }

    if(editando) {
        //Pasar el objeto de cita a edicion
        administrarCitas.editarCita({...citaObj});

        ui.imprimirAlerta("Editado correctamente");

        //devolver texto al boton
        formulario.querySelector('button[type="submit"]').textContent = "Crear cita";

        //quitar modo edicion
        editando= false;
    }
    else{
        // Generar ID unico para cada cita
       citaObj.id = Date.now();

      //Creando una nueva cita
      administrarCitas.agrgarCita({...citaObj});

      //Mensaje que se agrego correctamente
      ui.imprimirAlerta("Se agrego correctamente");
    }

    //Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);

    // Reiniciamos el obj
    reniciarObjeto(); 

    //reniciar formulario despues de mandar una cita
    formulario.reset();

};

export function reniciarObjeto(){
    citaObj.mascota= '';
    citaObj.propietario= '';
    citaObj.telefono= '';
    citaObj.fecha= '';
    citaObj.hora= '';
    citaObj.sintomas= '';
};

export function eliminarCita(id){
    //Eliminar la cita
    administrarCitas.eliminarCita(id);

    //Muestre mensaje
    ui.imprimirAlerta("La cita fue eliminada");

    //Refresque las citas
    ui.imprimirCitas(administrarCitas);

};

//carga los datos y el modo edicion
export function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas,id} = cita;

    // Reiniciar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Llenar los Inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //cambiar texto btn
    formulario.querySelector('button[type="submit"]').textContent = "Guardar cambios";

    editando= true;

};

