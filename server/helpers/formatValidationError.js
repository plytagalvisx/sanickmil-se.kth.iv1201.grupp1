module.exports = {
  /**
   * Returns the validation error message without unnecessary information. 
   * @param {The result of the validation} result 
   */
  prettyValidation: function(result) {
    const error = result.array().map(e => {
      return {
        param: e.param,
        message: e.msg
      }
    });
    return error;
  }
}