import React from 'react'
import Layout from '../components/Layout/Layout'
import { FaCode, FaClock, FaShieldAlt, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ServicesPage = () => {
    return (
        <Layout>
            <div className='flex flex-col'>
                <div className="w-full px-6 md:px-16 py-20 bg-gray-100">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
                        <p className="text-gray-600 mt-2 text-lg">Comprehensive trading solutions for modern markets</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <FaCode className="text-blue-500 text-4xl mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold text-gray-900">Custom Trading Algorithms</h3>
                            <p className="text-gray-600 mt-2">Bespoke algorithmic trading solutions tailored to your specific trading strategy and requirements.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <FaClock className="text-blue-500 text-4xl mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold text-gray-900">Mid & Low Frequency Systems</h3>
                            <p className="text-gray-600 mt-2">Optimized trading systems for swing trading, position trading, and longer-term systematic strategies.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <FaShieldAlt className="text-blue-500 text-4xl mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold text-gray-900">Risk Management</h3>
                            <p className="text-gray-600 mt-2">Sophisticated risk management systems to protect your trading capital and optimize returns.</p>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default ServicesPage