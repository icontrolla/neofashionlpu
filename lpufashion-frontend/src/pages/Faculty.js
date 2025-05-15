// src/pages/Faculty.js
import { motion } from "framer-motion";

function Faculty() {
  const staff = [
    { name: "Dr. Aisha Khanna", role: "Head of Department", image: "/images/faculty1.jpg" },
    { name: "Mr. Raghav Kapoor", role: "Textile Design Expert", image: "/images/faculty2.jpg" },
    { name: "Ms. Priya Mehta", role: "Fashion Illustration Lecturer", image: "/images/faculty3.jpg" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen p-10 bg-black text-white flex flex-col items-center"
    >
      <h1 className="text-5xl font-extrabold mb-8 tracking-tight">Meet Our Faculty</h1>
      <p className="mb-10 text-lg text-gray-400 text-center max-w-2xl">
        Leaders of style, creativity, and mentorship — meet the minds behind LPU Fashion's excellence.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {staff.map((member, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
          >
            <img src={member.image} alt={member.name} className="w-full h-72 object-cover" />
            <div className="p-5">
              <h2 className="text-2xl font-semibold">{member.name}</h2>
              <p className="text-gray-400 text-sm mt-2">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Faculty;
