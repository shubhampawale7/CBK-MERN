// client/src/components/MeetTheTeam.jsx
import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

// --- Team Member Data (Unchanged) ---
const teamMembers = [
  {
    name: "Vijay Suryavanshi",
    title: "Founder & Lead Metallurgist",
    image: "/images/team/vijay-suryavanshi.png",
    bio: "With a deep passion for material science, Vijay founded CBK Engineers to deliver unparalleled wear resistance solutions.",
    linkedin: "#",
    email: "mailto:vijay@cbkengineers.com",
  },
  {
    name: "Chinmay Suryavanshi",
    title: "Director of Operations",
    image: "/images/team/chinmay-suryavanshi.jpg",
    bio: "Chinmay leads our manufacturing and client relations, ensuring every plate meets our rigorous quality standards.",
    linkedin: "#",
    email: "mailto:chinmay562@yahoo.com",
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const MeetTheTeam = () => {
  return (
    <section className="py-24 font-serif bg-brand-light dark:bg-brand-dark-light">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-brand-orange dark:text-brand-orange-light"
        >
          Meet Our Leadership
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-4 mb-16"
        >
          Our team combines decades of metallurgical expertise with a
          forward-thinking approach to operational excellence.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto"
        >
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const TeamMemberCard = ({ member }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative flex flex-col items-center p-8 bg-white dark:bg-brand-dark rounded-2xl shadow-lg"
    >
      <div className="relative">
        <img
          src={member.image}
          alt={member.name}
          className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white dark:border-brand-dark-light"
        />
        {/* Animated decorative ring on hover */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-brand-orange"
          initial={{ scale: 1, opacity: 0 }}
          whileHover={{ scale: 1.15, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        />
      </div>

      <h3 className="mt-6 text-2xl font-bold text-gray-800 dark:text-white">
        {member.name}
      </h3>
      <p className="text-brand-orange font-semibold mt-1">{member.title}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 h-20">
        {member.bio}
      </p>

      {/* Social links that fade in on hover */}
      <motion.div
        className="flex space-x-4 mt-4"
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SocialLink href={member.linkedin}>
          <FaLinkedin size={22} />
        </SocialLink>
        <SocialLink href={member.email}>
          <FaEnvelope size={22} />
        </SocialLink>
      </motion.div>
    </motion.div>
  );
};

const SocialLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-brand-orange transition-colors"
  >
    {children}
  </a>
);

export default MeetTheTeam;
