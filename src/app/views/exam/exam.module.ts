import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './pages/list/list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, DropdownModule, ModalModule, FormModule, GridModule, AccordionModule, CardModule, SpinnerModule, ButtonGroupModule, TooltipModule, BadgeModule, UtilitiesModule } from '@coreui/angular';
import { TableModule } from 'primeng/table';
import { IconModule } from '@coreui/icons-angular';
import { ExamRoutingModule } from './exam-routing.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    FormsModule,
    FormModule,
    GridModule,
    ReactiveFormsModule,
    AccordionModule,
    ButtonModule,
    DropdownModule,
    ModalModule,
    CardModule,
    TableModule,
    SpinnerModule,
    ButtonGroupModule,
    IconModule,
    TooltipModule,
    BadgeModule,
    CalendarModule,
    UtilitiesModule
  ]
})
export class ExamModule { }
