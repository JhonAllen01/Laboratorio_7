import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Factura } from "./Factura";
import { Producto } from "./Producto";

@Entity()
export class DetalleFactura {
  @Column({ primary: true })
  idFactura: number;
  @Column({ primary: true })
  idProducto: number;
  @Column()
  cant: number;

  @ManyToOne(() => Factura, (factura) => factura.detallesFactura)
  @JoinColumn({ name: "idFactura" })
  factura: Factura;

  @ManyToOne(() => Producto, (producto) => producto.detallesFactura)
  @JoinColumn({ name: "idProducto" })
  producto: Producto;
}
