const express = require("express");
const router = express.Router();
const path = require("path");
const employeesController = require("../../controllers/employeesController");
// const verifyJWT = require("../../middleware/verifyJWT"); // <- DO THIS IF YOU WANT TO PROTECT SPECIFIC ROUTES IF NOT, MOVE IT TO server.js

router
  .route("/")
  // .get(verifyJWT, employeesController.getAllEmployees) // <- DO THIS IF YOU WANT TO PROTECT SPECIFIC ROUTES
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee)
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
