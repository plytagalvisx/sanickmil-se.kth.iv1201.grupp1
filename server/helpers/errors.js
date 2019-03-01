let i = 0;
module.exports = {
  USER: {
    NOT_FOUND: i++,
    DUPLICATE: i++,
    INCOMPLETE: i++
  },
  APPLICATION: {
    NOT_FOUND: i++,
    ALREADY_SUBMITTED: i++,
    INCOMPLETE_PARAMS: i++
  },
  AUTH: {
    NOT_FOUND: i++
  },
  DB: {
    ERROR: i++
  },
  TOKEN: {
    VERIFY: i++
  },
  GENERAL: {
    GENERIC: i++,
    EASTEREGG: i++
  }
}