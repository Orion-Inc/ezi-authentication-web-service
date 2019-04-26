import mongoose from "mongoose"

const Schema = mongoose.Schema;

const TeachersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
},{
    timestamps:{
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

// making configurations for the middleware hooks
TeachersSchema.pre("update", function (next) {
    this.update({},{ $set: { updated_at: Date.now() }});
    next();
});

const Teachers = mongoose.model("Teachers", TeachersSchema);
export default Teachers;