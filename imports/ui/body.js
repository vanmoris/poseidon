import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';
import XLSX from 'xlsx';
import moment from 'moment';

import './body.html';

Template.registerHelper('fromNow', function(date){
  if (date)
  return moment(date).fromNow(true);
});

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

    const vesselname = instance.state.get('vesselname');
    const vesselvin = instance.state.get('vesselvin');

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
       }
       else{
	           return "not found data";
	          }
    }

/////////Copied vesselname if
    if (vesselvin) {
       // const r = Tasks.find({ text: vesselname});
       var r = Tasks.findOne({ text: vesselvin});
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
//////////End copied vesselname if

  },
});

Template.body.events({

  'click .loadfile': function(event){
    //console.log(Tasks.findOne("loaded", true));
     Meteor.call('readxlsx', function(err, messageFromServer) {
           if(err) {
               console.error(err);
	       $('#msg').html("info>  Error loading excel file, check server log");
           }
           else {
             //var date = new Date();
            //var inDate= moment(date).calendar();
            //$('#msg').html("info>  Finished loading Data file "+ inDate);
              $('#msg').html("info>  "+ messageFromServer);
            //console.log(inDate);
             }
      });
  },

 'submit .search'(event,instance) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element for vessel Name
    const target = event.target;
    const vesselname = target.text2.value;

    //Get value from form element for vessel vin
    const vesselvin = target.text2.value;

    console.log("hi");

    // Insert a task into the collection
    //{Type:1, Name:2, Flag:3, vin:4, Date_Added:5}
    const results = Tasks.findOne({
      $or:[
        { Name: vesselname },
        { vin:vesselvin }
      ]
    });

    //const results = Tasks.find({ Name: vesselname}).fetch();
    //print results into div
    document.getElementById("printsearch").innerHTML = JSON.stringify(results);
    //document.getElementById("printsearch").innerHTML = JSON.stringify(resultsV);

    //Used "alert" to test if the results could print out
    //alert(JSON.stringify(results));

    console.log(results);

    //console.log(new Date(parseInt(results._id.slice(0,8), 16) *1000));
    instance.state.set('Name', vesselname);
    instance.state.set('vin', vesselvin);

    //console.log(vesselname);
    // update the indicator box with color and content
     if(typeof results === "undefined"){
      $('#indicator').css({"background-color":"red","color":"white"});
      $('#indicator').html("Not Found");
      }
      else
      {
       $('#indicator').css({"background-color":"green","color":"white"});
       $('#indicator').html("Found");
     }
      // var sheet = XLSX.utils.json_to_sheet(results.pretty());
       // setup options
       //       var s2hopts = { editable: falsea};
       // now convert sheet-to-html
       // var html = XLSX.utils.sheet_to_html(sheet);
     //       $('#indicator').html(html);

  },
});
