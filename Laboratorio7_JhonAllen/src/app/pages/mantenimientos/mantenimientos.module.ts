import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantenimientosRoutingModule } from './mantenimientos-routing.module';
import { MantenimientosComponent } from './mantenimientos.component';
import { ProductosComponent } from './productos/productos.component';
import { MaterialModule } from 'src/app/material.module';
import { AdminProductosComponent } from './productos/admin-productos/admin-productos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdminUsuariosComponent } from './usuarios/admin-usuarios/admin-usuarios.component';
import { UsuariosForm } from 'src/app/shared/formsModels/usuariosForms';
import { ProveedoresComponent } from './proveedores/proveedores.component';

@NgModule({
  declarations: [
    MantenimientosComponent,
    ProductosComponent,
    UsuariosComponent,
    AdminProductosComponent,
    AdminUsuariosComponent,
    ProveedoresComponent,
  ],
  imports: [
    CommonModule,
    MantenimientosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class MantenimientosModule {}
