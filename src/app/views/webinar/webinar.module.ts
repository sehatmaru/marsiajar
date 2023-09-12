import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './pages/list/list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, DropdownModule, ModalModule, FormModule, GridModule, AccordionModule, CardModule, SpinnerModule, ButtonGroupModule, TooltipModule, BadgeModule } from '@coreui/angular';
import { TableModule } from 'primeng/table';
import { IconModule } from '@coreui/icons-angular';
import { WebinarRoutingModule } from './webinar-routing.module';

@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    WebinarRoutingModule,
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
    BadgeModule
  ]
})
export class WebinarModule { }
