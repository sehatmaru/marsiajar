import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '@coreui/angular';
import { freeSet } from '@coreui/icons';
import { StatusCode } from '../../../../enum/status-code.enum';
import { CategoryResponseModel, TemplateResponseModel, ExamResponseModel, AddUpdateExamRequestModel } from '../../../../models/admin.model';
import { AdminService } from '../../../../services/admin.service';
import { ValidationFormsService } from '../../../../services/validation/validation-form.service';
import { Utils } from '../../../../utils/utils';
import { CommonService } from '../../../../services/common.service';
import { ExamService } from '../../../../services/exam.service';
import { ExamListResponseModel } from '../../../../models/exam.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  public exams: ExamListResponseModel[] = []
  public categories: CategoryResponseModel[] = []
  public templateList: TemplateResponseModel[] = []
  public filteredTemplateList: TemplateResponseModel[] = []
  public isLoading = false
  public isValid = false
  public isVisible = false

  public searchForm!: FormGroup;
  public searchFormSubmitted = false;
  public searchFormControls!: string[];

  public examForm!: FormGroup;
  public examFormSubmitted = false;
  public examFormControls!: string[];

  public templateForm!: FormGroup;
  public templateFormSubmitted = false;
  public templateFormControls!: string[];

  public formErrors: any;

  public currentData = new ExamResponseModel()

  public startTime: any
  public endTime: any

  public selectedTemplate!: TemplateResponseModel

  public modal = {
    type: 'create',
    title: 'Edit Exam'
  }

  public icons = freeSet

  constructor(
    private adminService: AdminService,
    private commonService: CommonService,
    private examService: ExamService,
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
    this.examForm = this.formBuilder.group(
      {
        title: ["", [Validators.required]],
        participant: [0, [Validators.required, Validators.min(1)]],
        duration: [0, [Validators.required, Validators.min(1)]],
        open: ["available", [Validators.required]],
        startTime: [""],
        endTime: [""],
        template: [""],
        category: ["", [Validators.required]]
      }
    );

    this.searchForm = this.formBuilder.group(
      {
        title: [""],
        category: [""],
        open: [""]
      }
    );

    this.templateForm = this.formBuilder.group(
      {
        name: [""]
      }
    )

    this.templateForm.get('name')?.valueChanges.subscribe(newValue => {
      this.filteredTemplateList = this.templateList.filter(e => e.name.toLowerCase().includes(newValue.toLowerCase()));
      this.filteredTemplateList.sort((a, b) => (b.isSelected ? 1 : 0) - (a.isSelected ? 1 : 0));
    });


    this.examFormControls = Object.keys(this.examForm.controls);
    this.searchFormControls = Object.keys(this.searchForm.controls);
    this.templateFormControls = Object.keys(this.templateForm.controls)
  }

  getList() {
    this.isLoading = true

    const title = this.searchForm.get('title')?.value
    const category = this.searchForm.get('category')?.value
    const status = this.searchForm.get('open')?.value

    this.examService.getList(title, category).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.exams = resp.result
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

    this.commonService.getCategoryList().subscribe({
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

  saveExam() {
    this.isLoading = true

    const requestBody = new AddUpdateExamRequestModel()
    requestBody.title = this.examForm.get('title')?.value
    requestBody.template = this.selectedTemplate.secureId
    requestBody.maxParticipant = this.examForm.get('participant')?.value
    requestBody.duration = this.examForm.get('duration')?.value
    requestBody.available = this.examForm.get('open')?.value == 'available'
    requestBody.category = this.examForm.get('category')?.value
    requestBody.startAt = this.startTime
    requestBody.endAt = this.endTime

    this.adminService.saveExam(requestBody).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.modalService.toggle({id: 'formModal', show: false})
          this.getList()
          this.reset('exam')
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

  updateExam() {
    this.isLoading = true

    const requestBody = new AddUpdateExamRequestModel()
    requestBody.title = this.examForm.get('title')?.value
    requestBody.template = this.selectedTemplate.secureId
    requestBody.maxParticipant = this.examForm.get('participant')?.value
    requestBody.duration = this.examForm.get('duration')?.value
    requestBody.available = this.examForm.get('open')?.value == 'available'
    requestBody.category = this.examForm.get('category')?.value
    requestBody.startAt = this.startTime
    requestBody.endAt = this.endTime

    this.adminService.updateExam(this.currentData.secureId, requestBody).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.modalService.toggle({id: 'formModal', show: false})
          this.getList()
          this.reset('exam')
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

  deleteExam() {
    this.isLoading = true

    this.adminService.deleteExam(this.currentData.secureId).subscribe({
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

  detailExam(secureId: string) {
    this.isLoading = true

    this.adminService.detailExam(secureId).subscribe({
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

  getTemplateList() {
    const name = this.templateForm.get('name')?.value

    this.adminService.getTemplateList(name).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.templateList = resp.result
          this.filteredTemplateList = this.templateList

          if (this.modal.type != 'create') {
            this.templateList.forEach(e => {
              if (e.secureId == this.currentData.template) {
                e.isSelected = true
                this.selectedTemplate = e
              }

              if (this.modal.type == 'detail') this.examForm.get('template')?.setValue(e.name)
            });
          }
        } 
      },
      error: (error) => {
        this.utils.error(error.message)
      }
    });
  }

  selectTemplate(item: TemplateResponseModel) {
    if (this.selectedTemplate) this.selectedTemplate.isSelected = false
    this.selectedTemplate = item
    this.selectedTemplate.isSelected = true
  }

  validate(type: string): boolean {
    if (type === 'exam') {
      this.examFormSubmitted = true;
      return this.examForm.status === "VALID";
    } else if (type === 'search') {
      this.searchFormSubmitted = true;
      return this.searchForm.status === "VALID";
    } else {
      return false;
    }
  }

  reset(type: string) {
    this.createForm()

    if (type === 'exam') {
      this.examFormSubmitted = false;
      this.examForm.reset()
    } else if (type === 'search') {
      this.searchFormSubmitted = false;
      this.getList()
    }
  }

  submit() {
    if (this.modal.type === 'delete') {
      this.deleteExam()
    } else {
      if (this.validate('exam')) {
        this.modal.type === 'create' ? this.saveExam() : this.updateExam()
      }
    }
  }

  openModal(type: string, data?: ExamListResponseModel) {
    this.modal.type = type

    data = data == null ? new ExamListResponseModel() : data

    switch(type) {
      case 'create' : {
        this.modal.title = 'Add New Exam'
        this.modalService.toggle({id: 'formModal', show: true})
        this.getTemplateList();
        break
      }
      case 'update' : {
        this.modal.title = 'Update Exam'
        this.modalService.toggle({id: 'formModal', show: true})
        this.detailExam(data.secureId)
        this.getTemplateList()
        break
      }
      case 'detail' : {
        this.modal.title = 'Detail Exam'
        this.modalService.toggle({id: 'formModal', show: true})
        this.detailExam(data.secureId)
        this.getTemplateList()
        break
      }
      default : {
        this.modal.title = 'Delete Exam'
        this.modalService.toggle({id: 'deleteModal', show: true})
        // this.currentData = data
        break
      }
    }
  }

  initUpdateForm() {
    this.examForm.get('title')?.setValue(this.currentData.title)
    this.examForm.get('duration')?.setValue(this.currentData.duration)
    this.examForm.get('participant')?.setValue(this.currentData.totalSlot)
    this.examForm.get('open')?.setValue(this.currentData.available ? 'available' : 'unavailable')
    this.examForm.get('startTime')?.setValue(this.currentData.startAt)
    this.examForm.get('endTime')?.setValue(this.currentData.endAt)
    this.examForm.get('category')?.setValue(this.currentData.categorySecureId)
    this.startTime = this.currentData.startAt
    this.endTime = this.currentData.endAt

    this.getTemplateList()
  }
}