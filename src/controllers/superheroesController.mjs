//Implementa el controlador para gestionar solicitudes HTTP, llamando a services
//Y utilizando las vistas para presentar los datos

import {
    obtenerSuperheroePorId,
    obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo,
    obtenerSuperheroesMayoresDe30,
    agregarNuevoSuperHeroe, modificarSuperHeroeporEdad,
    eliminarSuperHereoPorId,
    eliminarSuperHeroeNombre
} from '../services/superheroesService.mjs';

import {
    renderizarSuperheroe,
    renderizarListaSuperheroes,
    renderizarMensaje} from '../views/responseView.mjs';

    
export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const {id} = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superheroe no encontrado' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe',
            error: error.message });
    }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.render('superHeroesDelMundo/listarTodoslosSHDelMundo', { superheroesFormateados });
        //res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes',
            error: error.message });
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const {atributo, valor} = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron superhéroes con ese atributo' });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes',
            error: error.message });
    }
}


export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if (superheroes.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontraron superhéroes mayores de 30 años' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send(
            { mensaje: 'Error al obtener superhéroes mayores de 30 años',
            error: error.message });
    }
}

export async function agregarSuperHeroesController(req, res) {
    try {
        const agregarNuevoSP = req.body;
        const superheroeCreado = await agregarNuevoSuperHeroe(agregarNuevoSP);
        console.log(superheroeCreado);
        if (superheroeCreado.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se creo el Super Heroe' });
        }
        //console.log('vererror');        
        const superheroesFormateado = renderizarSuperheroe(superheroeCreado);
        //const mostrarSuperHeroeFormateado = await obtenerSuperheroePorId(id);     
        res.status(200).json({
            mensaje: "Super Héroe creado con éxito",
            superheroe: superheroesFormateado}
            );
        //res.status(200).json(renderizarMensaje("Super Heroe creado con exito"));
        //res.json(renderizarMensaje("Super Heroe creado con exito"));
    } catch (error) {
        res.status(500).send(
            { mensaje: 'Error al crear Super Heroe',
            error: error.message });
    }
}

export async function modificarSuperHeroesporIdController(req, res) {
    try {
        const {id, atributo, valor} = req.params;
        const superheroe = await modificarSuperHeroeporEdad(id, atributo, valor);
        console.log('Actualizado:', superheroe);
        if (superheroe.length === 0) {
            return res.status(404).send(
                { mensaje: 'No se encontro el SuperHeroes con esa atributo o valor' });
        }
         //console.log('vererror');        
         
         const superheroesFormateado = renderizarSuperheroe(superheroe);
         //console.log(superheroesFormateado);
         const mostrarSuperHeroeFormateado = await obtenerSuperheroePorId(id);
        console.log('que paso', mostrarSuperHeroeFormateado);   
         res.status(200).json({
             mensaje: "Super Héroe Modificado Exitosamente",
             superheroe: mostrarSuperHeroeFormateado}
             );
        //const superheroesFormateados = renderizarSuperheroe(superheroe);
        //res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send(
            { mensaje: 'Error al modificar el Super Heroe',
            error: error.message });
    }
}

export async function eliminarSuperheroePorIdController(req, res) {
    try {
        const {id} = req.params;
        console.log('cual es el ID:', id);
        const superheroe = await eliminarSuperHereoPorId(id);
        console.log(superheroe);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superheroe no encontrado' });
        } 
         res.status(200).json({
             mensaje: "Super Héroe Eliminado Exitosamente",
            }
             );
        //const superheroeFormateado = renderizarSuperheroe(superheroe);
        //res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al encontrar el ID el superhéroe',
            error: error.message });
    }
}

export async function eliminarSuperheroePorNombreController(req, res) {
    try {
        const { nombre } = req.params;
        console.log('cual es el Nombre:', nombre);
        const superheroe = await eliminarSuperHeroeNombre(nombre);
        console.log('que me trae', superheroe);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superheroe no encontrado' });
        } 
        const superheroeFormateado = renderizarSuperheroe(superheroe);
        //res.status(200).json(superheroeFormateado);
        res.status(200).json({
            mensaje: "Super Héroe Eliminado con éxito",
            superheroe: superheroeFormateado}
            );
        /*res.status(200).json({
             mensaje: "Super Héroe Eliminado Exitosamente",
            }
             );*/
        
    } catch (error) {
        res.status(500)
        .send({ mensaje: 'Error al encontrar el Nombre el superhéroe',
            error: error.message });
    }
}