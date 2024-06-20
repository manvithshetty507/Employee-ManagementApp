
const Employee = require('../models/employee');

const createEmployee = async (req, res) => {
    const employeeReq = req.body;

    try {
        console.log("Recived a employee with body: ", employeeReq);
        const employee = new Employee(employeeReq);
        await employee.save();
        res.status(200).json({message:"Employee Added",employee});
    }catch(err) {
        console.log(err.message);
        res.status(400).json({message:err.message})
    }
}

const getAll = async (req, res) => {
    try {
        const employees = await Employee.find().exec(); // Execute the query and await the result
        res.status(200).json({ employees }); // Return employees as JSON response
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Failed to fetch employees" });
    }
}

const getById = async (req, res) => {
    const { objectId } = req.params;
    console.log("fetchind emp with id: ", objectId)
    try {
        // Fetch the employee by ID
        
        const employee = await Employee.findOne({_id:objectId});
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Return the employee as a JSON response
        res.status(200).json({ employee });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: "Failed to fetch employee" });
    }
}


const editEmployee = async (req, res) => {
    const { objectId } = req.params;
    const updateData = req.body;
    
    try {
        // Fetch the employee by ID
        const employee = await Employee.findOne({_id:objectId});
        console.log("employee ", employee);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Update only the fields that are provided in the request body
        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== null && updateData[key] !== undefined) {
                employee[key] = updateData[key];
            }
        });

        // Save the updated employee
        await employee.save();

        res.status(200).json({ message: "Employee updated successfully", employee });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createEmployee,
    editEmployee,
    getAll,
    getById
}