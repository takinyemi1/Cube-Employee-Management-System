import mongoose from "mongoose";
import { Schema } from "mongoose";

const requestSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    requestType: {
        type: String,
        enum: ["Vacation Request (PTO)", "Annual Leave Request (PTO)", "Sabbatical Leave Request (PTO)", "Medical Leave Request (PTO)", "Disability Leave Request (PTO)", "Parental Leave Request (PTO)", "Jury Duty Leave Request (PTO)", "Emergency Leave Request (PTO)"],
        required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: {
        type: String,
        enum: ["Pending Approval", "Approved", "Rejected"],
        default: "Pending Approval",
    },
    appliedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const LeaveRequest = mongoose.model("LeaveRequest", requestSchema);
export default LeaveRequest;