export const TEL_LENGTH = 9
export const INN_LENGTH = 9

export const inputRules = {
  required: (v: any) => !!v || v === 0 || 'Поле обязательно для заполнения',
  arrayRequired: (value) => (Array.isArray(value) && value.length > 0) || 'Поле обязательно для заполнения',
  tel_number: (v: any) => {
    let a = false
    if (!v || v.length === TEL_LENGTH) {
      a = true
    }
    return a || `Номер телефона должен быть ${TEL_LENGTH} цифр`
  },
  inn_number: (v: any) => {
    let a = false
    if (!v || v.length === INN_LENGTH) {
      a = true
    }
    return a || `Номер ИНН должен быть ${INN_LENGTH} цифр`
  },
  password: (v: any) => {
    let a = false
    if (!v || v.length >= 6) {
      a = true
    }
    return a || `Пароль должен быть минимум 6 символов`
  },
  fileRules: (v: any) => {
    return (!!v?.length) || 'Поле обязательно для заполнения'
  },
}
