import mongoose from "mongoose"

const Schema = mongoose.Schema;

const GradingSchema = new Schema({
   min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
   interpretation: {
        type: String,
        required: false
    },
},{
    timestamps:{
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

// making configurations for the middleware hooks
GradingSchema.pre("update", function (next) {
    this.update({},{ $set: { updated_at: Date.now() }});
    next();
});

const Grading = mongoose.model("Grading", GradingSchema);
export default Grading;