import { NgModule } from '@angular/core';
import { TitleComponent } from './components/title/title.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from './common/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TitleComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  exports: [
    TitleComponent,
    LoaderComponent,
  ]
})
export class SharedModule { }
