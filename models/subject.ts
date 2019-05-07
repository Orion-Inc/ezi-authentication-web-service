import mongoose from "mongoose"

const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

// making configurations for the middleware hooks
SubjectSchema.pre("update", function (next) {
    this.update({}, {$set: {updated_at: Date.now()}});
    next();
});

const Subject = mongoose.model("Subject", SubjectSchema);
export default Subject;