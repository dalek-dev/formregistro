import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatInputModule,MatRippleModule } from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';



import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'

import { environment } from '../environments/environment';


import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent,

    
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    TextMaskModule
    
  
  ],
  exports: [MatButtonModule, 
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
