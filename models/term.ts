import mongoose from "mongoose"

const Schema = mongoose.Schema;

const TermSchema = new Schema({
    academic_term: {
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
TermSchema.pre("update", function (next) {
    this.update({},{ $set: { updated_at: Date.now() }});
    next();
});

const Term = mongoose.model("Term", TermSchema);
export default Term;