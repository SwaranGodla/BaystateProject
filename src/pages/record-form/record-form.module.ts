import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordFormPage } from './record-form';

@NgModule({
  declarations: [
    RecordFormPage,
  ],
  imports: [
    IonicPageModule.forChild(RecordFormPage),
  ]
})
export class RecordFormPageModule {}
