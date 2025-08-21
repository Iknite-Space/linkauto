import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaAngleRight, FaCaravan, FaDollarSign, FaMoneyBillWave } from 'react-icons/fa'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
}

const WhyChooseUs = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      {/* Left Side */}
      <motion.div variants={itemVariants} className="flex flex-col gap-3">
        <h4 className='text-xl font-bold leading-1 text-primary'>Why Choose Us</h4>
        <h4 className="max-w-sm mb-6 text-4xl font-bold">Best value deals you’ll ever find</h4>
        <p className="mb-4 text-lg text-gray-600">
          Experience unmatched convenience, transparency, and flexibility with our car rental services.
          Whether {`you're`} planning a weekend getaway or a cross-country adventure, {`we've`} got you covered with affordable rates and honest policies.
        </p>

        <motion.button
          onClick={() => navigate('/carlisting')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className='w-[160px] flex items-center justify-center gap-2 shadow-lg px-5 py-4 bg-primary text-white rounded-sm hover:bg-red-600 transition'
        >
          Find Deals <FaAngleRight />
        </motion.button>
      </motion.div>

      {/* Right Side - Features */}
      <motion.div variants={containerVariants} className="flex flex-col items-center gap-10">
        {[{
          icon: <FaCaravan size={28} className='text-primary' />,
          title: "Cross-Country Flexibility",
          text: "Drive freely across states with no extra paperwork or limits. Your perfect partner for long-distance road trips and relocations."
        },
        {
          icon: <FaDollarSign size={28} className='text-primary' />,
          title: "All-Inclusive Pricing",
          text: "No surprises — insurance, taxes, and standard fees are included in one straightforward price. What you see is what you pay."
        },
        {
          icon: <FaMoneyBillWave size={28} className='text-primary' />,
          title: "No Hidden Charges",
          text: "We value transparency. You’ll never get hit with unexpected fees at pickup or return — guaranteed."
        }].map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="flex items-start gap-4"
          >
            <motion.div
                whileHover={{ rotateY: 360 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-center w-20 h-20 p-6 bg-gray-200 rounded-full perspective-1000"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {item.icon}
            </motion.div>
            <div className="flex flex-col gap-1">
              <h4 className="mb-1 text-xl font-bold leading-tight">{item.title}</h4>
              <p className="leading-relaxed text-gray-600 text-md">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default WhyChooseUs
