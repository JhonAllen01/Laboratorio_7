import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Factura } from '../entity/Factura';

class FacturaController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const repoFact = AppDataSource.getRepository(Factura);
      let lista;
      try {
        lista = await repoFact.find({
          where: { estado: true },
          relations: { detallesFactura: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: 'No hay datos dentro de esta factura.' });
      }

      if (lista.length == 0) {
        return resp
          .status(404)
          .json({ mensaje: 'No hay datos dentro de esta factura.' });
      }

      return resp.status(200).json(lista);
    } catch (error) {
      return resp
        .status(400)
        .json({ mensaje: 'Ha habido un error en la carga de los datos bro' });
    }
  };

  static getById = async (req: Request, resp: Response) => {};

  static add = async (req: Request, resp: Response) => {};

  static update = async (req: Request, resp: Response) => {};

  static delete = async (req: Request, resp: Response) => {};
}

export default FacturaController;
