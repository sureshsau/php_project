import React from 'react'
import Layout from '../components/Layout/Layout'
import { FaPenNib, FaUsers, FaChartLine } from "react-icons/fa";

const ServicesPage = () => {
    return (
        <Layout>
            <div className='flex flex-col'>
                <div className="w-full px-6 md:px-16 py-20 bg-gray-100">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
                        <p className="text-gray-600 mt-2 text-lg">Empowering writers, connecting readers, and growing communities</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <FaPenNib className="text-blue-500 text-4xl mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold text-gray-900">Content Creation Tools</h3>
                            <p className="text-gray-600 mt-2">Powerful and intuitive editor to help bloggers craft, format, and publish engaging stories with ease.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <FaUsers className="text-blue-500 text-4xl mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold text-gray-900">Community Building</h3>
                            <p className="text-gray-600 mt-2">Engage with your audience, receive feedback, and grow your following through comments and collaborations.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <FaChartLine className="text-blue-500 text-4xl mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold text-gray-900">Insights & Analytics</h3>
                            <p className="text-gray-600 mt-2">Track your performance, audience engagement, and discover what content resonates most.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ServicesPage;
