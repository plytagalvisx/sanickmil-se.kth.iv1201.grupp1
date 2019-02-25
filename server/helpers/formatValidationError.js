module.exports = {
  /**
   * Returns the validation error message without unnecessary information. 
   * @param {Object} result The result from the validation
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