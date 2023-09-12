import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '@coreui/angular';
import { freeSet } from '@coreui/icons';
import { StatusCode } from 'src/app/enum/status-code.enum';
import { AddUpdateBenefitRequestModel, AddUpdateCourseRequestModel, BenefitResponseModel, CategoryResponseModel, CourseResponseModel } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/admin.service';
import { ValidationFormsService } from 'src/app/services/validation/validation-form.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  
  public courses: CourseResponseModel[] = []
  public categories: CategoryResponseModel[] = []
  public benefitList: BenefitResponseModel[] = []
  public filteredBenefitList: BenefitResponseModel[] = []
  public isLoading = false
  public isValid = false

  public searchForm!: FormGroup;
  public searchFormSubmitted = false;
  public searchFormControls!: string[];

  public benefitForm!: FormGroup;
  public beneiftFormSubmitted = false;
  public benefitFormControls!: string[];

  public courseForm!: FormGroup;
  public courseFormSubmitted = false;
  public courseFormControls!: string[];

  public formErrors: any;

  public currentData = new CourseResponseModel()

  public modal = {
    type: 'create',
    title: 'Edit Course'
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
    this.courseForm = this.formBuilder.group(
      {
        title: ["", [Validators.required]],
        category: ["", [Validators.required]],
        price: [0, [Validators.required, Validators.min(1)]]
      }
    );

    this.searchForm = this.formBuilder.group(
      {
        title: [""],
        category: [""],
        open: [""]
      }
    );

    this.benefitForm = this.formBuilder.group(
      {
        name: [""]
      }
    );

    this.benefitForm.get('name')?.valueChanges.subscribe(newValue => {
      this.filteredBenefitList = this.benefitList.filter(e => e.desc.toLowerCase().includes(newValue.toLowerCase()));
      this.filteredBenefitList.sort((a, b) => (b.isSelected ? 1 : 0) - (a.isSelected ? 1 : 0));
    });

    this.courseFormControls = Object.keys(this.courseForm.controls);
    this.searchFormControls = Object.keys(this.searchForm.controls);
    this.benefitFormControls = Object.keys(this.benefitForm.controls);
  }

  getList() {
    this.isLoading = true

    const title = this.searchForm.get('title')?.value
    const category = this.searchForm.get('category')?.value

    this.adminService.getCourseList(title, category).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.courses = resp.result
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

  saveCourse() {
    this.isLoading = true

    const requestBody = new AddUpdateCourseRequestModel()
    requestBody.title = this.courseForm.get('title')?.value
    requestBody.price = this.courseForm.get('price')?.value
    requestBody.category = this.courseForm.get('category')?.value
    requestBody.benefits = this.getSelectedBenefit()

    this.adminService.saveCourse(requestBody).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.modalService.toggle({id: 'formModal', show: false})
          this.getList()
          this.reset('course')
        } 
        
        this.utils.toast(resp.message, resp.statusCode)
        this.isLoading = false
      },
      error: (error) => {
        this.utils.error(error.message)
          this.modalService.toggle({id: 'formModal', show: false})
          this.isLoading = false
      }
    });
  }

  updateCourse() {
    this.isLoading = true

    const requestBody = new AddUpdateCourseRequestModel()
    requestBody.title = this.courseForm.get('title')?.value
    requestBody.price = this.courseForm.get('price')?.value
    requestBody.category = this.courseForm.get('category')?.value
    requestBody.benefits = this.getSelectedBenefit()

    this.adminService.updateCourse(this.currentData.secureId, requestBody).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.modalService.toggle({id: 'formModal', show: false})
          this.getList()
          this.reset('course')
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

  deleteCourse() {
    this.isLoading = true

    this.adminService.deleteCourse(this.currentData.secureId).subscribe({
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

  getBenefitList() {
    const name = this.benefitForm.get('name')?.value

    this.adminService.getBenefitList(name).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          resp.result.forEach(e => {
            e.maskDesc = this.utils.maskingLongText(e.desc)
          })

          this.benefitList = resp.result
          this.filteredBenefitList = this.benefitList
        } 
      },
      error: (error) => {
        this.utils.error(error.message)
      }
    });
  }

  validate(type: string): boolean {
    if (type === 'course') {
      this.courseFormSubmitted = true;
      return this.courseForm.status === "VALID";
    } else if (type === 'search') {
      this.searchFormSubmitted = true;
      return this.searchForm.status === "VALID";
    } else {
      return false;
    }
  }

  reset(type: string) {
    this.createForm()

    if (type === 'course') {
      this.courseFormSubmitted = false;
      this.courseForm.reset()
    } else if (type === 'search') {
      this.searchFormSubmitted = false;
      this.getList()
    }
  }

  submit() {
    if (this.modal.type === 'delete') {
      this.deleteCourse()
    } else {
      if (this.validate('course')) {
        this.modal.type === 'create' ? this.saveCourse() :this.updateCourse()
      }
    }
  }

  openModal(type: string, data?: CourseResponseModel) {
    this.modal.type = type

    data = data == null ? new CourseResponseModel() : data

    switch(type) {
      case 'create' : {
        this.modal.title = 'Add New Course'
        this.modalService.toggle({id: 'formModal', show: true})
        this.getBenefitList()
        break
      }
      case 'update' : {
        this.modal.title = 'Update Course'
        this.modalService.toggle({id: 'formModal', show: true})
        this.currentData = data

        this.getBenefitList()
        this.initUpdateForm()
        break
      }
      case 'detail' : {
        this.modal.title = 'Detail Course'
        this.modalService.toggle({id: 'formModal', show: true})
        this.currentData = data
        break
      }
      default : {
        this.modal.title = 'Delete Course'
        this.modalService.toggle({id: 'deleteModal', show: true})
        this.currentData = data
        break
      }
    }
  }

  initUpdateForm() {
    this.courseForm.get('title')?.setValue(this.currentData.title)
    this.courseForm.get('price')?.setValue(this.currentData.price)
    this.courseForm.get('category')?.setValue(this.currentData.categorySecureId)
  }

  selectBenefit(item: BenefitResponseModel) {
    item.isSelected = !item.isSelected
    this.filteredBenefitList.sort((a, b) => (b.isSelected ? 1 : 0) - (a.isSelected ? 1 : 0));

    this.benefitList.forEach(element => {
      if (element.secureId === item.secureId) {
        element.isSelected = item.isSelected
      }
    });
  }

  countSelectedBenefit(): number {
    let result = 0

    this.benefitList.forEach(element => {
      if (element.isSelected) result += 1
    });

    return result
  }

  getSelectedBenefit(): AddUpdateBenefitRequestModel[] {
    let list: AddUpdateBenefitRequestModel[] = []

    this.benefitList.forEach(element => {
      if (element.isSelected) {
        const item = new AddUpdateBenefitRequestModel();
        item.secureId = element.secureId

        list.push(item)
      }
    });
    
    return list
  }
}
