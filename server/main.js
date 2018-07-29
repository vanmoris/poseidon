/* xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import XLSX from 'xlsx';

import '../imports/api/tasks.js';
// for some reason needed to do import { Tasks }
import { Tasks } from '../imports/api/tasks.js';


Meteor.methods({
  /* read the data and return the workbook object to the frontend */
  uploadS: (bstr, name) => {
    check(bstr, String);
    check(name, String);
    return XLSX.read(bstr, { type: 'binary' });
  },
  uploadU: (ab, name) => {
    check(ab, Uint8Array);
    check(name, String);
    return XLSX.read(ab, { type: 'array' });
  },
  readxlsx: () => {
    const path = Npm.require('path');
    const basepath = path.resolve('.').split('.meteor')[0];
    wb = XLSX.readFile( basepath+'.excel/MarineData.xlsx' );

    // process_wb is now defined in server/lib/utils.js
    const wsData = process_wb(wb, {Type:1, Name:2, Flag:3, vin:4, Date_Added:5},"json");

    // insert data into Tasks mongodb collection that is imported on top
  //const test = wsData.find().fetch();

//if(test === NULL && task.insert.Date().format('ss') > 86400){

  //wsData.forEach(r => Tasks.insert(r));
  wsData.forEach(r => Tasks.update(r,r,{upsert: true}));

//}
//else
//{
//  $('#msg').html("info> file already loaded");
//}
    // not sure if we need to return anything
    return "this is a return message form server upload(), looks like we are done";
  },
});

Meteor.startup(() => { });
