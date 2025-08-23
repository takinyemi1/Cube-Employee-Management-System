import multer, { diskStorage } from "multer"
import Employee from "../models/Employee.js"
import User from "../models/user.js"
import bcrypt from 'bcrypt'
import path from "path"
import Department from '../models/Department.js'

const storage = multer.diskStorage({
    destination: (req, file, cb) => { // where to store the file
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage })

const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;
        console.log("Incoming form data: ", req.body);

        const user = await User.findOne({ email })
        if (user) {
            console.log("[ERROR] User already exists: ", email, employeeID)
            return res.status(400).json({
                success: false,
                error: "User already exists."
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        // register a user
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : "", // exists?
        });

        const savedUser = await newUser.save();

        // store employee data
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        });

        console.log("Employee Id: ", employeeId)

        const savedEmployee = await newEmployee.save();
        console.log("[SUCCESS] Employee created: ", savedEmployee);

        return res.status(200).json({ success: true, message: "New employee has been added." })
    } catch (e) {
        console.log("Error: ", e);
        return res.status(500).json({ success: false, error: "Server error in adding employee." })
    }
}

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId', { password: 0 }).populate('department');
        return res.status(200).json({
            success: true,
            employees
        })
    } catch (error) {
        console.log("Get Employees Server Error: ", error);
        return res.status(500).json({
            success: false,
            error: "Get Employees Server Error"
        });
    }
}

const getEmployee = async (req, res) => {
    const {id} = req.params;
    try {
        let employee;
        employee = await Employee.findById({_id: id}).populate('userId', { password: 0 }).populate('department');

        if (!employee) {
            employee = await Employee.findOne({userId: id})
                .populate('userId', { password: 0 })
                .populate('department');
        }

        return res.status(200).json({
            success: true,
            employee
        })
    } catch (error) {
        console.log("Get Employee Server Error: ", error);
        return res.status(500).json({
            success: false,
            error: "Get Employee Server Error"
        });
    }
}

const updateEmployee = async (req, res) => {
    try {
        const {id} = req.params;
        const {
            name,
            maritalStatus,
            designation,
            department,
            salary
        } = req.body;
        console.log(req.body);

        const employee = await Employee.findById({_id: id});

        if (!employee) {
            return res.status(404).json({
                success: false,
                error: "Employee Not Found",
            })
        }

        const user = await User.findById({_id: employee.userId});

        if (!user) {
            return res.status(404).json({
                success: false, 
                error: "User Not Found",
            })
        }

        const updateUser = await User.findByIdAndUpdate({_id: employee.userId}, {name});
        const updateEmployee = await Employee.findByIdAndUpdate({_id: id}, {
            maritalStatus,
            designation,
            salary,
            department,
        });

        if (!updateEmployee || !updateUser) {
            return res.status(404).json({
                success: false, 
                error: "Document Not Found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Employee Updated",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Update Employees Server Error",
        })
    }
}

const fetchEmployeesByDepId = async (req, res) => {
    const {id} = req.params;
    try {
        const employees = await Employee.find({department: id});
        return res.status(200).json({
            success: true, 
            employees
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error fetching employees by department Id"
        })
    }
}

export { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId }