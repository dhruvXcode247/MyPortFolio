/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import profile from "./assets/me3.jpeg";
import amazonimage from "./assets/projects/amazonimage.png";
import animalimage from "./assets/projects/animalimage.jpg";
import cloudyspaceimage from "./assets/projects/cloudyspaceimage.jpg";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github,
  Linkedin, 
  Mail, 
  ExternalLink, 
  Award, 
  Code2, 
  User, 
  Briefcase, 
  GraduationCap, 
  ChevronRight,
  Download,
  Menu,
  X,
  Trophy,
  FileCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

// --- Types ---
interface Skill {
  name: string;
  category: 'Technical' | 'Soft' | 'Tools';
}

interface Certificate {
  title: string;
  issuer: string;
  date: string;
}

interface Achievement {
  title: string;
  description: string;
  date: string;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
}

// --- Data ---
const SKILLS: Skill[] = [
  { name: 'C++', category: 'Technical' },
  { name: 'JavaScript', category: 'Technical' },
  { name: 'CSS', category: 'Technical' },
  { name: 'Python', category: 'Technical' },
  { name: 'SQL', category: 'Technical' },
  { name: 'HTML', category: 'Technical' },
  { name: 'Linux', category: 'Technical' },
  { name: 'Numpy', category: 'Technical' },
  { name: 'Pandas', category: 'Technical' },
  { name: 'Scikit-Learn', category: 'Technical' },
  { name: 'Collaborative', category: 'Soft' },
  { name: 'Problem Solving', category: 'Soft' },
  { name: 'Positive Mindset', category: 'Soft' },
  { name: 'Actively Learning', category: 'Soft' },
  { name: 'Git / GitHub', category: 'Tools' },
  { name: 'John The Ripper', category: 'Tools' },
  { name: 'Wireshark', category: 'Tools' },
  { name: 'Cewl', category: 'Tools' },
  { name: 'Excel', category: 'Tools' },
  { name: 'VirtualBox', category: 'Tools' },
  { name: 'Canva', category: 'Tools' },
  { name: 'Crunch', category: 'Tools' },
];

const CERTIFICATES: Certificate[] = [
  { 
    title: 'AI Foundations Associate', 
    issuer: 'Oracle', 
    date: '2025',
  },
  { 
    title: 'Network Security Fundamentals', 
    issuer: 'Palo Alto Networks', 
    date: '2025',
  },
  { 
    title: 'Communication Skills', 
    issuer: 'TCS iON', 
    date: '2025',
  },
    { 
    title: 'Introduction to Image Generation with Google Cloud', 
    issuer: 'Udacity', 
    date: '2025',
  },
    { 
    title: 'Vector Search Fundamentals & Semantic Search', 
    issuer: 'MongoDB', 
    date: '2025',
  },
];

const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'AIM OVERSEAS English Scholarship Test',
    description: 'Secured a Gold Medal alongside the TOP 50 students across cities.',
    date: '2023'
  },
  {
    title: 'Vocabulary Quiz Competition',
    description: 'Emerged as a finalist in the English vocabulary quiz organized by the ACE Club.',
    date: '2025'
  },
  {
    title: 'Solved 500+ problems across coding platforms',
    description: 'Actively improving problem solving skills by practicing on various platforms including Leetcode, Codeforces, Codechef, GeeksForGeeks & Hackerrank',
    date: '2023 - Present'
  }
];

const PROJECTS: Project[] = [
  {
    title: 'Space Weather Visualizer',
    description: 'Built an interactive real-time dashboard for monitoring solar wind patterns, geomagnetic disturbances, and radiation levels.',
    tags: ['Python', 'Pandas', 'NASA API', 'Requests','Streamlit'],
    github: 'https://github.com/dhruvXcode247/SpaceWeatherVisualizer',
    image: cloudyspaceimage
  },
  {
    title: 'Multi Class Animal Recognition',
    description: 'Implemented CNN-based image classification model to classify various animal species.',
    tags: ['Tensorflow', 'Kaggle', 'Python', 'Jupyter','Transfer Learning'],
    github: 'https://github.com/dhruvXcode247/Multi_class_animal_classification',
    image: animalimage
  },
  {
    title: 'Amazon Web Scraper',
    description: 'A real-time collaboration tool for developers with integrated video chat and code editor.',
    tags: ['Python', 'BeautifulSoup', 'Requests', 'Web Scraping'],
    github: 'https://github.com/dhruvXcode247/AmazonWebScraper',
    image: amazonimage
  }
];

// --- Components ---

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-serif font-medium mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-slate-500 max-w-2xl text-lg"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: '80px' }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="h-1 bg-emerald-600 mt-6"
    />
  </div>
);

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-emerald-900/5 border border-emerald-50">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-emerald-600" />
            </div>
            <h3 className="text-3xl font-serif mb-4 italic">Message Sent!</h3>
            <p className="text-slate-600 mb-8">Thank you for reaching out. I'll get back to you as soon as possible.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="text-emerald-600 font-medium hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-2">Your Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="John Doe"
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-2">Email Address</label>
                <input 
                  required
                  type="email" 
                  placeholder="john@example.com"
                  className="input-field"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-2">Message</label>
              <textarea 
                required
                rows={5}
                placeholder="How can I help you?"
                className="input-field resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-4 rounded-xl">
                <AlertCircle size={18} />
                <span>Something went wrong. Please try again or email me directly.</span>
              </div>
            )}

            <button 
              disabled={status === 'loading'}
              type="submit" 
              className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-emerald-600 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.a 
            href="#" 
            className="text-2xl font-serif font-bold tracking-tighter"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-emerald-600">DS</span>.
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
                <a
                  href="/DhruvResume.pdf"
                  download
                  className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                >
                  Resume
                </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-3xl font-serif font-medium hover:text-emerald-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
                <a
                  href="/DhruvResume.pdf"
                  download
                  className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                >
                  Resume
                </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="pt-40 pb-20 md:pt-60 md:pb-40 px-6 overflow-hidden relative">
          <div className="absolute top-20 right-[-10%] w-[50%] h-[50%] bg-emerald-100/50 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-20 left-[-10%] w-[30%] h-[30%] bg-indigo-100/50 rounded-full blur-[100px] -z-10" />
          
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-6 border border-emerald-100">
                Actively seeking AI/ML and Cybersecurity roles.
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-medium leading-[0.9] tracking-tight mb-8">
                Hey Visitor👋 <br />
                <span className="italic text-emerald-600/60">I'm Dhruv</span><br />
                Engineering Undergrad & <span className="gradient-text">Problem Solver</span>.
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mb-12 leading-relaxed">
                I'm an aspiring AI/ML Developer and Cybersecurity enthusiast focused on building clean, 
                scalable, and user-centric applications.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="btn-primary">
                  View My Work
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="flex gap-4 items-center px-4">
                <a 
                  href="https://github.com/dhruvXcode247" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-all"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/dhruv-sharma-929374291/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-all"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="mailto:d.sharma200611@gmail.com"
                  className="p-3 rounded-full border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-all"
                >
                <Mail size={20} />
                </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-slate-100/50 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square rounded-[40px] overflow-hidden bg-slate-200 relative group border-8 border-white shadow-2xl"
            >
              <img 
                src={profile}
                alt="Dhruv Sharma" 
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors" />
            </motion.div>
            <div>
              <SectionTitle subtitle="A little bit about my journey and what drives me.">
                Who am I & <br /> what I do.
              </SectionTitle>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  I am an AI/ML & Cybersecurity enthusiast with a background in Computer Science and a positive growth mindset. 
                  My journey started with a curiosity about how things work on the web, which evolved into 
                  exploring web security as well.
                </p>
                <p>
                  My interests revolve around Artificial Intelligence, Machine Learning, and Cybersecurity.
                  I enjoy solving complex problems, building intelligent applications,
                  and exploring security concepts that make modern systems more reliable and resilient.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-6">
                  <div>
                    <h4 className="font-serif text-2xl mb-2 italic text-emerald-600">Education</h4>
                    <p className="text-sm font-medium text-slate-900">B.Tech Computer Science Engineering (Artificial Intelligence)</p>
                    <p className="text-sm text-slate-500">G.L. Bajaj Institute Of Technology And Management, 2023-27</p>
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl mb-2 italic text-indigo-600">Location</h4>
                    <p className="text-sm font-medium text-slate-900">Greater Noida, UP</p>
                    <p className="text-sm text-slate-500">India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <SectionTitle subtitle="My technical toolkit and professional capabilities.">
              Skills & <br /> Expertise
            </SectionTitle>
            
            <div className="grid md:grid-cols-3 gap-12">
              {(['Technical', 'Soft', 'Tools'] as const).map((category) => (
                <div key={category}>
                  <h3 className="text-xl font-medium mb-6 flex items-center gap-2 text-slate-800">
                    {category === 'Technical' && <Code2 size={20} className="text-emerald-600" />}
                    {category === 'Soft' && <User size={20} className="text-indigo-600" />}
                    {category === 'Tools' && <Briefcase size={20} className="text-emerald-600" />}
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {SKILLS.filter(s => s.category === category).map((skill) => (
                      <motion.span 
                        key={skill.name}
                        whileHover={{ y: -2, scale: 1.05 }}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all cursor-default"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="py-24 bg-slate-900 text-white px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-500 rounded-full blur-[150px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500 rounded-full blur-[150px]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-medium mb-4">Certifications</h2>
              <p className="text-slate-400 max-w-2xl text-lg italic">Validated expertise from industry leaders.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {CERTIFICATES.map((cert, idx) => (
                <motion.div 
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 rounded-3xl bg-slate-800/40 backdrop-blur-md border border-slate-700/50 hover:border-emerald-500/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FileCheck className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{cert.title}</h3>
                  <p className="text-slate-400 text-sm mb-6">{cert.issuer} • {cert.date}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <SectionTitle subtitle="Milestones and recognitions throughout my career.">
              Key <br /> Achievements
            </SectionTitle>

            <div className="space-y-8">
              {ACHIEVEMENTS.map((achievement, idx) => (
                <motion.div 
                  key={achievement.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col md:flex-row gap-6 md:items-center p-8 rounded-[32px] border border-slate-100 hover:bg-emerald-50/30 hover:border-emerald-100 transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <Trophy className="text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-serif italic text-slate-800">{achievement.title}</h3>
                      <span className="text-sm font-medium text-slate-400">{achievement.date}</span>
                    </div>
                    <p className="text-slate-600 max-w-3xl">{achievement.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-slate-100/50 px-6">
          <div className="max-w-7xl mx-auto">
            <SectionTitle subtitle="A selection of my favorite projects.">
              Featured <br /> Projects
            </SectionTitle>

            <div className="grid md:grid-cols-2 gap-12">
              {PROJECTS.map((project, idx) => (
                <motion.div 
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="aspect-video rounded-[40px] bg-slate-200 mb-6 overflow-hidden relative border-4 border-white shadow-xl">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white text-slate-900 p-4 rounded-full hover:scale-110 transition-transform shadow-lg"
                      >
                        <Github size={20} />
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-serif mb-3 italic text-slate-800">{project.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 bg-emerald-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-300 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-5xl md:text-7xl font-serif font-medium mb-8 leading-tight">
                Let's create something <br /> <span className="italic text-emerald-200">extraordinary</span> together.
              </h2>
              <p className="text-xl text-emerald-50 max-w-xl mb-12 leading-relaxed">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-emerald-50">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium opacity-60">Email me at</p>
                    <a href="mailto:d.sharma200611@gmail.com" className="text-lg font-medium hover:underline">
                      d.sharma200611@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-emerald-50">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium opacity-60">Connect on</p>
                    <a 
                      href="https://www.linkedin.com/in/dhruv-sharma-929374291/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg font-medium hover:underline"
                    >
                      linkedin.com/in/dhruv-sharma-929374291
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} DS Portfolio.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-4 rounded-full bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
          >
            <ChevronRight size={20} className="-rotate-90" />
          </button>
        </div>
      </footer>
    </div>
  );
}
