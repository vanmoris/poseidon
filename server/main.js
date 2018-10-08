/* xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import XLSX from 'xlsx';
import moment from 'moment';

import '../imports/api/tasks.js';
// for some reason needed to do import { Tasks }
import { Tasks } from '../imports/api/tasks.js';

Meteor.methods({

  readxlsx: () => {
      const path = Npm.require('path');
      const basepath = path.resolve('.').split('.meteor')[0];
      wb = XLSX.readFile( basepath+'.excel/rawdata.xlsx' );

      // process_wb is now defined in server/lib/utils.js
      const wsData = process_wb(wb, {Type:1, Name:2, Numbers:3, flag:4, Date_Added:5}, "json");

    // insert data into Tasks mongodb collection that is imported on top
    //const test = wsData.find().fetch();
    //wsData.forEach(r => Tasks.update(r,r,{upsert: true}));
    //wsData.forEach(r => Tasks.insert(r));

      var date = new Date();
      var currentTime = moment(date);

      const dbTimestamp = moment(Tasks.findOne({},{"loaded_ts":1}).loaded_ts);

      console.log("currentTS:", currentTime);
      console.log("dbTS: ", dbTimestamp);

      if ( currentTime.diff(dbTimestamp, 'seconds') >= 30){
        wsData.forEach(r => Tasks.update(r, r, { upsert: true }));
        // if we need ts on all of the documents, then set multi: true
        Tasks.update({}, { $set: { loaded_ts: date } }, { upsert: false, multi: false });
        return "Done updating - new timestamp is: " + currentTime.format("YYYY-MM-DD hh:mm:ss a");
      }
      else{
        let ts = currentTime.diff(dbTimestamp, 'seconds');
        return "Your data is already up to date - you can update in: " + (30 - ts) + "s";
      }
    },
});

Meteor.startup(() => {
  {
      const path = Npm.require('path');
      const basepath = path.resolve('.').split('.meteor')[0];
      wb = XLSX.readFile( basepath+'.excel/rawdata.xlsx' );

      // process_wb is now defined in server/lib/utils.js
      const wsData = process_wb(wb, {Type:1, Name:2, Numbers:3, Flag:4, Date_Added:5}, "json");

      let date = new Date();
      // this works
      wsData.forEach(r => Tasks.update(r, r, { upsert: true }));
      // if we need ts on all of the documents, then set multi: true
      Tasks.update({}, { $set: { loaded_ts: date } }, { upsert: false, multi: false });
      // Tasks.insertOne({"TimeStamp": new Date()});
    }
 });
