import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '@coreui/angular';
import { freeSet } from '@coreui/icons';
import { StatusCode } from '../../../../enum/status-code.enum';
import { ValidationFormsService } from '../../../../services/validation/validation-form.service';
import { Utils } from '../../../../utils/utils';
import { WebinarListResponseModel, CategoryResponseModel, WebinarResponseModel, AddUpdateWebinarRequestModel } from '../../../../models/admin.model';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  public webinars: WebinarListResponseModel[] = []
  public categories: CategoryResponseModel[] = []
  public isLoading = false
  public isValid = false

  public searchForm!: FormGroup;
  public searchFormSubmitted = false;
  public searchFormControls!: string[];

  public webinarForm!: FormGroup;
  public webinarFormSubmitted = false;
  public webinarFormControls!: string[];

  public formErrors: any;

  public currentData = new WebinarResponseModel()

  public modal = {
    type: 'create',
    title: 'Edit Webinar'
  }

  public icons = freeSet

  constructor(
    private adminService: AdminService,
    private utils: Utils,
    private formBuilder: FormBuilder,
    private validationService: ValidationFormsService,
    private modalService: ModalService
  ) {
    this.formErrors = this.validationService.errorMessages;
    this.createForm();
  }

  ngOnInit(): void {
    this.getList()
    this.getCategoryList()
  }

  createForm() {
    this.webinarForm = this.formBuilder.group(
      {
        title: ["", [Validators.required]],
        link: ["", [Validators.required]],
        meetingId: ["", [Validators.required]],
        open: ["available", [Validators.required]],
        passcode: ["", [Validators.required]],
        price: [0, [Validators.min(0), Validators.required]],
        category: ["UKOM", [Validators.required]]
      }
    );

    this.searchForm = this.formBuilder.group(
      {
        title: [""],
        meetingId: [""],
        open: [""],
        category: [""],
      }
    );

    this.webinarFormControls = Object.keys(this.webinarForm.controls);
    this.searchFormControls = Object.keys(this.searchForm.controls);
  }

  getList() {
    this.isLoading = true

    const title = this.searchForm.get('title')?.value
    const status = this.searchForm.get('open')?.value
    const category = this.searchForm.get('category')?.value

    this.adminService.getWebinarList(title, status, category).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.webinars = resp.result
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

  getCategoryList() {
    this.isLoading = true

    const title = this.searchForm.get('category')?.value

    this.adminService.getCategoryList(title).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.categories = resp.result
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

  saveWebinar() {
    this.isLoading = true

    const requestBody = new AddUpdateWebinarRequestModel()
    requestBody.title = this.webinarForm.get('title')?.value
    requestBody.link = this.webinarForm.get('link')?.value
    requestBody.meetingId = this.webinarForm.get('meetingId')?.value
    requestBody.passcode = this.webinarForm.get('passcode')?.value
    requestBody.price = this.webinarForm.get('price')?.value
    requestBody.category = this.webinarForm.get('category')?.value

    this.adminService.saveWebinar(requestBody).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.modalService.toggle({id: 'formModal', show: false})
          this.getList()
          this.reset('webinar')
        } 
        
        this.utils.toast(resp.message, resp.statusCode)
        this.isLoading = false
      },
      error: (error) => {
        this.utils.error(error.message)
        this.isLoading = false
      }
    });
  }

  updateWebinar() {
    this.isLoading = true

    const requestBody = new AddUpdateWebinarRequestModel()
    requestBody.title = this.webinarForm.get('title')?.value
    requestBody.link = this.webinarForm.get('link')?.value
    requestBody.meetingId = this.webinarForm.get('meetingId')?.value
    requestBody.passcode = this.webinarForm.get('passcode')?.value
    requestBody.price = this.webinarForm.get('price')?.value
    requestBody.category = this.webinarForm.get('category')?.value

    this.adminService.updateWebinar(this.currentData.secureId, requestBody).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.modalService.toggle({id: 'formModal', show: false})
          this.getList()
          this.reset('webinar')
        } 
        
        this.utils.toast(resp.message, resp.statusCode)
        this.isLoading = false
      },
      error: (error) => {
        this.utils.error(error.message)
        this.isLoading = false
      }
    });
  }

  deleteWebinar() {
    this.isLoading = true

    this.adminService.deleteWebinar(this.currentData.secureId).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.modalService.toggle({id: 'formModal', show: false})
          this.getList()
        } 
        
        this.utils.toast(resp.message, resp.statusCode)
        this.isLoading = false
      },
      error: (error) => {
        this.utils.error(error.message)
        this.isLoading = false
      }
    });
  }

  detailWebinar(secureId: string) {
    this.isLoading = true

    this.adminService.detailWebinar(secureId).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.currentData = resp.result
          
          this.initUpdateForm()
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
    if (type === 'webinar') {
      this.webinarFormSubmitted = true;
      return this.webinarForm.status === "VALID";
    } else if (type === 'search') {
      this.searchFormSubmitted = true;
      return this.searchForm.status === "VALID";
    } else {
      return false;
    }
  }

  reset(type: string) {
    this.createForm()

    if (type === 'webinar') {
      this.webinarFormSubmitted = false;
      this.webinarForm.reset()
    } else if (type === 'search') {
      this.searchFormSubmitted = false;
      this.getList()
    }
  }

  submit() {
    if (this.modal.type === 'delete') {
      this.deleteWebinar()
    } else {
      if (this.validate('webinar')) {
        this.modal.type === 'create' ? this.saveWebinar() :this.updateWebinar()
      }
    }
  }

  openModal(type: string, data?: WebinarResponseModel) {
    this.modal.type = type

    data = data == null ? new WebinarResponseModel() : data

    switch(type) {
      case 'create' : {
        this.modal.title = 'Add New Webinar'
        this.modalService.toggle({id: 'formModal', show: true})
        break
      }
      case 'update' : {
        this.modal.title = 'Update Webinar'
        this.modalService.toggle({id: 'formModal', show: true})
        this.detailWebinar(data.secureId)
        break
      }
      case 'detail' : {
        this.modal.title = 'Detail Webinar'
        this.modalService.toggle({id: 'formModal', show: true})
        this.detailWebinar(data.secureId)
        break
      }
      default : {
        this.modal.title = 'Delete Webinar'
        this.modalService.toggle({id: 'deleteModal', show: true})
        this.currentData = data
        break
      }
    }
  }

  initUpdateForm() {
    this.webinarForm.get('title')?.setValue(this.currentData.title)
    this.webinarForm.get('link')?.setValue(this.currentData.link)
    this.webinarForm.get('meetingId')?.setValue(this.currentData.meetingId)
    this.webinarForm.get('passcode')?.setValue(this.currentData.passcode)
    this.webinarForm.get('price')?.setValue(this.currentData.price)
    this.webinarForm.get('category')?.setValue(this.currentData.categorySecureId)
    this.webinarForm.get('open')?.setValue(this.currentData.available ? 'available' : 'unavailable')
  }
}
