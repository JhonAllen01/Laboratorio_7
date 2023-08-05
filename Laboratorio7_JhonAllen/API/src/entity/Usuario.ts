import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity()
export class Usuarios {
  @PrimaryColumn()
  @IsNotEmpty({ message: 'Falta la cedula' })
  cedula: number;

  @Column({ length: 50 })
  @MaxLength(50)
  @IsNotEmpty({ message: 'Falta el nombre' })
  nombre: string;

  @Column()
  @MaxLength(50)
  @IsNotEmpty({ message: 'Falta el apellido 1' })
  apellido1: string;

  @Column()
  @MaxLength(50)
  @IsNotEmpty({ message: 'Falta el apellido 2' })
  apellido2: string;

  @Column()
  fecha_ingreso: Date;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty({ message: 'Falta el correo' })
  @MaxLength(50)
  correo: string;

  @Column()
  @IsNotEmpty({ message: 'Falta el rol' })
  rol: string;

  @Column()
  @MaxLength(30)
  @MinLength(5)
  @IsNotEmpty({ message: 'Falta la contraseña' })
  contrasena: string;

  @Column({ default: true })
  estado: boolean;
}
