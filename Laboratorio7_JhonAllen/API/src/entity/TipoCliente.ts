import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./Cliente";
@Entity()
export class TipoCliente {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  estado: boolean;

  @OneToMany(() => Cliente, (cliente) => cliente.tipoCliente)
  clientes: Cliente[];
}
