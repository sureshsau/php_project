import mongoose from "mongoose";

const credentialSchema = new mongoose.Schema({
    aid: { type: String, unique: true, required: true },
    doj: { type: Date, required: true },
    uiu: { type: Number, required: true },
    uiu_n: { type: Number, required: true },
    name: { type: String, required: true, maxlength: 100 },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], required: true },
    dob: { type: Date, required: true },
    email_id: { type: String, unique: true, required: true },
    contact_number: { type: Number, required: true },
    whatsapp_number: { type: Number, required: true },
    aadhar: { type: Number, unique: true, required: true },
    pan: { type: String, unique: true, required: true },
    tgid: { type: String },
    user_id: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    twofa_hash: { type: String },
    api_portal_email_id: { type: String },
    api_portal_password: { type: String },
    api_key: { type: String },
    api_secret: { type: String },
    access_token: { type: String },
    interactive_order_api_key: { type: String },
    interactive_order_api_secret: { type: String },
    interactive_order_access_token: { type: String },
    market_data_api_key: { type: String },
    market_data_api_secret: { type: String },
    market_data_access_token: { type: String },
    broker: { type: String, required: true },
    api_service: { type: String, required: true },
    is_api_subscribed: { type: Boolean, default: false }
}, { timestamps: true });

const Credential = mongoose.model("Credential", credentialSchema);

export default Credential;