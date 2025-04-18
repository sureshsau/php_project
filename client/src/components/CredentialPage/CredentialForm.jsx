import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const CredentialForm = () => {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        contact_number: "",
        bio: "",
        writing_sample_link: "",
        portfolio_link: "",
        experience_level: "",
        preferred_categories: "",
        availability: "",
        agree_to_terms: false
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
            const { data } = await axiosInstance.post("/writer-permission-request", { ...formData, status: "PENDING" });
            console.log(data);
            toast.success("Writer application submitted successfully!");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Submission failed. Please try again.");
            console.error("Error submitting form", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <FaCheckCircle className="text-green-500" /> Writer Application Form
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(formData).map((key) => (
                    key !== "agree_to_terms" ? (
                        <div key={key} className="flex flex-col col-span-1 md:col-span-1">
                            <label className="text-gray-700 font-medium capitalize">{key.replace(/_/g, ' ')}:</label>
                            <input
                                type="text"
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    ) : (
                        <div key={key} className="flex items-center gap-2 col-span-2">
                            <input
                                type="checkbox"
                                name={key}
                                checked={formData[key]}
                                onChange={handleChange}
                                className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                required
                            />
                            <label className="text-gray-700 font-medium">
                                I agree to the platform's terms and guidelines
                            </label>
                        </div>
                    )
                ))}
                <button
                    type="submit"
                    className="col-span-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Application"}
                </button>
            </form>
        </div>
    );
};

export { CredentialForm };
