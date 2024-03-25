import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  Register = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    repassword: new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required]),
    username : new FormControl('',[Validators.required])
  })

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }
  registrar(){
    
  }

}
