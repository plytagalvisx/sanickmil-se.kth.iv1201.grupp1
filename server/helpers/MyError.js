module.exports = class MyError extends Error {
  /**
   * Create a custom error object which holds an error code and saves the stack trace.
   * @param  {...any} args Error message(s)
   */
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(MyError);
  }
  /**
   * Sets the error code enum
   * @param {Number} code The error code
   */
  setCode(code) {
    this.errorCode = code;
    return this;
  }
}