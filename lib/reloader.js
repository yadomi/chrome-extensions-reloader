var exec = require('sync-exec');

function ChromeExtensionsReloader() {

  this.hasChromeCLI = function() {
    return !exec('which chrome-cli').status;
  }

  this.getScript = function() {
    return [
      "NodeList.prototype.forEach = Array.prototype.forEach;",
      "document.querySelectorAll('.reload-link').forEach(function(link){",
        "if (link.offsetParent === null) return;",
        "link.click();",
      "});",
    ].join('');
  }

  this.injectReloadScript = function(tabId) {
    var result = exec('chrome-cli execute "' + this.getScript() + '" -t ' + tabId)
    return !result.stdout;
  }

  this.getExtensionsTabId = function() {
    var regexTest = exec('chrome-cli list tabs | grep "Extensions"').stdout.match(/\[(\d+):(\d+)\]/);
    return regexTest ? regexTest[2] : false;
  }

};

module.exports = new ChromeExtensionsReloader();