import mongoose from "mongoose"
import { default as Roles } from "./roles"

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true
    },
    role_id: {
        type: Schema.Types.ObjectId,
        ref: 'Roles',
    }
},{
    timestamps:{
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

UserSchema.add({
    is_default: {
        type: Boolean,
        required: true
    }
});

const User = mongoose.model("Users", UserSchema);
export default User;