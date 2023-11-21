export class ExamListResponseModel {
    public secureId = ''
    public title = ''
    public category = ''
    public categorySecureId = ''
    public template = ''
    public status = ''
    public statusColor = ''
    public startTime = ''
    public endTime = ''
    public finishTime = ''
    public userSecureId = ''
    public available = false
    public registered = false
    public resume = false
    public availableSlot = 0
    public maxParticipant = 0
    public currentParticipant = 0
    public duration = 0
    public createdAt = new Date()
}

export class ExamTncResponseModel {
    public secureId = ''
    public title = ''
    public category = ''
    public startTime = ''
    public endTime = ''
    public isOnGoing = false
    public startCount = 0
    public endCount = 0
    public duration = 0
    public timeLeft = ''
}