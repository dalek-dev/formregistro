import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,  FormArray,ValidatorFn } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatInputModule,MatRippleModule } from '@angular/material';



import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule,AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  usersForm:FormGroup;

  // Form state
  loading = false;
  success = false;


  clientes = [
    { id: 100, name: 'Ministerios' },
    { id: 200, name: 'Gobiernos Regionales' },
    { id: 300, name: 'Municipios' },
    { id: 400, name: 'Empresa MYPE o PYME ' },
    { id: 500, name: 'Personas naturales' },
    { id: 600, name: 'Investigadores y/o Universidades' },
    { id: 700, name: 'Otros' }
  ];

  categorias = [
    { id:11, name:"Agricultura, ganadería, caza y silvicultura"},
    { id:12, name:"Pesca y acuicultura"},
    { id:13, name:"Extracción de petróleo, gas, minerales y servicios conexos"},
    { id:14, name: "Electricidad, gas y agua"},
    { id:15, name: "Construcción"},
    { id:16, name:"Comercio, mantenimiento y reparación de vehículos automotores y motocicletas"},
    { id:17, name:"Manufactura"},
    { id:18, name:"Transporte, almacenamiento, correo y mensajería"},
    { id:19, name:"Alojamiento y restaurantes"},
    { id:20, name:"Telecomunicaciones, TICs y otros servicios de información"},
    { id:21, name:"Administración pública y defensa"},
    { id:22, name:"Otros"}
  ];
  

  
  constructor(private fb:FormBuilder, private afs: AngularFirestore) {    
  }

  ngOnInit(){
    
    const controls = this.clientes.map(c => new FormControl(false));
    controls[0].setValue(true); // Set the first checkbox to true (checked)

    const catco = this.categorias.map(c => new FormControl(false));
    catco[0].setValue(true); // Set the first checkbox to true (checked)

    this.usersForm = this.fb.group ({
      subdependencia: ['',[Validators.required]],
      descripcion:  ['',[
        Validators.required,
        Validators.max(280)
      ]],
      facultad:  ['',[Validators.required]],
      correo: ['',[Validators.required,
      Validators.email]],
      telefono: ['', [
        Validators.required
      ]],
      web: '',
      ubicacion:  ['',[Validators.required]],
      categorias: new FormArray(catco,minSelectedCheckboxescatco(1)),
      clientes: new FormArray(controls, minSelectedCheckboxes(1)),
      caract: ['',[
        Validators.required,
        Validators.max(280)
      ]],
      servicios: this.fb.array([])
    });
    
  }
 
  //
  

  // Segmento de validación
  get correo() {
    return this.usersForm.get('correo');
  }


  get telefono() {
    return this.usersForm.get('telefono');
  }
  


  // Servicios Nested
  get serviciosForms(){
    return this.usersForm.get('servicios') as FormArray
  }

  addServicios(){
    const servicio = this.fb.group({
      servname:[],
      servdescribe:['',[
        Validators.required,
        Validators.max(280)
      ]],
    })
    this.serviciosForms.push(servicio);
  }

  deleteServicios(i){
    this.serviciosForms.removeAt(i)
  }



 async onSubmit(){
  this.loading = true;

  const formValue = this.usersForm.value;

  try {
    await this.afs.collection('services').add(formValue);
    this.success = true;
    console.log("Form Submited!");
    this.usersForm.reset();  
  } catch(err) {
    console.error(err)
  }

  this.loading = false;
}
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);

    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}

function minSelectedCheckboxescatco(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);

    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}

 
