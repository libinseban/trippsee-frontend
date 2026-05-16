import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-red-900 to-gray-900 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-[12rem] font-bold leading-none">
            <span className="inline-block text-red-500 animate-float-delay-1">4</span>
            <span className="inline-block text-blue-500 animate-float-delay-2">0</span>
            <span className="inline-block text-red-500 animate-float-delay-3">4</span>
          </h1>
        </motion.div>

        {/* Error Message with Typing Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-semibold text-white mb-4 animate-pulse">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Looks like you've ventured into the digital void. Don't worry, even the best explorers get lost sometimes!
          </p>
        </motion.div>

        {/* Interactive Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="px-8 py-3 bg-gradient-to-r from-red-800 to-black-300 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-red-500/30"
            >
              Return Home
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/"
              
              
              className="px-8 py-3 bg-gradient-to-r from-black-700 to-balck-200 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-red-400/30"
            >
              Go Back
            </Link>
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          {/* Floating Particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.5
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                x: [null, Math.random() * window.innerWidth],
                opacity: [null, Math.random() * 0.8]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;