const mongoose = require("mongoose");
const validator = require("email-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            validate: (value) => {
                if (!validator.validate(value)) {
                    throw new Error("Invalid Email Address");
                }

            },

        },
        firstName: { type: String, required: true, maxLength: 40 },
        lastName: { type: String, required: true, maxLength: 40 },
        phoneNumber: { type: String, required: true },
        password: { type: String, required: true },
        billerFirstName: { type: String, required: false },
        billerLastName: { type: String, required: false },
        billerEmail: { type: String, required: false },
    }
);

// export the model
mongoose.model("users", userSchema);
