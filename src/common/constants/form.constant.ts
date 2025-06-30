export interface IInputFieldProps {
  name: string;
  label?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  className?: string;
}

const commonFields: IInputFieldProps[] = [
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Nhập email của bạn',
  },
  {
    label: 'Mật khẩu',
    name: 'password',
    type: 'password',
    placeholder: 'Nhập mật khẩu',
  },
];

export const INPUT_FIELDS = (
  type: 'register' | 'login' | 'forgotPassword' | 'verifyOTP' | 'resetPassword'
): IInputFieldProps[] => {
  const fields: Record<
    'register' | 'login' | 'forgotPassword' | 'verifyOTP' | 'resetPassword',
    IInputFieldProps[]
  > = {
    register: [
      {
        label: 'Tên người dùng',
        name: 'username',
        type: 'text',
        placeholder: 'Nhập tên người dùng',
      },
      ...commonFields,
      {
        label: 'Xác nhận mật khẩu',
        name: 'confirmPassword',
        type: 'password',
        placeholder: 'Nhập lại mật khẩu',
      },
    ],
    login: [...commonFields],
    forgotPassword: [
      {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'Nhập email để khôi phục',
      },
    ],
    verifyOTP: [
      {
        label: 'Mã xác thực',
        name: 'code',
        type: 'number',
        placeholder: 'Nhập mã 6 chữ số',
      },
    ],
    resetPassword: [
      {
        label: 'Mật khẩu mới',
        name: 'password',
        type: 'password',
        placeholder: 'Nhập mật khẩu mới',
      },
      {
        label: 'Xác nhận mật khẩu',
        name: 'confirmPassword',
        type: 'password',
        placeholder: 'Nhập lại mật khẩu mới',
      },
    ],
  };

  return fields[type];
};

const BUTTON_TYPE: Record<string, string> = {
  login: 'Đăng nhập',
  register: 'Tạo tài khoản',
  forgotPassword: 'Gửi yêu cầu',
  verifyOTP: 'Xác thực',
  resetPassword: 'Đặt lại mật khẩu',
};

export const BUTTON_TITLE = (type: string): string => {
  return BUTTON_TYPE[type] || 'Submit';
};
