const validateEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入邮箱"));
  }
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!reg.test(value)) {
    callback(new Error("邮箱格式不正确"));
  }
  callback();
};

export const loginRules = {
  email: [{ validator: validateEmail }],
  password: [{ required: true, message: "请输入密码" }]
};

export const registerRules = {
  ...loginRules,
  code: [{ required: true, message: "请输入验证码" }],
  username: [{ required: true, message: "请输入用户名" }]
};

export const forgetRules = {
  ...loginRules,
  code: [{ required: true, message: "请输入验证码" }]
};
