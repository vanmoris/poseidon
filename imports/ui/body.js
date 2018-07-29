import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';
import XLSX from 'xlsx';

import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});


Template.body.helpers({
 tasks() {
 //   return Tasks.find({}, { sort: { createdAt: -1 } });
      const r = Tasks.find({}, { sort: { createdAt: -1 } });
      console.log(r);
      return r;
 },
 vessel() {
    // not currently used
    // Show newest tasks at the top
    const instance = Template.instance();
    const vesselname = instance.state.get('vesselname')
    if (vesselname) {
       // const r = Tasks.find({ text: vesselname});
       var r = Tasks.findOne({ text: vesselname});
       if(typeof r !== "undefined" ){
    console.log("2111");

 	  var sh =  XLSX.utils.json_to_sheet(r);
    console.log("2111222222");

 	  var table =  XLSX.utils.sheet_to_txt(sh);
    console.log("2232232333333333333333333333");

          return table;
       }else{
	  return "not found da";
	}
    }

  },
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;


    //instead of "inser: we are going to try "uddate"
    // Insert a task into the collection

      Tasks.insert({
        text,
        createdAt: new Date(), // current time
        });


        // Clear form
        target.text.value = '';
  },

  'click .loadfile': function(event){

       Meteor.call('readxlsx', function(err) {
           if(err) {
               console.error(err);
	       $('#msg').html("info>  Error loading excel file, check server log");
           }
           else {
               $('#msg').html("info>  Finished reading file");
             }
      });
  },

 'submit .search'(event,instance) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const vesselname = target.text2.value;

    console.log("hi");

    // Insert a task into the collection
    //{Type:1, Name:2, Flag:3, vin:4, Date_Added:5}
    const results = Tasks.findOne({ Name: vesselname });
    //const results = Tasks.find({ Name: vesselname}).fetch();

    //trying to print results into div
    //still having difulcty printing in div
    document.getElementById("printsearch").innerHTML = JSON.stringify(results);

    //Used "alert" to test if the results could print out
    //alert(JSON.stringify(results));

    console.log(results);

    instance.state.set('Name', vesselname);
    //console.log(vesselname);

    // update the indicator box with color and content
     if(typeof results === "undefined" ){
      $('#indicator').css({"background-color":"red","color":"white"});
      $('#indicator').html("not found");
    }else{
       $('#indicator').css({"background-color":"green","color":"white"});
       $('#indicator').html(" found");
      // var sheet = XLSX.utils.json_to_sheet(results.pretty());
       // setup options
       //       var s2hopts = { editable: falsea};
       // now convert sheet-to-html
       // var html = XLSX.utils.sheet_to_html(sheet);
     //       $('#indicator').html(html);

    }
  },

});
