const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({

    title: {

            type: String,
            required: [true, "Title is required"],
            trim: true
        },

    description: {

            type: String,
            trim: true,
            default: ""
        },

    status:{

        type: String,
        enum: {
            values: ["pending", "completed"],
            message: "Status must be either pending or completed"
        },
        default: "pending"
    },

    priority: {
            type: String,
            enum: {
                values: ["low", "medium", "high"],
                message: "Priority must be low, medium, or high"
            },
            default: "medium"
        },
    dueDate: {
            type: Date,
            default: null
        },
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
   
},

{ 
    timestamps: true
})

module.exports = mongoose.model("Task", taskSchema)