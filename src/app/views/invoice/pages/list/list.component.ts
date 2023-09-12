import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '@coreui/angular';
import { freeSet } from '@coreui/icons';
import { StatusCode } from 'src/app/enum/status-code.enum';
import { InvoiceListRequestModel, InvoiceListResponseModel, UserRequestModel, UserResponseModel } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/admin.service';
import { ValidationFormsService } from 'src/app/services/validation/validation-form.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  public invoices: InvoiceListResponseModel[] = []
  public isLoading = false
  public isAdmin = false
  public isValid = false

  public searchForm!: FormGroup;
  public searchFormSubmitted = false;
  public searchFormControls!: string[];

  public formErrors: any;

  public currentData = new InvoiceListResponseModel()

  public rangeDates: any

  public modal = {
    type: 'create',
    title: 'Edit User'
  }

  public icons = freeSet

  constructor(
    private adminService: AdminService,
    private utils: Utils,
    private formBuilder: FormBuilder,
    private validationService: ValidationFormsService,
    private modalService: ModalService,
    private router: Router
  ) {
    this.formErrors = this.validationService.errorMessages;
    this.createForm();
  }

  ngOnInit(): void {
    this.isAdmin = this.router.url.includes('admin')

    this.getList()
  }

  createForm() {
    this.searchForm = this.formBuilder.group(
      { 
        invoiceId: [""],
        customerName: [""],
        category: [""],
        status: [""]
      }
    );

    this.searchFormControls = Object.keys(this.searchForm.controls);
  }

  getList() {
    this.isLoading = true

    const requestBody = new InvoiceListRequestModel()
    requestBody.customerName = this.searchForm.get('customerName')?.value
    requestBody.invoiceId = this.searchForm.get('invoiceId')?.value
    requestBody.category = this.searchForm.get('category')?.value
    requestBody.status = this.searchForm.get('status')?.value

    this.adminService.getInvoiceList(requestBody).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.invoices = resp.result
        } else {
          this.utils.toast(resp.message, resp.statusCode)
        }

        this.isLoading = false
      },
      error: (error) => {
        this.utils.error(error.message)
        this.isLoading = false
      }
    });
  }

  validate(type: string): boolean {
    if (type === 'invoice') {
      // this.invoiceFormSubmitted = true;
      // return this.invoiceForm.status === "VALID";
      return true
    } else if (type === 'search') {
      this.searchFormSubmitted = true;
      return this.searchForm.status === "VALID";
    } else {
      return false;
    }
  }

  reset(type: string) {
    this.createForm()

    if (type === 'invoice') {
      // this.invoiceFormSubmitted = false;
      // this.invoiceForm.reset()
    } else if (type === 'search') {
      this.searchFormSubmitted = false;
      this.getList()
    }
  }

  toggleUserStatus(invoice: UserResponseModel) {
    const status = !invoice.active

    this.adminService.toggleUserStatus(invoice.secureId, status).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.getList()
        }

        this.utils.toast(resp.message, resp.statusCode)
      },
      error: (error) => {
        this.utils.error(error.message)
      }
    });
  }

  submit() {
    if (this.modal.type === 'delete') {
      // this.deleteUser()
    } else {
      if (this.validate('invoice')) {
        // this.modal.type === 'create' ? this.saveAdminUser() : this.updateUser()
      }
    }
  }

  openModal(type: string, data?: InvoiceListResponseModel) {
    this.modal.type = type

    data = data == null ? new InvoiceListResponseModel() : data

    switch(type) {
      // case 'create' : {
      //   this.modal.title = 'Add New Admin'
      //   this.modalService.toggle({id: 'formModal', show: true})
      //   break
      // }
      // case 'update' : {
      //   this.modal.title = 'Update User'
      //   this.modalService.toggle({id: 'formModal', show: true})
      //   this.currentData = data

      //   this.initUpdateForm()
      //   break
      // }
      case 'detail' : {
        this.modal.title = 'Detail Invoice'
        this.modalService.toggle({id: 'formModal', show: true})
        this.currentData = data
        break
      }
      default : {
        this.modal.title = 'Delete User'
        this.modalService.toggle({id: 'deleteModal', show: true})
        this.currentData = data
        break
      }
    }
  }

  // initUpdateForm() {
  //   this.invoiceForm.get('firstName')?.setValue(this.currentData.name)
  //   this.invoiceForm.get('lastName')?.setValue(this.currentData.name)
  //   this.invoiceForm.get('email')?.setValue(this.currentData.email)
  // }
}
