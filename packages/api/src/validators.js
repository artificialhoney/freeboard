export const isValidEmail = (email) => {
  if (!email) {
    return false;
  }
  const emailValidPattern = new RegExp(
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  );
  return emailValidPattern.test(email);
};

export const isStrongPassword = (password) => {
  if (!password) {
    return false;
  }
  const passwordValidPattern = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!*^?+-_@#$%&]{8,}$/,
  );
  return passwordValidPattern.test(password);
};
