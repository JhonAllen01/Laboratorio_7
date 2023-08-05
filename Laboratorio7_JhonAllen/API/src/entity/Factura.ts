import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cliente } from "./Cliente";
import { DetalleFactura } from "./DetalleFactura";

@Entity()
export class Factura {
  @PrimaryGeneratedColumn()
  idFatura: number;

  @Column()
  Fecha: Date;

  @Column()
  idCliente: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.facturas)
  @JoinColumn({ name: "idCliente" })
  cliente: Cliente;

  @OneToMany(() => DetalleFactura, (detalle) => detalle.factura, {
    cascade: ["insert", "update"],
  })
  detallesFactura: DetalleFactura[];

  @Column({ default: true })
  estado: boolean;
}
