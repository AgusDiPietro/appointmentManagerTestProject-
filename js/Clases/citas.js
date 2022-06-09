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

 export default Citas;