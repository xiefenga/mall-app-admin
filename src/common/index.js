function handleGetCode(validator, fields, errorCallback, successCallback) {
  validator(fields, async errorMessage => {
    if (errorMessage) {
      errorCallback(errorMessage);
    } else {
      successCallback();
    }
  });
}

export { handleGetCode };
