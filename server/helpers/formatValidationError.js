module.exports = {
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