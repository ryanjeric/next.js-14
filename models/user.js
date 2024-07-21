import { Schema,model,models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: "string",
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required']
    },
    username: {
        type: "string",
        required: [true, 'Username is required']
    },
    image: {
        type: "string",
    }
});

const User = models.User || model("User", UserSchema);

export default User;