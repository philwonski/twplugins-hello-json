/*\
/*\
title: philwonski/twplugins-hello-json/hj.js
type: application/javascript
module-type: widget
helloJson widget
\*/

// Hello Json widget
// use like <$hellojson command="hangover"/>

(function() {

  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";
  
  var Widget = require("$:/core/modules/widgets/widget.js").widget;

  /* Import the HeyJson class with all the cool methods */
  const HeyJson = require("$:/plugins/philwonski/twplugins-hello-json/classHeyJson.js");

  var MyWidget = function(parseTreeNode, options) {
      this.initialise(parseTreeNode, options);
      this.reply = '';
  };
  
  /*
  Inherit from the base widget class
  */
  MyWidget.prototype = new Widget();
  
  /*
  Render this widget into the DOM
  */
  MyWidget.prototype.render = async function(parent, nextSibling) {

      this.parentDomNode = parent;
      this.computeAttributes();
      // var reply = this.execute();
      var reply = await this.execute();
      var textNode = this.document.createTextNode(reply);
      parent.insertBefore(textNode, nextSibling);
      this.domNodes.push(textNode);
  };

  /*
  Do execution of logic
  */

  MyWidget.prototype.execute = async function() { 
      // get the command the user provided in the frontend widget invocation
      var COMMAND = this.getAttribute("command");

      // ******************************************************************************** //
      //  EXAMPLE- HANGOVER: get Json from wikipedia and return some info from inside it
      // ******************************************************************************** //
      if (COMMAND == "hangover") {
        // Find out how many people looked at the english wikipedia page for Hangover on a given day
        // use in your wiki like <$hellojson command="hangover"/>
        // We only need one method of the HeyJson class to get this info:
        // 1. runFetch() - this is a wrapper for the fetch() method to go get the json from the url

        // first assign the HeyJson class to a variable
        var heyJson = new HeyJson();

        // now let's set up our wikipedia query (thanks wikipedia!)
        // let's see how many people visited the wikipedia page for "Hangover" on New Year's Day 2023
        var day = "20230101";
        // this is the url format to use wikipedia's free api to get the info we want
        var url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/Hangover/daily/${day}/${day}`;

        // HERE'S THE MAGIC
        // this is where we use the HeyJson class to get the json from the url
        var wiki = await heyJson.runFetch(url);
        // parse the JSON string returned from the wikipedia api via runFetch()
        var wiki_obj = JSON.parse(wiki);
        // wiki_obj is now the json returned from the wikipedia api
        // since we only asked for one day, we only have one item in the array, item[0]
        var views = wiki_obj.items[0].views;
        var msg = "On New Year's Day 2023, " + views + " people looked at the wikipedia page for \"Hangover.\"";

      return msg;

  } else if (COMMAND == "test" || COMMAND == "hello" || COMMAND == undefined || COMMAND == "") {
    var reply = "Hello, World! The plugin is installed.";
    return reply;
  } 
};
  
  /*
  Refresh if the attribute value changed since render
  */
  MyWidget.prototype.refresh = function(changedTiddlers) {
      // Find which attributes have changed
      var changedAttributes = this.computeAttributes();
      if (changedAttributes.message) {
          this.refreshSelf();
          return true;
      } else {
          return false;
      }
  };
  
  exports.hellojson = MyWidget;
  
  })();