import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function Exhibition() {
  const [exhibitions, setExhibitions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/exhibitions/')
      .then(response => response.json())
      .then(data => {
        setExhibitions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching exhibitions:', error);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !exhibitions) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Failed to load exhibitions.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow z-50 p-4 flex justify-between items-center">
        <div className="text-xl font-bold">NEO Lpu Fashion</div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="text-gray-700 hover:text-gray-900">Home</a></li>
            <li><a href="/exhibitions" className="text-gray-700 hover:text-gray-900">Exhibitions</a></li>
            <li><a href="/about" className="text-gray-700 hover:text-gray-900">About</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          className="absolute w-full h-full object-cover opacity-30"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            Fashion in Motion
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Experience the art of fashion through our curated exhibitions
          </motion.p>
        </div>
      </motion.section>

      {/* Upcoming Exhibitions */}
      <section className="py-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Upcoming Exhibitions
        </motion.h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {exhibitions.upcoming?.length > 0 ? (
              exhibitions.upcoming.map((exhibit) => (
                <motion.div
                  key={exhibit.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <img
                    src={exhibit.image}
                    alt={exhibit.title}
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-semibold">{exhibit.title}</h3>
                    <p className="text-gray-300">{exhibit.date}</p>
                    <p className="text-gray-400 mt-2">{exhibit.description}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center col-span-2 text-gray-400">No upcoming exhibitions.</p>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Exhibitions */}
      <section className="py-20 px-6 bg-gray-900">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Featured Runway Shows
        </motion.h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {exhibitions.featured?.length > 0 ? (
              exhibitions.featured.map((exhibit) => (
                <motion.div
                  key={exhibit.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <video
                    autoPlay
                    muted
                    loop
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                  >
                    <source src={exhibit.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-semibold">{exhibit.title}</h3>
                    <p className="text-gray-400 mt-2">{exhibit.description}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center col-span-2 text-gray-400">No featured shows at the moment.</p>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

export default Exhibition;
