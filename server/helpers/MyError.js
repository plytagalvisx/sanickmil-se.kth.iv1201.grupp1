module.exports = class MyError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(MyError);
  }

  setCode(code) {
    this.errorCode = code;
    return this;
  }
}