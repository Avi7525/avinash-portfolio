import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import emailjs from "@emailjs/browser";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import "./styles.css";

/*
  ============================================================
  EDIT YOUR PORTFOLIO HERE
  ============================================================
  Most content is stored in the portfolio object below.
  Replace the placeholder values whenever you are ready.
*/

const portfolio = {
  name: "Durga Sai Avinash Donga",
  shortName: "Avinash Donga",
  email: "durgasaiavinashd@gmail.com",
  phone: "",
  location: "Vadodara, Gujarat, India",
  github: "https://github.com/Avi7525",
  linkedin: "https://www.linkedin.com/in/avinashdonga",
  resume: "/resume.pdf",

  heroDescription:
    "I’m a Computer Science Engineer passionate about technology, problem-solving, and building innovative solutions. I enjoy learning new technologies and turning ideas into impactful digital experiences.",

  roles: [
    "Full Stack Developer",
    "Web Developer",
    "UI/UX Enthusiast",
    "Video Editor",
  ],

  about:
    "I’m a Computer Science Engineering student who enjoys turning ideas into practical digital products. My interests span full-stack web development, artificial intelligence, UI/UX, and problem-solving. I’m continuously learning, building projects, and improving my development skills with the goal of creating useful, reliable, and user-friendly applications.",

  education: [
    {
      degree: "B.Tech in Computer Science & Engineering",
      college: "Parul University",
      start: "2023",
      end: "2027",
      detail: "Currently pursuing",
    },

    {
      Course: "MPC",
      college: "aditya junior college",
      start: "2021",
      end: "2023",
      detail: "Completed",
    },

    {
      Course: "SSC",
      college: "aditya junior college",
      start: "2021",
      end: "2020",
      detail: "Completed",
    },
  ],

  skills: {
    Programming: ["C", "Java", "Python"],
    Frontend: ["HTML", "CSS", "JavaScript", "React", "Vite"],
    Backend: ["Node.js", "Express", "Flask"],
    Database: ["MongoDB", "SQL"],
    "AI / ML": ["Machine Learning", "NLP", "RAG", "Scikit-learn"],
    Tools: ["Git", "GitHub", "VS Code", "Streamlit"],
  },

  experience: [
    {
      company: "Thiranex",
      role: "Full Stack Developer Intern",
      duration: "21st May 2026 - 20th June 2026",
      description:
        "Worked as a Full Stack Developer Intern, contributing to web application development, implementing responsive user interfaces, developing backend functionality, integrating databases and APIs, and improving overall application performance and user experience",
    },
  ],

  certifications: [
    "Deloitte Data Analytics Virtual Experience Program — Forage",
    "Complete Web Development Course — Udemy",
  ],

  achievements: [
    "",
    "",
  ],

  projects: [
    {
      name: "Spam Email Detection",
      description:
        "An AI-powered spam message and email classification project using text preprocessing and machine learning to identify spam content.",
      technologies: [
        "Python",
        "Scikit-learn",
        "NLTK",
        "TF-IDF",
        "Naive Bayes",
        "Streamlit",
        "Flask",
      ],
      github: "https://github.com/Avi7525/spam-detector-ai",
      live: "",
    },
    {
      name: "Hospital Load & Appointment Optimization",
      description:
        "A project concept for improving hospital appointment scheduling and balancing patient load. Add your final project description and implementation details here.",
      technologies: ["Add technology", "Add technology", "Add technology"],
      github: "",
      live: "",
    },
    
  ],
};

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Education", "education"],
  ["Contact", "contact"],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  // Lightweight typed-text animation; no extra typing library is required.
  useEffect(() => {
    const current = portfolio.roles[roleIndex];
    const speed = deleting ? 45 : 85;

    const timer = setTimeout(() => {
      if (!deleting && typedText === current) {
        setDeleting(true);
        return;
      }

      if (deleting && typedText === "") {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % portfolio.roles.length);
        return;
      }

      setTypedText(
        deleting
          ? current.slice(0, typedText.length - 1)
          : current.slice(0, typedText.length + 1)
      );
    }, typedText === current && !deleting ? 1300 : speed);

    return () => clearTimeout(timer);
  }, [typedText, deleting, roleIndex]);

  // Highlight the section currently visible on screen.
  useEffect(() => {
    const sections = navItems.map(([, id]) => document.getElementById(id));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.05, 0.25, 0.5] }
    );

    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return;
    }

    /*
      EMAILJS SETUP:
      1. Create an account at https://www.emailjs.com/
      2. Create an email service.
      3. Create an email template with:
         {{name}}, {{email}}, {{subject}}, {{message}}
      4. Replace the three values below.
    */
    const SERVICE_ID = "avinash@2006";
    const TEMPLATE_ID = "template_b4cj0xf";
    const PUBLIC_KEY = "MbnL0MthmltHmEMaF";

    if (
      SERVICE_ID.startsWith("YOUR_") ||
      TEMPLATE_ID.startsWith("YOUR_") ||
      PUBLIC_KEY.startsWith("YOUR_")
    ) {
      setStatus({
        type: "error",
        message:
          "Contact form is ready, but EmailJS is not configured yet. Add your Service ID, Template ID and Public Key in src/main.jsx.",
      });
      return;
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          to_email: portfolio.email,
        },
        { publicKey: PUBLIC_KEY }
      );

      setForm({ name: "", email: "", subject: "", message: "" });
      setStatus({
        type: "success",
        message: "Message sent successfully. Thank you!",
      });
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message:
          "Message could not be sent. Check your EmailJS configuration and try again.",
      });
    }
  };

  return (
    <div className="app">
      <header className="navbar">
        <button className="brand" onClick={() => scrollTo("home")}>
          <span className="brand-dot" />
          {portfolio.shortName}
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map(([label, id]) => (
            <button
              key={id}
              className={active === id ? "active" : ""}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
          <a
            className="nav-resume"
            href={portfolio.resume}
            target="_blank"
            rel="noreferrer"
          >
            Resume <ExternalLink size={14} />
          </a>
        </nav>

        <button
          className="menu-btn"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section id="home" className="hero section-shell">
          <div className="hero-copy reveal">
            <div className="eyebrow">
              <span /> OPEN TO OPPORTUNITIES
            </div>

            <p className="hero-small">Hi, my name is</p>
            <h1>
              {portfolio.shortName}
              <span className="gradient-text">.</span>
            </h1>

            <h2>
              I am a <span className="typed">{typedText}</span>
              <span className="cursor">|</span>
            </h2>

            <p className="hero-description">{portfolio.heroDescription}</p>

            <div className="hero-actions">
              <button className="primary-btn" onClick={() => scrollTo("projects")}>
                View My Work <ArrowUpRight size={18} />
              </button>
              <button className="secondary-btn" onClick={() => scrollTo("contact")}>
                Contact Me <Mail size={18} />
              </button>
            </div>

            <div className="social-row">
              <a href={portfolio.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={19} />
              </a>
              <a href={portfolio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={19} />
              </a>
              <a href={`mailto:${portfolio.email}`} aria-label="Email">
                <Mail size={19} />
              </a>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="photo-glow" />
            <div className="photo-frame">
              <img src="/assets/profile.png" alt={portfolio.name} />
            </div>
            <div className="floating-card card-top">
              <Code2 size={18} />
              <span>Build. Learn. Create.</span>
            </div>
            <div className="floating-card card-bottom">
              <Sparkles size={18} />
              <span>Always improving</span>
            </div>
          </div>
        </section>

        <section id="about" className="content-section section-shell">
          <SectionHeading
            eyebrow="01 — ABOUT ME"
            title="A little about me"
            icon={<UserRound size={22} />}
          />
          <div className="about-grid">
            <div className="about-card glass-card">
              <p>{portfolio.about}</p>
              <div className="quick-facts">
                <div>
                  <MapPin size={18} />
                  <span>{portfolio.location}</span>
                </div>
                <div>
                  <GraduationCap size={18} />
                  <span>B.Tech • 2023–2027</span>
                </div>
              </div>
            </div>
            <div className="about-highlight">
              <span className="quote-mark">“</span>
              <h3>Turning ideas into useful digital experiences.</h3>
              <p>
                I like building things that are practical, clean, responsive,
                and easy for people to use.
              </p>
            </div>
          </div>
        </section>

        <section id="skills" className="content-section section-shell">
          <SectionHeading
            eyebrow="02 — SKILLS"
            title="Technologies I work with"
            icon={<Code2 size={22} />}
          />
          <div className="skills-grid">
            {Object.entries(portfolio.skills).map(([category, skills]) => (
              <div className="skill-card glass-card" key={category}>
                <div className="skill-title">
                  {category === "Database" ? <Database size={19} /> : <Code2 size={19} />}
                  <h3>{category}</h3>
                </div>
                <div className="chips">
                  {skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="content-section section-shell">
          <SectionHeading
            eyebrow="03 — EXPERIENCE"
            title="Experience & internships"
            icon={<BriefcaseBusiness size={22} />}
          />
          <div className="timeline">
            {portfolio.experience.map((item, index) => (
              <article className="timeline-item" key={`${item.company}-${index}`}>
                <div className="timeline-dot" />
                <div className="timeline-card glass-card">
                  <div className="timeline-top">
                    <div>
                      <span className="muted">{item.duration}</span>
                      <h3>{item.role}</h3>
                      <h4>{item.company}</h4>
                    </div>
                  </div>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="content-section section-shell">
          <SectionHeading
            eyebrow="04 — PROJECTS"
            title="Things I’ve built"
            icon={<Code2 size={22} />}
          />
          <div className="projects-grid">
            {portfolio.projects.map((project, index) => (
              <article className="project-card glass-card" key={`${project.name}-${index}`}>
                <div className="project-number">0{index + 1}</div>
                <div className="project-content">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="chips">
                    {project.technologies.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.github ? (
                      <a href={project.github} target="_blank" rel="noreferrer">
                        <Github size={17} /> GitHub
                      </a>
                    ) : (
                      <span className="disabled-link">GitHub <small>Add link</small></span>
                    )}
                    {project.live ? (
                      <a href={project.live} target="_blank" rel="noreferrer">
                        <ExternalLink size={17} /> Live Demo
                      </a>
                    ) : (
                      <span className="disabled-link">Live Demo <small>Add link</small></span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="content-section section-shell">
          <SectionHeading
            eyebrow="05 — EDUCATION"
            title="Education"
            icon={<GraduationCap size={22} />}
          />
          <div className="education-grid">
            {portfolio.education.map((item) => (
              <article className="education-card glass-card" key={item.college}>
                <div className="education-icon"><GraduationCap /></div>
                <div>
                  <span className="muted">{item.start} — {item.end}</span>
                  <h3>{item.degree}</h3>
                  <h4>{item.college}</h4>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="content-section section-shell">
          <SectionHeading
            eyebrow="06 — CERTIFICATIONS"
            title="Certifications"
            icon={<Sparkles size={22} />}
          />
          <div className="simple-list-grid">
            {portfolio.certifications.map((item, index) => (
              <div className="simple-list-card glass-card" key={index}>
                <span>0{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="achievements" className="content-section section-shell">
          <SectionHeading
            eyebrow="07 — ACHIEVEMENTS"
            title="Achievements"
            icon={<Sparkles size={22} />}
          />
          <div className="simple-list-grid">
            {portfolio.achievements.map((item, index) => (
              <div className="simple-list-card glass-card" key={index}>
                <span>0{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="content-section contact-section section-shell">
          <SectionHeading
            eyebrow="08 — CONTACT"
            title="Let’s work together"
            icon={<MessageCircle size={22} />}
          />

          <div className="contact-grid">
            <div className="contact-copy">
              <h3>Have a project, opportunity, or just want to say hello?</h3>
              <p>
                Send me a message using the form. Once EmailJS is configured,
                messages will be delivered to your chosen email address.
              </p>

              <div className="contact-details">
                <a href={`mailto:${portfolio.email}`}>
                  <Mail size={19} />
                  <span>{portfolio.email}</span>
                </a>
                <div>
                  <MapPin size={19} />
                  <span>{portfolio.location}</span>
                </div>
                {portfolio.phone && (
                  <a href={`tel:${portfolio.phone}`}>
                    <MessageCircle size={19} />
                    <span>{portfolio.phone}</span>
                  </a>
                )}
              </div>

              <a
                className="resume-link"
                href={portfolio.resume}
                target="_blank"
                rel="noreferrer"
              >
                <Download size={18} /> Download Resume
              </a>
            </div>

            <form className="contact-form glass-card" onSubmit={sendMessage}>
              <div className="form-row">
                <label>
                  Name
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateForm}
                    placeholder="Your name"
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateForm}
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label>
                Subject
                <input
                  name="subject"
                  value={form.subject}
                  onChange={updateForm}
                  placeholder="How can I help?"
                />
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateForm}
                  placeholder="Write your message..."
                  rows="6"
                />
              </label>

              {status.message && (
                <div className={`form-status ${status.type}`}>{status.message}</div>
              )}

              <button className="primary-btn send-btn" type="submit">
                Send Message <Send size={17} />
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <p>© {new Date().getFullYear()} {portfolio.name}. All rights reserved.</p>
          <div>
            <a href={portfolio.github} target="_blank" rel="noreferrer"><Github size={18} /></a>
            <a href={portfolio.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
            <a href={`mailto:${portfolio.email}`}><Mail size={18} /></a>
          </div>
        </div>
      </footer>

      <button className="back-top" onClick={() => scrollTo("home")} aria-label="Back to top">
        ↑
      </button>
    </div>
  );
}

function SectionHeading({ eyebrow, title, icon }) {
  return (
    <div className="section-heading">
      <div>
        <div className="section-eyebrow">{icon}{eyebrow}</div>
        <h2>{title}</h2>
      </div>
      <span className="heading-line" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
