const fs = require('fs')

const LEVEL = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  CHAOS: 'CHAOS'
}

class Logger {

  /**
   * Creates a logger that writes to specified file
   * @param {String} file Name of the new file
   */
  constructor(file) {
    if (!file)
      throw new Error('You must specify a file-name.')
    this.fileName = file;
  }

  createMessage(level, msg, ...args) {
    const date = new Date();
    return `[${date.toISOString().substring(0, 10)} ${date.toTimeString().split(' ')[0]}] [${level}] ${msg} ${args ? `: ${args}` : ''}\n`;
  }

  writeToFile(text) {
    fs.appendFile(this.fileName+'.log', text, (err) => {
      if (err) {
        console.log('Error logging....', err);
      }
    });
  }

  /**
   * Logs a message at info level
   * @param {String} msg Message to log at regular INFO level
   */
  log(msg, ...args) {
    this.writeToFile( this.createMessage(LEVEL.INFO, msg, args) );
  }

  /**
   * Logs a message at chaos level
   * @param {String} msg Message to log at regular CHAOS level
   */
  chaos(msg, ...args) {
    this.writeToFile( this.createMessage(LEVEL.CHAOS, msg, args) );
  }

  /**
   * Logs a message at error level
   * @param {String} msg Message to log at regular ERROR level
   */
  error(msg, ...args) {
    this.writeToFile( this.createMessage(LEVEL.ERROR, msg, args) );
  }

  /**
   * Logs a message at warning level
   * @param {String} msg Message to log at regular WARN level
   */
  warn(msg, ...args) {
    this.writeToFile( this.createMessage(LEVEL.WARN, msg, args) );
  }
}

module.exports = Logger;