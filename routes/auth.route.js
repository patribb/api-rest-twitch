import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
const router = new Router();

//~ regsiter
router.post('/register', [
    body('email', 'El formato de email es incorrecto.').trim().isEmail().normalizeEmail(),
    body('password', 'La contraseña debe tener min. 6 caracteres.').trim().isLength({ min: 6 }),
], validationResultExpress, register);

//~ login
router.post('/login', [
    body('email', 'El formato de email es incorrecto.').trim().isEmail().normalizeEmail(),
    body('password', 'La contraseña debe tener min. 6 caracteres.').trim().isLength({ min: 6 }),
], validationResultExpress, login);

export default router;