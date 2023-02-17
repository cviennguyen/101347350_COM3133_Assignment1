const Employee = require("./models/Employee");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const resolvers = {
  Query: {
    getAllEmployees: async (parent, args) => {
      try {
        const employees = await Employee.find();
        return employees;
      } catch (err) {
        console.log(err);
      }
    },
    getEmployee: async (parent, args) => {
      try {
        const employee = await Employee.findById(args.id);
        if (!employee) throw new Error("Employee not found");
        return employee;
      } catch (err) {
        console.log(err);
      }
    },
  },

  Mutation: {
    createEmployee: async (parent, args) => {
      try {
        const employee = new Employee(args.employee);
        await employee.save();
        return employee;
      } catch {
        console.log(err);
      }
    },

    deleteEmployee: async (parent, args) => {
      try {
        const { id } = args;
        const emp = await Employee.findByIdAndDelete(id);
        if (emp) {
          return "Employee deleted successfully";
        } else {
          return "Employee not found";
        }
      } catch (err) {
        console.log(err);
      }
    },
    updateEmployee: async (parent, args) => {
      try {
        const { id } = args;
        const emp = await Employee.findByIdAndUpdate(id, args.employee, {
          new: true,
        });
        if (emp) {
          return emp;
        } else {
          return "Employee not found";
        }
      } catch (err) {
        console.log(err);
      }
    },
    signup: async (parent, args) => {
      try {
        User.create(args.user);
        return "User created successfully";
      } catch (err) {
        console.log(err);
      }
    },
    login: async (parent, args) => {
      try {
        const user = await User.findOne({ username: args.username });
        if (!user) {
          return "User not found";
        }
        const valid = await bcrypt.compare(args.password, user.password);
        if (!valid) {
          return "Invalid password";
        }
        return "Login successful";
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = resolvers;
