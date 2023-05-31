import Joi from 'joi';

type PCreateUser = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

type PSignIn = {
  username: string;
  password: string;
};

class UserValidation {
  public CreateValidation(payload: PCreateUser) {
    const schema = Joi.object<PCreateUser>({
      email: Joi.string().email().required().messages({
        'string.base': 'email harus berupa string',
        'string.empty': 'email dibutuhkan',
        'string.email': 'masukkan email yang valid',
        'any.required': 'email dibutuhkan'
      }),
      username: Joi.string().min(6).max(30).required().messages({
        'string.base': 'username harus berupa string',
        'string.empty': 'username dibutuhkan',
        'string.min': 'username minimal harus memiliki {#limit} karakter',
        'string.max': 'username maksimal harus memiiki {#limit} karakter',
        'any.required': 'username dibutuhkan'
      }),
      password: Joi.string().min(8).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
        'string.base': 'password harus berupa string',
        'string.empty': 'password dibutuhkan',
        'string.min': 'password minimal harus memiliki {#limit} karakter',
        'any.required': 'password dibutuhkan'
      }),
      confirmPassword: Joi.string().min(8).required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).messages({
        'string.base': 'konfirmasi password harus berupa string',
        'string.empty': 'konfirmasi password dibutuhkan',
        'string.min': 'konfirmasi password minimal harus memiliki {#limit}',
        'any.required': 'konfirmasi password dibutuhkan'
      })
    });

    return schema.validateAsync(payload);
  }

  public SignInValidation(payload: PSignIn) {
    console.log(payload);
    const schema = Joi.object({
      username: Joi.string().min(6).max(30).required().messages({
        'string.base': 'username harus berupa string',
        'string.empty': 'username dibutuhkan',
        'string.min': 'username minimal harus memiliki {#limit} karakter',
        'string.max': 'username maksimal harus memiiki {#limit} karakter',
        'any.required': 'username dibutuhkan'
      }),
      password: Joi.string().min(8).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
        'string.base': 'password harus berupa string',
        'string.empty': 'password dibutuhkan',
        'string.min': 'password minimal harus memiliki {#limit} karakter',
        'any.required': 'password dibutuhkan'
      })
    });

    return schema.validateAsync(payload);
  }
}

export default new UserValidation();
