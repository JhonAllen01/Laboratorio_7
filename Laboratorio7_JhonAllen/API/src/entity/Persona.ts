import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Persona {
  @PrimaryColumn()
  cedula: string;
  @Column({ length: 50 })
  nombre: String;
  @Column()
  apellido1: string;
  @Column()
  apellido2: string;
  @Column()
  fechaNac: Date;
}
