import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    auth_token: String,

    plans: [{ type: Schema.Types.ObjectId, ref: 'Plan' }]

}, {
    timestamps: {}
});

export const User = mongoose.model('User', userSchema);

const planSchema = new Schema({

    name: String,

    events: [{
        name: String,
        description: String,
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true }
    }]

}, {
    timestamps: {}
});

export const Plan = mongoose.model('Plan', planSchema);