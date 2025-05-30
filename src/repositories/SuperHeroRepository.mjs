
//Repositorio centralizado que implementa los métodos definidos en la interfáz,
//realizando operaciones de datos uniformes y controladas con MongoDB

import { set } from 'mongoose';
import superHero from '../models/SuperHero.mjs';
import IRepository from '../repositories/IRepository.mjs';

/*const nuevoSuperHeroe = {
    nombreSuperHeroe: "Black Widow",
    nombreReal: "Natasha Romanoff",
    edad: 33,
    planetaOrigen: "Tierra",
    debilidad: "Ninguna conocida",
    poderes: ["Maestría en combate2", "Espionaje2"],
    aliados: "Hawkeye",
    enemigos: "Taskmaster",
    creador: "Enzocreador2",
};*/

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {;  //Funciona
        return await superHero.findById(id)
    }

    async obtenerTodos() {  //Funciona
        return await superHero.find();
    }

    async agregarNuevoSuperHeroeEnzo(agregarNuevoSP) {
        const {nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador, createdAt} = agregarNuevoSP;
        const newSuperHeroe = new superHero({
            nombreSuperHeroe, 
            nombreReal, 
            edad, 
            planetaOrigen, 
            debilidad, 
            poderes, 
            aliados, 
            enemigos, 
            creador, 
            createdAt
        });
        
        const guardarSuperHeroe = await newSuperHeroe.save();
        return guardarSuperHeroe;
    };
    
    async updateRepository (nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador){
        //const {nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador, createdAt} = updateSP;
        //console.log('Traigo SP en Repository', updateSP);
        const updateSuperHeroe = new superHero({
            nombreSuperHeroe, 
            nombreReal, 
            edad, 
            planetaOrigen, 
            debilidad, 
            poderes, 
            aliados, 
            enemigos, 
            creador, 
            createdAt
        });
        console.log('Ver Modificar Heroe', updateSuperHeroe);
        const modificarSuperHeroe = await updateSuperHeroe.updateOne();
        console.log('Ver Modificar Heroe2', updateSuperHeroe);
        return modificarSuperHeroe;
    };
    
    async updateRepository1SuperHereo(id, datosActualizados) {
        const updateSuperHeroe = await superHero.findByIdAndUpdate(
          id,
          datosActualizados,
          { new: true }
        );
        console.log('Ver Update Super Heroe', updateSuperHeroe);
        return updateSuperHeroe;
      }

    async updateRepositorySuperHereo(id, nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador) {
        console.log('Traer el superheroe Repository', nombreSuperHeroe);
        const updateSuperHeroe = await superHero.findByIdAndUpdate(id, nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos, creador, {new:true});
        console('Ver Update Super Heroe', updateSuperHeroe);
        if (!updateSuperHeroe) return res.status(404).json({ message: "Superhero no found" });
        return updateSuperHeroe;   
    }

    async modificarSuperHeroeporEdad (id, atributo, valor){
        return await superHero.updateOne(
            { _id: id},
            { $set : { [atributo]: valor}}
        );       
    }

    async eliminarPorId(id) {
        console.log('ver el Repository id', id);
        return await superHero.findByIdAndDelete(id);
    }

    async eliminarPorNombre(nombre) {
        const eliminarSuperHeroeNombre = await superHero.findOneAndDelete({ nombreSuperHeroe: nombre });
        if (!eliminarSuperHeroeNombre) return res.status(404).json({ message: "Super Hereo no encontrado" });
        //console.log('Capa de Repository',nombredelSuperHeroe);
        return eliminarSuperHeroeNombre;
    }

    async eliminarSuperHeroeNombre(nombre) 
    {
        const eliminarSuperHeroeNombre2 = await superHero.findOneAndDelete({ nombreSuperHeroe: nombre });
        if (!eliminarSuperHeroeNombre2) return res.status(404).json({ message: "Super Hereo no encontrado" });
        //console.log('Capa de Repository',nombredelSuperHeroe);
        return eliminarSuperHeroeNombre2;
    }
    async buscarPorAtributo(atributo, valor) {
        return await superHero.find({
            [ atributo ]: valor
        });
    }

    async obtenerMayoresDe30() {
        return await superHero.find({
            edad: { $gt: 30 },
            planetaOrigen: "Tierra",
            poderes: { $exists: true, $not: { $size: 1 } }
        });
    }
};

export default new SuperHeroRepository();