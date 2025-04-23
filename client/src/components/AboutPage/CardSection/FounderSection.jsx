import React from 'react'
import FounderCard from './FounderCard'

const FounderSection = () => {
  const founders = [
    {
      name: "suresh sau",
      role: "Backend developer",
      phone: "+91-8116908644",
      image: "",
    },
    {
      name: "alex",
      role: "Chief Executive Officer",
      phone: "+91-8116908644",
      image: "",
    },
    {
      name: "alex",
      role: "Chief Executive Officer",
      phone: "+91-8116908644",
      image: "",
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