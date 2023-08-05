import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Producto } from './entity/Producto';
import { Usuarios } from './entity/Usuario';
import { Persona } from './entity/Persona';
import { Cliente } from './entity/Cliente';
import { TipoCliente } from './entity/TipoCliente';
import { Factura } from './entity/Factura';
import { DetalleFactura } from './entity/DetalleFactura';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'pruebautn',
  synchronize: true,
  logging: false,
  entities: [
    Producto,
    Usuarios,
    Persona,
    Cliente,
    TipoCliente,
    Factura,
    DetalleFactura,
  ],
  migrations: [],
  subscribers: [],
});
