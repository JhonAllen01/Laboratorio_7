import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductosForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [0, [Validators.required]],
      stock: [0, [Validators.required]],
      fechaIngreso: [Date.now, [Validators.required]],
      estado: [true],
    });
  }
}
