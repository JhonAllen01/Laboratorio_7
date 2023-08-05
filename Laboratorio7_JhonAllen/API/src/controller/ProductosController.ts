import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Producto } from '../entity/Producto';
import { validate } from 'class-validator';

class ProductosController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const productosRepo = AppDataSource.getRepository(Producto);

      const listaProductos = await productosRepo.find({
        where: { estado: true },
      });

      if (listaProductos.length == 0) {
        return resp
          .status(404)
          .json({ mensaje: 'No hay productos registrados' });
      }
      return resp.status(200).json(listaProductos);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params['id']);

      if (!id) {
        return resp.status(404).json({ mensaje: 'Debe indicar el id' });
      }

      const productosRepo = AppDataSource.getRepository(Producto);

      let producto;
      try {
        producto = await productosRepo.findOneOrFail({
          where: { id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: 'No hay un producto con ese id' });
      }

      return resp.status(200).json(producto);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      //DESTRUCTURING
      const { id, nombre, precio, stock, fechaIngreso } = req.body;

      //validacion de datos de entrada
      if (!id) {
        return resp.status(404).json({ mensaje: 'Debe ingresar el id' });
      }
      if (!nombre) {
        return resp.status(404).json({ mensaje: 'Debe ingresar el nombre' });
      }
      if (!precio) {
        return resp.status(404).json({ mensaje: 'Debe ingresar el id' });
      }
      if (precio < 0) {
        return resp.status(404).json({ mensaje: 'Debe ingresar el precio' });
      }
      if (!stock) {
        return resp.status(404).json({ mensaje: 'Debe ingresar el stock' });
      }
      if (stock < 0) {
        return resp
          .status(404)
          .json({ mensaje: 'El stock no puede ser menor o igual que cero' });
      }

      //validacion de reglas de negocio
      const productosRepo = AppDataSource.getRepository(Producto);
      const pro = await productosRepo.findOne({ where: { id } });

      if (pro) {
        return resp.status(404).json({ mensaje: 'Ya existe ese producto.' });
      }

      const fecha = new Date();

      let producto = new Producto();
      producto.id = id;
      producto.nombre = nombre;
      producto.precio = precio;
      producto.stock = stock;
      producto.fechaIngreso = fecha;
      producto.estado = true;

      //validar con class validator
      const errors = await validate(producto, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      await productosRepo.save(producto);
      return resp
        .status(201)
        .json({ mensaje: 'Producto ingresado correctamente' });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    const { id, nombre, precio, stock, fechaIngreso } = req.body;

    //validacion de datos de entrada
    if (!id) {
      return resp.status(404).json({ mensaje: 'Debe ingresar el id' });
    }
    if (!nombre) {
      return resp.status(404).json({ mensaje: 'Debe ingresar el nombre' });
    }
    if (!precio) {
      return resp.status(404).json({ mensaje: 'Debe ingresar el precio' });
    }
    if (precio < 0) {
      return resp
        .status(404)
        .json({ mensaje: 'El precio no puede ser menor a cero' });
    }
    if (!stock) {
      return resp.status(404).json({ mensaje: 'Debe ingresar el stock' });
    }
    if (stock < 0) {
      return resp
        .status(404)
        .json({ mensaje: 'El stock no puede ser menor o igual a cero' });
    }

    const productosRepo = AppDataSource.getRepository(Producto);
    let pro: Producto;
    try {
      pro = await productosRepo.findOneOrFail({ where: { id } });
    } catch (error) {
      return resp.status(404).json({ mensaje: 'Ese producto no existe' });
    }

    pro.nombre = nombre;
    pro.precio = precio;
    pro.stock = stock;

    const errors = await validate(pro, {
      validationError: { target: false, value: false },
    });

    if (errors.length > 0) {
      return resp.status(400).json(errors);
    }

    try {
      await productosRepo.save(pro);
      return resp
        .status(200)
        .json({ mensaje: 'Producto ingresado correctamente' });
    } catch (error) {
      return resp
        .status(400)
        .json({
          mensaje: 'El producto no ha podido ser ingresado correctamente',
        });
    }
  };

  static delete = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params['id']);
      if (!id) {
        return resp.status(404).json({ mensaje: 'Debe ingresar el id' });
      }

      const productosRepo = AppDataSource.getRepository(Producto);
      let pro: Producto;
      try {
        pro = await productosRepo.findOneOrFail({
          where: { id: id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: 'No existe un producto con ese id' });
      }

      pro.estado = false;
      try {
        await productosRepo.save(pro);
        return resp
          .status(200)
          .json({ mensaje: 'El producto ha sido eliminado correctamente' });
      } catch (error) {
        return resp
          .status(400)
          .json({
            mensaje: 'El producto no ha podido ser eliminado correctamente.',
          });
      }
    } catch (error) {
      return resp
        .status(400)
        .json({
          mensaje: 'El producto no ha podido ser eliminado correctamente.',
        });
    }
  };
}

export default ProductosController;
