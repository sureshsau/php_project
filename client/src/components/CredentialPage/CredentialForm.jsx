import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const CredentialForm = () => {
    const [formData, setFormData] = useState({
        aid: "",
        doj: "",
        uiu: "",
        uiu_n: "",
        name: "",
        dob: "",
        email_id: "",
        contact_number: "",
        whatsapp_number: "",
        aadhar: "",
        pan: "",
        tgid: "",
        user_id: "",
        password: "",
        twofa_hash: "",
        api_portal_email_id: "",
        api_portal_password: "",
        api_key: "",
        api_secret: "",
        access_token: "",
        interactive_order_api_key: "",
        interactive_order_api_secret: "",
        interactive_order_access_token: "",
        market_data_api_key: "",
        market_data_api_secret: "",
        market_data_access_token: "",
        broker: "",
        api_service: "",
        is_api_subscribed: false
    });
    
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axiosInstance.post("/credential", { ...formData, status: "ACTIVE" });
            console.log(data);
            toast.success("Credentials submitted successfully!");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
            console.error("Error submitting form", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FaCheckCircle className="text-green-500" /> Credential Form
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(formData).map((key) => (
                    key !== "is_api_subscribed" ? (
                        <div key={key} className="flex flex-col">
                            <label className="text-gray-700 font-medium capitalize">{key.replace(/_/g, ' ')}:</label>
                            <input
                                type="text"
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ) : (
                        <div key={key} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name={key}
                                checked={formData[key]}
                                onChange={handleChange}
                                className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="text-gray-700 font-medium">{key.replace(/_/g, ' ')}:</label>
                        </div>
                    )
                ))}
                <button 
                    type="submit" 
                    className="col-span-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export { CredentialForm };