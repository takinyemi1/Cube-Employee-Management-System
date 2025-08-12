import Salary from "../models/Salary.js";

const addSalary = async (req, res) => {
    try {
        const {
            employeeId,
            generalSalary,
            raises,
            deductions, 
            payDate,
        } = req.body;

        const totalSalary = parseInt(generalSalary) + parseInt(raises) - parseInt(deductions);

        const newSalary = new Salary ({
            employeeId,
            generalSalary,
            raises,
            deductions,
            netSalary: totalSalary,
            payDate
        });

        await newSalary.save();

        return res.status(200).json({
            success: true,
        });

    } catch (error) {
        console.log("Error adding salary: ", error);
        return res.status(500).json({
            success: false,
            error: "Add salary server error",
        })
    }
};

const getSalary = async (req, res) => {
    try {
        const {id} = req.params;
        const salary = await Salary.find({
            employeeId: id
        }).populate("employeeId", "employeeId");

        return res.status(200).json({success: true, salary});

    } catch (error) {
        console.log("Error getting salaries: ", error);
        return res.status(500).json({
            success: false,
            error: "Get Salary server error",
        })
    }
}

export {addSalary, getSalary}