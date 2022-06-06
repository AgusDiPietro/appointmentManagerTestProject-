//Inputs
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');


// User interface
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

//modo edicion
let editando= false;

// Registrar eventos
eventListener();
function eventListener(){
    mascotaInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
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
}

class Citas {
   constructor() {
       this.citas = [];
   }
   agrgarCita(cita) {
       this.citas = [...this.citas, cita];
   }
   editarCita(citaActualizada){
    this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita );
    //map percorre el arreglo, y crea un nuevo arreglo que se asigna a citas. (en caso de que cita.id = citaActualizada.id, asigna cita actualziada a ese id : caso contario dejamos la cita actual);
   }
  
   eliminarCita(id) {
       this.citas = this.citas.filter(cita => cita.id !== id); 
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

    imprimirCitas({citas}){// Se puede aplicar   destructuring desde la función...

        this.limpiarHTML();
        
        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
               <span class= "font-weight-bolder">Propietario: </span> ${propietario}
            `;
            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
               <span class= "font-weight-bolder">Telefono: </span> ${telefono}
            `;
            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
               <span class= "font-weight-bolder">Fecha: </span> ${fecha}
            `;
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
               <span class= "font-weight-bolder">Hora: </span> ${hora}
            `;
            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
               <span class= "font-weight-bolder">Sintomas: </span> ${sintomas}
            `;

            //boton para eliminar cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'; 

            btnEliminar.onclick = () => eliminarCita(id);

            //Añadimos boton para editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>';

            btnEditar.onclick = () => cargarEdicion(cita);

            // Agregar los parrafos al DivCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            //Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);
        })
    }
    //limpiar HTML para que no haya dos veces la misma cita
    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
};

// las instanciamos globalmente
const ui = new UI ();
const administrarCitas = new Citas();



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

function reniciarObjeto(){
    citaObj.mascota= '';
    citaObj.propietario= '';
    citaObj.telefono= '';
    citaObj.fecha= '';
    citaObj.hora= '';
    citaObj.sintomas= '';
};

function eliminarCita(id){
    //Eliminar la cita
    administrarCitas.eliminarCita(id);

    //Muestre mensaje
    ui.imprimirAlerta("La cita fue eliminada");

    //Refresque las citas
    ui.imprimirCitas(administrarCitas);

};

//carga los datos y el modo edicion
function cargarEdicion(cita){
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

}
