const validator = require("validator");
const createError = require("http-errors");
const Employee = require("../models/employeeModel");

exports.create = async (req, res) => {
  try {
    let { emp_eid, emp_name, emp_img, emp_gender, emp_phn_num, emp_email, emp_DOB, emp_designation, emp_joining_date } = req.body;
    if (!emp_eid || !validator.isInt(emp_eid)) {
      throw createError(400, "Invalid Eid");
    }
    if (!emp_name.trim() || !validator.isAlpha(emp_name.trim(), ["en-US"], { ignore: " " })) {
      throw createError(400, "Invalid Name");
    }
    if (!emp_img.trim()) {
      throw createError(400, "Invalid Image");
    }
    if (!emp_gender.trim()) {
      throw createError(400, "Invalid Gender");
    }
    if (!emp_phn_num.trim() || !validator.isMobilePhone(emp_phn_num, ["bn-BD"])) {
      throw createError(400, "Invalid Phone Number");
    }
    if (!emp_email.trim() || !validator.isEmail(emp_email)) {
      throw createError(400, "Invalid Email");
    }
    if (!emp_DOB || !validator.isDate(emp_DOB)) {
      throw createError(400, "Invalid Date of Birth");
    }
    if (!emp_designation.trim() || !validator.isAlpha(emp_designation, ["en-US"], { ignore: " " })) {
      throw createError(400, "Invalid Designation");
    }
    if (!emp_joining_date || !validator.isDate(emp_joining_date)) {
      throw createError(400, "Invalid Date of Birth");
    }

    let result = await Employee.create({
      emp_eid,
      emp_name,
      emp_img,
      emp_gender,
      emp_phn_num,
      emp_email,
      emp_DOB,
      emp_designation,
      emp_joining_date,
    });

    if (result) {
      res.status(201).json({
        status: "Success",
        msg: result,
      });
    } else {
      throw createError(500, "Interval Server error");
    }
  } catch (error) {
    res.status(error.status || 500).json({
      status: "Error",
      msg: error.message,
    });
  }
};

exports.list = async (req, res) => {
  try {
    let result = await Employee.find({});
    console.log(result);
    if (result) {
      res.status(200).json({
        status: "Success",
        msg: result,
      });
    } else {
      throw createError(500, "Interval Server error");
    }
  } catch (error) {
    res.status(error.status || 500).json({
      status: "Error",
      msg: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id) {
      throw createError(400, "Employee ID is required");
    }

    // Check fo employee
    const existingEmployee = await Employee.findById(id);
    if (!existingEmployee) {
      throw createError(400, "Employee not found");
    }

    let { emp_eid, emp_name, emp_gender, emp_phn_num, emp_email, emp_DOB, emp_designation, emp_joining_date } = req.body;

    if (!emp_eid || !validator.isInt(emp_eid)) {
      throw createError(400, "Invalid Eid");
    }

    if (!emp_name.trim() || !validator.isAlpha(emp_name.trim(), ["en-US"], { ignore: " " })) {
      throw createError(400, "Invalid Name");
    }
    if (!validator.isBoolean(emp_gender)) {
      throw createError(400, "Invalid Gender");
    }
    if (!emp_phn_num.trim() || !validator.isMobilePhone(emp_phn_num, ["bn-BD"])) {
      throw createError(400, "Invalid Phone Number");
    }
    if (!emp_email.trim() || !validator.isEmail(emp_email)) {
      throw createError(400, "Invalid Email");
    }
    if (!emp_DOB || !validator.isDate(emp_DOB)) {
      throw createError(400, "Invalid Date of Birth");
    }
    if (!emp_designation.trim() || !validator.isAlpha(emp_designation, ["en-US"], { ignore: " " })) {
      throw createError(400, "Invalid Designation");
    }
    if (!emp_joining_date || !validator.isDate(emp_joining_date)) {
      throw createError(400, "Invalid Date of Birth");
    }

    // Update the employee
    const updateData = {
      emp_name,
      emp_gender,
      emp_phn_num,
      emp_email,
      emp_DOB,
      emp_designation,
      emp_joining_date,
    };

    let result = await Employee.findByIdAndUpdate(id, updateData, { new: true });

    if (result) {
      res.status(200).json({
        status: "Success",
        msg: result,
      });
    } else {
      throw createError(500, "Interval Server error");
    }
  } catch (error) {
    res.status(error.status || 500).json({
      status: "Error",
      msg: error.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id) {
      throw createError(400, "Employee ID is required");
    }

    // Check fo employee
    const existingEmployee = await Employee.findById(id);
    if (!existingEmployee) {
      throw createError(400, "Employee not found");
    }

    let result = await Employee.findByIdAndRemove(id);

    if (result) {
      res.status(200).json({
        status: "Success",
        msg: result,
      });
    } else {
      throw createError(500, "Interval Server error");
    }
  } catch (error) {
    res.status(error.status || 500).json({
      status: "Error",
      msg: error.message,
    });
  }
};
