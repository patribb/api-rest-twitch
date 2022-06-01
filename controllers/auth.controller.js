import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';

//~ register user
export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    //~ Alternativa buscando por email
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };

    //~ Crear el usuario en la bd
    user = new User({ email, password });
    await user.save();

    //~ Generar el token con jwt

    return res.status(201).json({ ok: true });
  } catch (error) {
    console.log(error);
    //~ Alternativa por defecto mongoose
    if (error.code === 11000) {
      return res.status(400).json({ error: 'El usuario ya existe.' })
    }
    return res.status(500).json({ error: 'Upsss, algo salió mal en el servidor.' })
  }
};

//~ login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: 'El usuario no existe' });

    //~ Comprobar que coincide la contraseña
    const respuestaPassword = await user.comparePassword(password)
    if (!respuestaPassword) return res.status(403).json({ error: 'Las credenciales no son correctas.' });

    //~ Generar el token con jwt
    const token = jwt.sign({uid: user.id}, process.env.JWT_SECRET);

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Upsss, algo salió mal en el servidor.' })
  }
};
