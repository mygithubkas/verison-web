'use client';

import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';

interface ServicePoint {
  title: string;
  image: string;
  description: string;
  points: string[];
}

const services: ServicePoint[] = [
  {
    title: "Custom AI Solutions",
    image: "/images/S1.png",
    description: "Harness the power of artificial intelligence with our custom solutions tailored to your unique business challenges.",
    points: [
      "Natural Language Processing",
      "Machine Learning Models",
      "Predictive Analytics",
      "AI Integration Services"
    ]
  },
  {
    title: "Digital Marketing",
    image: "/images/S2.png",
    description: "Transform your digital presence with data-driven marketing strategies that deliver measurable results.",
    points: [
      "SEO Optimization",
      "Content Strategy",
      "Social Media Management",
      "Analytics & Reporting"
    ]
  },
  {
    title: "Smart Automation",
    image: "/images/S3.png",
    description: "Streamline your operations with intelligent automation solutions that boost efficiency and reduce costs.",
    points: [
      "Process Automation",
      "Workflow Optimization",
      "System Integration",
      "Performance Monitoring"
    ]
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const bulletVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

interface ServiceCardProps {
  service: ServicePoint;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const handleHoverStart = () => {
    setIsHovered(true);
    controls.start("visible");
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    controls.start("hidden");
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-3">
          {service.title}
        </h3>
        <p className="text-slate-600 mb-4">
          {service.description}
        </p>
        <motion.ul 
          className="space-y-2"
          initial="hidden"
          animate={controls}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            },
            hidden: {
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
        >
          {service.points.map((point, i) => (
            <motion.li 
              key={i} 
              variants={bulletVariants}
              className="text-slate-700 flex items-center"
            >
              <motion.span 
                className="w-1.5 h-1.5 bg-sky-500 rounded-full mr-2"
                initial={{ scale: 0.5 }}
                animate={{ scale: isHovered ? 1 : 0.5 }}
                transition={{ duration: 0.2 }}
              />
              {point}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
};

export default function SectionTwo() {
  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-slate-100 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Explore our capabilities
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Discover how our innovative solutions can transform your business through AI-powered intelligence, strategic marketing, and smart automation.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
} 