import { body } from  'express-validator';

export const sHeroesValidationRules = () => [
    body("nombreSuperHeroe")
    .trim()
    .notEmpty()
    .withMessage("El nombre del Super Heroe no debe dejar en blanco")
    .isLength( {min: 3, max: 60} )
    .withMessage("El nombre del Super debe contener al menos 3 caracteres"),
    body("nombreReal")
    .trim()  
    .notEmpty()
    .withMessage("Nombre Real es obligatorio.")
    .isLength({ min: 3, max: 60 })
    .withMessage("Nombre real debe tener entre 3 y 60 caracteres"),
    body("edad")
    .trim()
    .notEmpty()
    .withMessage("Edad es obligatoria.")
    .isInt({ min: 1, max: 150 })
    .withMessage("La edad debe ser mayor a cero"),
    /*body("poderes")
    .notEmpty()
    .withMessage("Lista de poderes es obligatoria.")
    .isArray({ min: 1 })
    .withMessage("Debe tener al menos un poder")
    .isString()
    .withMessage("Cada poder debe ser una cadena de texto")
    .isLength({ min: 3, max: 60 })
    .withMessage("Cada poder debe tener entre 3 y 60 caracteres"),*/
    /*body('poderes')
    .optional()
    .exists().withMessage(`El vector es obligatorio.`)
    .isArray().withMessage(`Debe ser un vector.`)
    .custom((value) => {
        if (!value.every(i => typeof i === 'string')) {
            throw new Error(`Todos los elementos del vector. deben ser cadenas de texto.`)
        } return true;
    }),*/

    /*body("poderes")
    .notEmpty()
    .withMessage("Lista de poderes es obligatoria.")
    .isArray({ min: 1 })
    .withMessage("Debe tener al menos un poder")*/
    /*.custom((poderes) => {
        if (!Array.isArray(poderes)) {
            throw new Error("Los poderes deben ser un array de strings.");
        }
        poderes.forEach((poder) => {
            if (typeof poder !== "string") {
                throw new Error("Cada poder debe ser una cadena de texto.");
            }
            if (poder.trim().length < 3 || poder.trim().length > 60) {
                throw new Error("Cada poder debe tener entre 3 y 60 caracteres.");
            }
            if (poder.trim() !== poder) {
                throw new Error("Cada poder no debe contener espacios al inicio o al final.");
            }
        });
        return true;
    })*/
        body("poderes")
        .notEmpty()
        .withMessage("La lista de poderes es obligatoria.")
        .custom((poderes) => {
            if (!Array.isArray(poderes)) {
                throw new Error("Los poderes deben ser un array de strings.");
            }
            if (poderes.length < 2) {
                throw new Error("Debe ingresar al menos dos poderes.");
            }
            poderes.forEach((poder) => {
                if (typeof poder !== "string") {
                    throw new Error("Cada poder debe ser una cadena de texto.");
                }
                if (poder.trim().length < 3 || poder.trim().length > 60) {
                    throw new Error("Cada poder debe tener entre 3 y 60 caracteres.");
                }
                if (poder.trim() !== poder) {
                    throw new Error("Cada poder no debe contener espacios al inicio o al final.");
                }
            });
            return true;
        })
]