import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Persona } from "./Persona";
import { TipoCliente } from "./TipoCliente";
import { Factura } from "./Factura";

@Entity()
export class Cliente {
  @PrimaryColumn()
  cedula: String;

  @ManyToOne(() => TipoCliente, (tipoCliente) => tipoCliente.clientes)
  tipoCliente: TipoCliente;

  @Column()
  fechaIngreso: Date;

  @OneToOne(() => Persona, { cascade: ["insert", "update"] })
  @JoinColumn({ name: "cedula" })
  persona: Persona;

  @OneToMany(() => Factura, (factura) => factura.cliente)
  facturas: Factura[];
}
