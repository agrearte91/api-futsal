import Persona from '../models/Persona';

class PersonaService {  
    static async agregarPersona(nuevaPersona) {
      try {
        return await Persona.create(nuevaPersona);
      } catch (error) {
        throw error;
      }
    }

    static async agregarPersonas(nuevasPersonas){
      try{
        return  await Persona.bulkCreate(nuevasPersonas,{returning:true});
      } catch (error) { 
        throw new Error (error.parent.detail); //el objeto que provocó el error. No se inserta ningún objeto.
      }
  }

    static async obtenerPersonas(){
      try {
        return await Persona.findAll();
      } 
      catch (error) {
        throw error;   
      }
    }

    static async obtenerPersona(dni){
      try {
        const persona = await Persona.findByPk(dni);
        return persona;
      }
       catch (error) {
         throw error;
        }
      }
    
    static async actualizarPersona(dni,persona){
      try {
        const personaExistente = await Persona.findByPk(dni);

        if(personaExistente){
          await Persona.update(persona,{where:{dni:dni}});
          return persona; 
        }
        else{
          return null;
        }
      }
       catch (error) {
         throw error;
        }
      }
      
    static async eliminarPersona(dni){
      try {
        const personaExistente = await Persona.findByPk(dni);

        if(personaExistente){
          const personaEliminada = await Persona.destroy({where:{dni:dni}});
          return personaEliminada; 
        }
        else{
          return null;
        }
      }
      catch (error) {
        throw error;
      }
    }
} 
  
  export default PersonaService;

