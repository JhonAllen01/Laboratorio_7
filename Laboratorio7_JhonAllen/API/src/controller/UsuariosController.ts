import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Usuarios } from '../entity/Usuario';
import { validate } from 'class-validator';
import { errorMonitor } from 'events';

class UsuariosController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const repoUsuario = AppDataSource.getRepository(Usuarios);
      const listaUsuario = await repoUsuario.find({ where: { estado: true } });

      if (listaUsuario.length == 0) {
        return resp
          .status(404)
          .json({ mensaje: 'No hay usuarios en la base de datos' });
      }
      return resp.status(200).json(listaUsuario);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const cedula = parseInt(req.params['cedula']);
      if (!cedula) {
        return resp
          .status(404)
          .json({ mensaje: 'Debe ingresar el numero de cedula' });
      }
      const repoUsuario = AppDataSource.getRepository(Usuarios);
      let usuario;
      try {
        usuario = await repoUsuario.findOneOrFail({
          where: { cedula, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: 'No hay usuario con ese numero de cedula' });
      }
      return resp.status(200).json(usuario);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      const { cedula, nombre, apellido1, apellido2, correo, rol, contrasena } =
        req.body;

      // typescript
      const fecha = new Date();

      let usuario = new Usuarios();
      usuario.cedula = cedula;
      usuario.nombre = nombre;
      usuario.apellido1 = apellido1;
      usuario.apellido2 = apellido2;
      usuario.fecha_ingreso = fecha;
      usuario.correo = correo;
      usuario.contrasena = contrasena;
      usuario.rol = rol;
      usuario.estado = true;

      const validateOpt = { validationError: { target: false, value: false } };
      const errores = await validate(usuario, validateOpt);

      if (errores.length != 0) {
        return resp.status(400).json(errores);
      }

      const repoUsuario = AppDataSource.getRepository(Usuarios);
      let usuarioExist = await repoUsuario.findOne({
        where: { cedula: cedula },
      });
      if (usuarioExist) {
        resp.status(400).json({ mensaje: 'Ya existe un usuario con ese id' });
      }

      usuarioExist = await repoUsuario.findOne({ where: { correo: correo } });
      if (usuarioExist) {
        resp
          .status(400)
          .json({ mensaje: 'Ya existe un usuario con ese correo' });
      }
      try {
        await repoUsuario.save(usuario);
        return resp
          .status(201)
          .json({ mensaje: 'Usuario registrado correctamente' });
      } catch (error) {
        resp.status(400).json(error);
      }
    } catch (error) {
      resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    const {
      cedula,
      nombre,
      apellido1,
      apellido2,
      fecha_ingreso,
      correo,
      rol,
      contrasena,
      estado,
    } = req.body;

    //validacion de reglas de negocio
    const repoUsuario = AppDataSource.getRepository(Usuarios);
    let usu: Usuarios;
    try {
      usu = await repoUsuario.findOneOrFail({ where: { cedula } });
    } catch (error) {
      return resp
        .status(404)
        .json({ mensaje: 'No existe un usuario con ese numero de cedula' });
    }

    usu.nombre = nombre;
    usu.apellido1 = apellido1;
    usu.apellido2 = apellido2;
    usu.correo = correo;
    usu.rol = rol;
    usu.contrasena = contrasena;

    const errors = await validate(usu, {
      validationError: { target: false, value: false },
    });

    if (errors.length > 0) {
      return resp.status(400).json(errors);
    }

    try {
      await repoUsuario.save(usu);
      return resp
        .status(200)
        .json({ mensaje: 'El usuario fue ingresado correctamente' });
    } catch (error) {
      return resp
        .status(400)
        .json({ mensaje: 'El usuario no fue ingresado correctamente' });
    }
  };

  static delete = async (req: Request, resp: Response) => {
    try {
      const cedula = parseInt(req.params['cedula']);
      if (!cedula) {
        return resp.status(404).json({ mensaje: 'Debe indicar el id' });
      }
      const repoUsuario = AppDataSource.getRepository(Usuarios);
      let usu: Usuarios;
      try {
        usu = await repoUsuario.findOneOrFail({
          where: { cedula, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: 'No existe un usuario con ese numero de cedula' });
      }
      usu.estado = false;
      try {
        await repoUsuario.save(usu);
        return resp
          .status(200)
          .json({ mensaje: 'El usuario ha sido eliminado correctamente' });
      } catch (error) {
        return resp.status(400).json({
          mensaje: 'El usuario no ha podido ser eliminado correctamente',
        });
      }
    } catch (error) {
      return resp
        .status(400)
        .json({
          mensaje: 'El usuario no ha podido ser eliminado correctamente',
        });
    }
  };
}

export default UsuariosController;
