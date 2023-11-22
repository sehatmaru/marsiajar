import { RoleEnum } from "../enum/role.enum"

export class LoginRequestModel {
    public email = ''
    public password = ''
    public role = RoleEnum.LEARNER
}

export class LoginResponseModel {
    public username = ''
    public email = ''
    public firstName = ''
    public lastName = ''
    public secureId = ''
    public accessToken = ''
}

export class RegisterRequestModel {
    public password = ''
    public email = ''
    public firstName = ''
    public lastName = ''
    public role = RoleEnum.LEARNER
}

export class RegisterResponseModel {
    public temporaryToken = ''
}

export class VerifyOtpRequestModel {
    public otp = ''
}

export class EditProfileRequestModel {
    public fullname = ''
    public email = ''
}

export class ChangePasswordRequestModel {
    public oldPassword = ''
    public newPassword = ''
}

export class ForgotPasswordRequestModel {
    public email = ''
}

export class ResetPasswordRequestModel {
    public code = ''
    public newPassword = ''
}
