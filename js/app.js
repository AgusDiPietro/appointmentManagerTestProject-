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

    imprimirCitas({citas}){

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
               <span class= "font-weight-bolder">Propietario: </span> $(propietario)
            `;
            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
               <span class= "font-weight-bolder">Telefono: </span> $(telefono)
            `;
            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
               <span class= "font-weight-bolder">Fecha: </span> $(fecha)
            `;
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
               <span class= "font-weight-bolder">Hora: </span> $(hora)
            `;
            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
               <span class= "font-weight-bolder">Sintomas: </span> $(sintomas)
            `;

            // Agregar los parrafos al DivCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);

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

    //Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);
}

function reniciarObjeto(){
    citaObj.mascota= '';
    citaObj.propietario= '';
    citaObj.telefono= '';
    citaObj.fecha= '';
    citaObj.hora= '';
    citaObj.sintomas= '';
}