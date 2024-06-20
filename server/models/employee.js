const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const employeeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      }
    },
    mobile: {
      type: String,
      required: true
    },
    designation: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    course: {
      type: String
    },
    image: {
      type: String,
      required: false
    },
    creationDate: {
      type: String,
      required: true,
      default: () => moment().format('DD-MM-YYYY')
    }
  },{collection:"employees"});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;