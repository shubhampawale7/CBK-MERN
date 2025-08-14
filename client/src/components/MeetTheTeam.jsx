// client/src/components/MeetTheTeam.jsx
import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

// Updated team member data with the correct image paths.
const teamMembers = [
  {
    name: "Vijay Suryavanshi",
    title: "Founder & Lead Metallurgist",
    image: "/images/team/vijay-suryavanshi.png", // Corrected path
    bio: "With a deep passion for material science, Vijay founded CBK Engineers to deliver unparalleled wear resistance solutions, driving our innovation from day one.",
    linkedin: "#",
    email: "mailto:vijay@cbkengineers.com",
  },
  {
    name: "Chinmay Suryavanshi",
    title: "Director of Operations",
    image: "/images/team/chinmay-suryavanshi.jpg",
    bio: "Chinmay leads our manufacturing and client relations, ensuring every plate meets both our rigorous quality standards and our clients' specific needs.",
    linkedin: "#",
    email: "mailto:chinmay562@yahoo.com",
  },
];

const MeetTheTeam = () => {
  return (
    <section className="py-20 bg-brand-light dark:bg-brand-dark-light relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-brand-orange dark:text-brand-orange-light mb-4"
        >
          Meet Our Leadership
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16"
        >
          Our leadership team combines decades of metallurgical expertise with a
          forward-thinking approach to operational excellence, ensuring every
          client receives the highest quality product and service.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative bg-white dark:bg-brand-dark p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Colored border appears on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>

              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6">
                {/* Small, circular image */}
                <div className="flex-shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-28 h-28 rounded-full object-cover shadow-md border-4 border-white dark:border-brand-dark-light"
                  />
                </div>

                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-brand-orange font-semibold mt-1">
                    {member.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                    {member.bio}
                  </p>
                  <div className="mt-4 flex justify-center sm:justify-start space-x-4">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-brand-orange transition-colors"
                    >
                      <FaLinkedin size={20} />
                    </a>
                    <a
                      href={member.email}
                      className="text-gray-400 hover:text-brand-orange transition-colors"
                    >
                      <FaEnvelope size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
