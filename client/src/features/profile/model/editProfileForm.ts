interface IEditProfileFormFields {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface IEditForm extends Partial<IEditProfileFormFields> {}
