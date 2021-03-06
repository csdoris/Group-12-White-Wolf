import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: String,
    email: { type: String, unique: true, required: true },
    password: String,

    plans: [{ type: Schema.Types.ObjectId, ref: 'Plan' }]

}, {
    timestamps: {}
});

userSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};

export const User = mongoose.model('User', userSchema);

const planSchema = new Schema({

    name: {type: String, default: "Untitled"},

    events: [{
        name: {type: String, default: "Untitled"},
        description: String,
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        address: { type: String, required: true },
        lat: { type: String, required: true },
        lng: { type: String, required: true }
    }]

}, {
    timestamps: {}
});

export const Plan = mongoose.model('Plan', planSchema);