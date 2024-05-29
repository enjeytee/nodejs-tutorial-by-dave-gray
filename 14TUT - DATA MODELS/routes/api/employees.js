const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
// const verifyJWT = require("../../middleware/verifyJWT"); // <- DO THIS IF YOU WANT TO PROTECT SPECIFIC ROUTES IF NOT, MOVE IT TO server.js
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  // .get(verifyJWT, employeesController.getAllEmployees) // <- DO THIS IF YOU WANT TO PROTECT SPECIFIC ROUTES
  .get(employeesController.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.createNewEmployee
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.updateEmployee
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
