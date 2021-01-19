const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Por favor ingrese un correo electronico válido"
    ]
  },
  password: {
    type: String,
    require: true
  },
  skills: {
    type: [String]
  }
});

module.exports = Employee = mongoose.model("employee", EmployeeSchema);
