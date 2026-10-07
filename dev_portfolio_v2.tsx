import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code2, Cpu, Globe, Github, Linkedin, Mail, ExternalLink, ChevronRight } from 'lucide-react';

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;600&family=Inter:wght@300;400;600;800&display=swap');
    
    html, body {
      background-color: #09090b; /* Zinc 950 */
      color: #fafafa;
      font-family: 'Inter', sans-serif;
      scroll-behavior: smooth;
    }

    .font-code {
      font-family: 'Fira Code', monospace;
    }

    /* Tech Grid Background */
    .bg-grid {
      background-size: 40px 40px;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #09090b; 
    }
    ::-webkit-scrollbar-thumb {
      background: #27272a; 
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #3f3f46; 
    }

    .neon-text-cyan {
      text-shadow: 0 0 10px rgba(34, 211, 238, 0.5), 0 0 20px rgba(34, 211, 238, 0.3);
    }
    .neon-border-cyan:hover {
      box-shadow: 0 0 15px rgba(34, 211, 238, 0.4);
    }
  `}} />
);

const Navbar = () => (
  <motion.nav 
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="fixed top-0 w-full z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-white/10"
  >
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2 text-cyan-400 font-bold text-xl tracking-tighter">
        <Code2 size={24} />
        <span>Dev<span className="text-white">Studio</span></span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
        <a href="#home" className="hover:text-cyan-400 transition-colors">{'<Home />'}</a>
        <a href="#skills" className="hover:text-cyan-400 transition-colors">{'<Skills />'}</a>
        <a href="#projects" className="hover:text-cyan-400 transition-colors">{'<Projects />'}</a>
      </div>
      <a href="#contact" className="px-4 py-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/50 transition-all neon-border-cyan">
        Ping Me
      </a>
    </div>
  </motion.nav>
);

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid z-0" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 flex flex-col gap-6"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-code font-semibold w-max mb-2">
            Status: Available for hire
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            I Engineer <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 neon-text-cyan">
              Digital Reality.
            </span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl">
            Full-stack developer obsessed with building scalable applications, elegant APIs, and pixel-perfect user interfaces.
          </p>
          <div className="flex gap-4 mt-4">
            <button className="px-6 py-3 rounded-md bg-cyan-500 text-zinc-950 font-bold hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.4)] flex items-center gap-2">
              View Repository <Github size={18} />
            </button>
            <button className="px-6 py-3 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2 font-code text-sm">
              npm install me
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex-1 w-full"
        >
          {/* Mock Code Editor */}
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0c0c0e] shadow-2xl">
            <div className="h-8 bg-[#18181b] border-b border-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-auto text-xs font-code text-zinc-500">developer.ts</span>
            </div>
            <div className="p-6 font-code text-sm sm:text-base overflow-x-auto leading-relaxed">
              <span className="text-pink-500">const</span> <span className="text-blue-400">developer</span> <span className="text-pink-500">=</span> {'{'} <br/>
              &nbsp;&nbsp;<span className="text-cyan-300">name:</span> <span className="text-yellow-300">'John Doe'</span>,<br/>
              &nbsp;&nbsp;<span className="text-cyan-300">role:</span> <span className="text-yellow-300">'Full Stack Engineer'</span>,<br/>
              &nbsp;&nbsp;<span className="text-cyan-300">skills:</span> ['React', 'Node.js', 'TypeScript', 'Go'],<br/>
              &nbsp;&nbsp;<span className="text-blue-400">drinkCoffee</span>: () <span className="text-pink-500">=&gt;</span> {'{'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-500">while</span> (<span className="text-blue-400">awake</span>) {'{'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">code</span>();<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">debug</span>();<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br/>
              &nbsp;&nbsp;{'}'}<br/>
              {'}'};
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Skills = () => {
  const techs = [
    { name: "React", category: "Frontend" }, { name: "TypeScript", category: "Language" },
    { name: "Node.js", category: "Backend" }, { name: "Next.js", category: "Framework" },
    { name: "Tailwind", category: "Styling" }, { name: "PostgreSQL", category: "Database" },
    { name: "Docker", category: "DevOps" }, { name: "GraphQL", category: "API" }
  ];

  return (
    <section id="skills" className="py-24 relative bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 font-code">{'< TechStack />'}</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">Tools I use to bring ideas to life. Always learning, always building.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-cyan-500/5 hover:border-cyan-500/30 transition-all group flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{tech.name}</h3>
                <span className="text-xs text-zinc-500 font-code">{tech.category}</span>
              </div>
              <Cpu className="text-zinc-600 group-hover:text-cyan-400/50 transition-colors" size={20} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Nebula API",
      desc: "A high-performance GraphQL API built with Node.js and Apollo, serving data for enterprise dashboards.",
      tags: ["Node.js", "GraphQL", "Redis", "Docker"],
      icon: <Globe className="text-purple-400" size={32} />
    },
    {
      title: "CipherFlow UI",
      desc: "Component library for Web3 applications. Features glassmorphism, responsive grids, and dark mode by default.",
      tags: ["React", "Tailwind", "Storybook"],
      icon: <Code2 className="text-cyan-400" size={32} />
    },
    {
      title: "TermiTrack",
      desc: "CLI tool for developers to track project time directly from the terminal without breaking focus.",
      tags: ["Go", "CLI", "SQLite"],
      icon: <Terminal className="text-emerald-400" size={32} />
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 font-code">{'< FeaturedProjects />'}</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative p-6 rounded-2xl border border-white/10 bg-[#121215] overflow-hidden group hover:border-white/20 transition-all flex flex-col h-full"
            >
              {/* Glass reflection effect */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="mb-6 p-4 rounded-xl bg-white/5 inline-block w-max">
                {proj.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{proj.title}</h3>
              <p className="text-zinc-400 text-sm mb-6 flex-grow leading-relaxed">{proj.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {proj.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-wider font-code text-cyan-200 bg-cyan-900/30 rounded border border-cyan-800/50">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-auto pt-4 border-t border-white/5">
                <a href="#" className="p-2 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <a href="#" className="p-2 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                  <ExternalLink size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InteractiveTerminal = () => {
  const [output, setOutput] = useState<string[]>(['Type a command or click buttons below to run...']);
  
  const runCommand = (cmd: string) => {
    setOutput(prev => [...prev, `$ ${cmd}`]);
    
    setTimeout(() => {
      let res = '';
      switch(cmd) {
        case 'whoami': res = 'admin_dev_01'; break;
        case 'ping server': res = 'Pong! Latency: 12ms'; break;
        case 'deploy': res = '[OK] Code shipped to production successfully! 🚀'; break;
        default: res = `Command not found: ${cmd}`;
      }
      setOutput(prev => [...prev, res]);
    }, 400);
  };

  return (
    <section className="py-24 relative bg-zinc-950/80 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden border border-zinc-800 bg-[#050505] shadow-2xl"
        >
          <div className="h-10 bg-[#111] border-b border-zinc-800 flex items-center px-4 gap-2">
            <Terminal size={16} className="text-zinc-500" />
            <span className="text-xs font-code text-zinc-500">bash - sys_admin</span>
          </div>
          <div className="p-6 h-64 overflow-y-auto font-code text-sm text-green-400 flex flex-col gap-2">
            {output.map((line, i) => (
              <div key={i} className={line.startsWith('$') ? 'text-zinc-300 mt-2' : 'text-cyan-400'}>
                {line}
              </div>
            ))}
          </div>
          <div className="p-4 bg-[#111] border-t border-zinc-800 flex flex-wrap gap-3">
            <button onClick={() => runCommand('whoami')} className="px-3 py-1.5 rounded bg-zinc-800 text-xs font-code hover:bg-zinc-700 transition-colors text-zinc-300 flex items-center gap-2">
              <ChevronRight size={14}/> whoami
            </button>
            <button onClick={() => runCommand('ping server')} className="px-3 py-1.5 rounded bg-zinc-800 text-xs font-code hover:bg-zinc-700 transition-colors text-zinc-300 flex items-center gap-2">
              <ChevronRight size={14}/> ping server
            </button>
            <button onClick={() => runCommand('deploy')} className="px-3 py-1.5 rounded bg-cyan-900/40 text-cyan-300 border border-cyan-800/50 text-xs font-code hover:bg-cyan-900/60 transition-colors flex items-center gap-2">
              <ChevronRight size={14}/> deploy
            </button>
            <button onClick={() => setOutput(['Terminal cleared.'])} className="px-3 py-1.5 rounded hover:bg-red-500/10 text-red-400 text-xs font-code transition-colors ml-auto">
              clear
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="contact" className="border-t border-white/10 bg-[#09090b] py-12">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2 text-zinc-400 font-bold text-lg">
        <Code2 size={20} />
        <span>DevStudio <span className="font-code text-xs font-normal">© 2026</span></span>
      </div>
      <div className="flex gap-4">
        <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-cyan-500 hover:text-zinc-950 transition-all neon-border-cyan text-zinc-400">
          <Github size={20} />
        </a>
        <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-cyan-500 hover:text-zinc-950 transition-all neon-border-cyan text-zinc-400">
          <Linkedin size={20} />
        </a>
        <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-cyan-500 hover:text-zinc-950 transition-all neon-border-cyan text-zinc-400">
          <Mail size={20} />
        </a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#09090b] selection:bg-cyan-500/30">
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <InteractiveTerminal />
      </main>
      <Footer />
    </div>
  );
}