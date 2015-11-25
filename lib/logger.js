function Logger() {
  var chalk = require('chalk');

  this.error = function(msg) {
    console.log(chalk.red('>> ERR!\t') + ' ' + chalk.white(msg));
  }
  this.success = function(msg) {
    console.log(chalk.green('>> SUCCESS\t') + ' ' + chalk.white(msg));
  }
}

module.exports = new Logger();