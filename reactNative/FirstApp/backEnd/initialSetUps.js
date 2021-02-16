const Role = require("./models/roles");



exports.createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({Name: "user"}).save(),
      new Role({Name: "admin"}).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error("Err: ",error);
  }
};
