import Employee from '../models/Employee.js';
import LeaveRequest from '../models/LeaveRequest.js';

const addRequest = async (req, res) => {
    try {
        const {
            userId,
            requestType,
            startDate,
            endDate,
            reason,
        } = req.body;

        const employee = await Employee.findOne({userId});
        console.log(req.body);

        const newRequest = new LeaveRequest({
            employeeId: employee._id,
            requestType,
            startDate,
            endDate,
            reason
        });
        
        await newRequest.save()

        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.log(error.message);
        console.log("Error adding request: ", error);
        return res.status(500).json({
            success: false,
            error: "Error adding time off request"
        });
    }
}

const getRequests = async (req, res) => {
    try {
        const {id} = req.params;
        const employee = await Employee.findOne({userId: id});

        const requests = await LeaveRequest.find({employeeId: employee._id});
        return res.status(200).json({
            success: true,
            requests
        })
    } catch (error) {
        console.log(error.message);
        console.log("Error retrieving requests: ", error);
        return res.status(500).json({
            success: false,
            error: "Error retrieving time off requests"
        });   
    }
}

export { addRequest, getRequests }