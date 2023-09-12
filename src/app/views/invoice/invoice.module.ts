import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './pages/list/list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, DropdownModule, ModalModule, FormModule, GridModule, AccordionModule, CardModule, SpinnerModule, ButtonGroupModule, AlertModule, BadgeModule, TooltipModule, CalloutModule } from '@coreui/angular';
import { TableModule } from 'primeng/table';
import { IconModule } from '@coreui/icons-angular';
import { InvoiceRoutingModule } from './invoice-routing.module';

@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
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
    BadgeModule,
    IconModule,
    TooltipModule,
    CalloutModule,
  ]
})
export class InvoiceModule { }
