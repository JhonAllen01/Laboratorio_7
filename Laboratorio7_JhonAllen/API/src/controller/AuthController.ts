import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Usuarios } from '../entity/Usuario';
import * as jwt from 'jsonwebtoken';

class AuthController {
  static login = async (req: Request, resp: Response) => {
    const { correo, contrasena } = req.body;

    if (!(correo || contrasena)) {
      return resp
        .status(400)
        .json({ mensaje: 'Error con el usuario o contraseña' });
    }

    const repoUsuario = AppDataSource.getRepository(Usuarios);
    let usuario: Usuarios;
    try {
      usuario = await repoUsuario.findOneOrFail({ where: { correo: correo } });
    } catch (error) {
      return resp
        .status(400)
        .json({ mensaje: 'Error con el usuario o contraseña' });
    }

    if (!usuario.checkPassword(contrasena)) {
      return resp
        .status(400)
        .json({ mensaje: 'Error con el usuario o contraseña' });
    }

    const token = jwt.sign({ cedula: usuario.cedula }, 'utnKey1234', {
      expiresIn: '5m',
    });

    return resp.status(200).json({
      token,
      role: usuario.rol,
      cedula: usuario.cedula,
    });
  };
}
export default AuthController;
