import mongoose from "mongoose"
const Schema  = mongoose.Schema;

const RoleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        minlength: 2
    },
    description: {
        type: String,
        required: false
    }

},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

// defining the  middleware hooks here
RoleSchema.pre('update', function (next) {
    this.update({},{ $set:{ updated_at: Date.now() }});
    next();
});

const Roles = mongoose.model("Roles", RoleSchema);
export default Roles;