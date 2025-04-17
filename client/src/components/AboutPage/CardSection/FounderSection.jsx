import React from 'react'
import FounderCard from './FounderCard'

const FounderSection = () => {
  const founders = [
    {
      name: "alex",
      role: "Chief Executive Officer",
      phone: "+91-8116908644",
      image: "https://t4.ftcdn.net/jpg/04/98/10/99/360_F_498109902_Uy3HrvTU7EfliHBPPeLVoY9kp2AQpXWQ.jpg",
    },
    {
      name: "alex",
      role: "Chief Executive Officer",
      phone: "+91-8116908644",
      image: "https://assets.fyers.in/images/about-us/tejas_khoday.webp",
    },
    {
      name: "alex",
      role: "Chief Executive Officer",
      phone: "+91-8116908644",
      image: "https://plus.unsplash.com/premium_photo-1661521277742-f8756af10deb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RhcnR1cCUyMGZvdW5kZXJ8ZW58MHx8MHx8fDA%3D",
    },

  ];

  return (
    <section className="py-16  text-center  self-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Meet Our Founders</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {founders.map((founder, index) => (
          <FounderCard key={index} {...founder} />
        ))}
      </div>
    </section>
  );
};


export default FounderSection