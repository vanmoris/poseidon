import { Mongo } from 'meteor/mongo';
 
export const Tasks = new Mongo.Collection('tasks');


//We will start by putting "Collections" the equivalent of Tables in SQL

//And we will add:
// "publications" are used to read from "collections
// "methods" are used to write to "collections"
