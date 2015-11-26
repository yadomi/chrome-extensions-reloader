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
    var result = exec('chrome-cli list tabs | grep "Extensions"').stdout;
    var regexTest = result.match(/\[([0-9 :]+)\]/)[1].split(':').pop();
    return regexTest ? regexTest : false;
  }

};

module.exports = new ChromeExtensionsReloader();