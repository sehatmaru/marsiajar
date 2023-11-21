import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '@coreui/angular';
import { freeSet } from '@coreui/icons';
import { StatusCode } from '../../../../enum/status-code.enum';
import { ValidationFormsService } from '../../../../services/validation/validation-form.service';
import { Utils } from '../../../../utils/utils';
import { CommonService } from '../../../../services/common.service';
import { ExamService } from '../../../../services/exam.service';
import { ExamListResponseModel, ExamResponseModel, ExamTncResponseModel } from '../../../../models/exam.model';
import { CategoryResponseModel } from 'src/app/models/common.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  public exams: ExamListResponseModel[] = []
  public categories: CategoryResponseModel[] = []
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
  public currentExamTnc = new ExamTncResponseModel()

  public startTime: any
  public endTime: any

  public modal = {
    type: 'create',
    title: 'Edit Exam'
  }

  public icons = freeSet

  constructor(
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
        open: ["available"]
      }
    );

    this.templateForm = this.formBuilder.group(
      {
        name: [""]
      }
    )

    this.examFormControls = Object.keys(this.examForm.controls);
    this.searchFormControls = Object.keys(this.searchForm.controls);
    this.templateFormControls = Object.keys(this.templateForm.controls)
  }

  getList() {
    this.isLoading = true

    const title = this.searchForm.get('title')?.value
    const category = this.searchForm.get('category')?.value
    const status = this.searchForm.get('open')?.value

    this.examService.getList(title, category, status).subscribe({
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

  getExamTnc(secureId: string) {
    this.isLoading = true
    
    this.examService.getExamTnc(secureId).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.currentExamTnc = resp.result
        } 
        
        this.isLoading = false
      },
      error: (error) => {
        this.utils.error(error.message)
      }
    });
  }

  applyExam(secureId: string) {
    this.isLoading = true
    
    this.examService.applyExam(secureId).subscribe({
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
      }
    });
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
      this.searchForm.get("open")?.setValue("")
      this.getList()
    }
  }

  submit() {
    switch(this.modal.type) {
      case 'register' :
        this.applyExam(this.currentExamTnc.secureId)
        break
      case 'unregister' : 
        break
    }
  }

  openModal(type: string, data?: ExamListResponseModel) {
    this.modal.type = type

    data = data == null ? new ExamListResponseModel() : data

    switch(type) {
      case 'register' : {
        this.modal.title = 'Exam Registration'
        this.modalService.toggle({id: 'formModal', show: true})
        this.getExamTnc(data.secureId)
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
}