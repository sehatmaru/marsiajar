import { RegisterTypeEnum } from "../enum/register-type.enum"

export class UserResponseModel {
    public gender = ''
    public email = ''
    public name = ''
    public secureId = ''
    public accessToken = ''
    public active = false
}

export class UserRequestModel {
    public name = ''
    public gender = ''
    public email = ''
    public active = false
    public type = RegisterTypeEnum.EMAIL
}

export class UpdateUserRequestModel {
    public name = ''
    public gender = ''
    public email = ''
}

export class AddUpdateAdminRequestModel {
    public firstName = ''
    public lastName = ''
    public email = ''
}

export class TemplateResponseModel {
    public name = ''
    public createdAt = new Date()
    public secureId = ''
    public isSelected = false
}

export class AddUpdateTemplateRequestModel {
    public name = ''
}

export class AddUpdateBenefitRequestModel {
    public secureId = ''
    public desc = ''
}

export class AddUpdateWebinarRequestModel {
    public category = ''
    public date = new Date()
    public link = ''
    public meetingId = ''
    public passcode = ''
    public price = 0
    public title = ''
}

export class WebinarListResponseModel {
    public title = ''
    public secureId = ''
    public categorySecureId = ''
    public category = ''
    public available = false
    public date = new Date()
    public rating = 0
}

export class WebinarResponseModel {
    public title = ''
    public secureId = ''
    public available = false
    public date = new Date()
    public link = ''
    public meetingId = ''
    public passcode = ''
    public categorySecureId = ''
    public category = ''
    public price = 0
    public rating = 0
}

export class CourseListResponseModel {
    public price = 0
    public categorySecureId = ''
    public category = ''
    public title = ''
    public secureId = ''
    public available = false
    public rating = 0
}

export class CourseResponseModel {
    public price = 0
    public categorySecureId = ''
    public category = ''
    public benefits: CourseBenefitResponseModel[] = []
    public title = ''
    public secureId = ''
    public available = false
    public rating = 0
}

export class CourseBenefitResponseModel {
    public secureId = ''
    public desc = ''
}

export class AddUpdateCourseRequestModel {
    public title = ''
    public price = 0
    public category = ''
    public benefits: AddUpdateBenefitRequestModel[] = []
}

export class QuestionListResponseModel {
    public content = ''
    public secureId = ''
    public categorySecureId = ''
    public category = ''
    public createdBy = ''
    public editedBy = ''
}

export class QuestionResponseModel {
    public answers: AnswerResponseModel[] = []
    public content = ''
    public categorySecureId = ''
    public category = ''
    public secureId = ''
    public createdBy = ''
    public editedBy = ''
}

export class AddUpdateQuestionRequestModel {
    public content = ''
    public category = ''
    public isSaved = false
    public isValid = false
    public id = 0
    public answers: AddUpdateAnswerRequestModel[] = []
}

export class AddUpdateAnswerRequestModel {
    public content = ''
    public correctAnswer = false
}

export class AnswerResponseModel {
    public secureId = ''
    public correctAnswer = false
    public content = ''
}

export class BenefitResponseModel {
    public secureId = ''
    public maskDesc = ''
    public desc = ''
    public isSelected = false
}

export class CategoryResponseModel {
    public secureId = ''
    public title = ''
    public createdAt = new Date()
    public updatedAt = new Date()
}

export class AddUpdateCategoryRequestModel {
    public secureId = ''
    public title = ''
}

export class AddUpdateExamRequestModel {
    public title = ''
    public template = ''
    public category = ''
    public available = true
    public maxParticipant = 0
    public duration = 0
    public startAt = new Date()
    public endAt = new Date()
}

export class ExamResponseModel {
    public secureId = ''
    public title = ''
    public template = ''
    public available = ''
    public category = ''
    public categorySecureId = ''
    public availableSlot = 0
    public totalSlot = 0
    public duration = 0
    public startAt = new Date()
    public endAt = new Date()
    public createdAt = new Date()
}

export class ExamListResponseModel {
    public secureId = ''
    public title = ''
    public category = ''
    public categorySecureId = ''
    public template = ''
    public available = ''
    public availableSlot = 0
    public createdAt = new Date()
}

export class InvoiceListResponseModel {
    public secureId = ''
    public consumerName = ''
    public invoiceId = ''
    public invoiceStatus = ''
    public invoiceType = ''
    public paymentChannel = ''
    public totalAmount = 0
    public paymentMethod = ''
    public createdAt = new Date()
}

export class InvoiceListRequestModel {
    public customerName = ''
    public invoiceId = ''
    public status = ''
    public category = ''
}

export class InvoiceDetailResponseModel {
    public secureId = ''
    public consumerName = ''
    public invoiceId = ''
    public invoiceStatus = ''
    public invoiceType = ''
    public paymentChannel = ''
    public totalAmount = 0
    public paymentMethod = ''
    public invoiceUrl = ''
    public bankCode = ''
    public invoiceDeadline = new Date()
    public paidDate = new Date()
    public createdAt = new Date()
    public deletedAt = new Date()
}
