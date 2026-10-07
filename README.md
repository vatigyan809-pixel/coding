 HTML    


 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Raunak Verma | Portfolio</title>

    <link rel="stylesheet" href="port.css">
</head>

<body>

    <!-- Navbar -->
    <header>
        <nav class="navbar">
            <div class="logo">Raunak Verma</div>

            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>

            <div class="menu-btn" id="menuBtn">☰</div>
        </nav>
    </header>

    <!-- Home -->
    <section id="home" class="hero">
        <div class="hero-content">
            <p class="hello">Hello, I'm</p>

            <h1>Raunak Verma</h1>

            <h2>Computer Science Student</h2>

            <p>
                B.Tech CSIT Student at GL Bajaj Institute of Technology & Management.
                I am passionate about Web Development, Programming and DSA.
            </p>

            <div class="buttons">
                <a href="#projects" class="btn">View Projects</a>
                <a href="#contact" class="btn secondary">Contact Me</a>
            </div>
        </div>

        <div class="hero-card">
            <div class="profile-circle">RV</div>
            <h3>CSIT Student</h3>
            <p>Developer & Programmer</p>
        </div>
    </section>

    <!-- About -->
    <section id="about" class="section">
        <h2 class="section-title">About Me</h2>

        <div class="about-content">
            <div>
                <h3>Hi, I'm Raunak Verma 👋</h3>

                <p>
                    I am a Computer Science and Information Technology student
                    at GL Bajaj. I enjoy learning programming, developing websites
                    and solving Data Structures and Algorithms problems.
                </p>

                <p>
                    My current technical interests include Web Development,
                    Python, C Programming and Data Structures & Algorithms.
                </p>
            </div>

            <div class="education">
                <h3>Education</h3>
                <h4>GL Bajaj Institute of Technology & Management</h4>
                <p>B.Tech - Computer Science & Information Technology</p>
            </div>
        </div>
    </section>

    <!-- Skills -->
    <section id="skills" class="section skills-section">
        <h2 class="section-title">My Skills</h2>

        <div class="skills-container">

            <div class="skill-card">
                <div class="skill-icon">🌐</div>
                <h3>HTML</h3>
                <p>Building structured and semantic web pages.</p>
            </div>

            <div class="skill-card">
                <div class="skill-icon">🎨</div>
                <h3>CSS</h3>
                <p>Creating responsive and attractive websites.</p>
            </div>

            <div class="skill-card">
                <div class="skill-icon">⚡</div>
                <h3>JavaScript</h3>
                <p>Adding interaction and dynamic functionality.</p>
            </div>

            <div class="skill-card">
                <div class="skill-icon">🐍</div>
                <h3>Python</h3>
                <p>Programming, problem solving and scripting.</p>
            </div>

            <div class="skill-card">
                <div class="skill-icon">💻</div>
                <h3>C Language</h3>
                <p>Strong programming and fundamental concepts.</p>
            </div>

            <div class="skill-card">
                <div class="skill-icon">🧠</div>
                <h3>DSA with C</h3>
                <p>Data structures, algorithms and problem solving.</p>
            </div>

        </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="section">
        <h2 class="section-title">My Projects</h2>

        <div class="projects-container">

            <div class="project-card">
                <span>01</span>
                <h3>Personal Portfolio</h3>
                <p>
                    A responsive personal portfolio website created using
                    HTML, CSS and JavaScript.
                </p>
                <div class="tech">
                    <small>HTML</small>
                    <small>CSS</small>
                    <small>JavaScript</small>
                </div>
            </div>

            <div class="project-card">
                <span>02</span>
                <h3>DSA Programs</h3>
                <p>
                    Collection of Data Structures and Algorithms programs
                    implemented using C language.
                </p>
                <div class="tech">
                    <small>C</small>
                    <small>DSA</small>
                </div>
            </div>

            <div class="project-card">
                <span>03</span>
                <h3>Python Projects</h3>
                <p>
                    Beginner-friendly Python programs and problem-solving
                    projects.
                </p>
                <div class="tech">
                    <small>Python</small>
                </div>
            </div>

        </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="section contact-section">
        <h2 class="section-title">Contact Me</h2>

        <div class="contact-container">

            <div class="contact-info">
                <h3>Let's Connect</h3>

                <p>
                    If you want to discuss a project, collaboration or
                    internship opportunity, feel free to contact me.
                </p>

                <p>📧 Email: your-email@example.com</p>
                <p>📍 India</p>
            </div>

            <form id="contactForm">

                <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    required
                >

                <input
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    required
                >

                <textarea
                    id="message"
                    rows="5"
                    placeholder="Your Message"
                    required
                ></textarea>

                <button type="submit" class="btn">
                    Send Message
                </button>

            </form>

        </div>
    </section>

    <!-- Footer -->
    <footer>
        <p>
            © 2026 Raunak Verma. All Rights Reserved.
        </p>

        <p>
            Made with ❤️ using HTML, CSS & JavaScript
        </p>
    </footer>

    <script src=" port.js"></script>

</body>
</html>























css
/* =========================
   General
========================= */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background: #0b1120;
    color: #ffffff;
    line-height: 1.6;
}

a {
    text-decoration: none;
    color: inherit;
}

header {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    background: rgba(11, 17, 32, 0.95);
    border-bottom: 1px solid #1e293b;
}

/* =========================
   Navbar
========================= */

.navbar {
    max-width: 1200px;
    margin: auto;
    padding: 18px 25px;

    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    font-size: 25px;
    font-weight: bold;
    color: #38bdf8;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 30px;
}

.nav-links a {
    color: #e2e8f0;
    transition: 0.3s;
}

.nav-links a:hover {
    color: #38bdf8;
}

.menu-btn {
    display: none;
    font-size: 28px;
    cursor: pointer;
}

/* =========================
   Hero
========================= */

.hero {
    min-height: 100vh;
    max-width: 1200px;
    margin: auto;

    padding: 130px 25px 70px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 50px;
}

.hero-content {
    max-width: 650px;
}

.hello {
    color: #38bdf8;
    font-size: 20px;
    margin-bottom: 5px;
}

.hero h1 {
    font-size: 65px;
    line-height: 1.1;
    margin-bottom: 10px;
}

.hero h2 {
    color: #94a3b8;
    font-size: 28px;
    margin-bottom: 20px;
}

.hero-content > p:not(.hello) {
    color: #cbd5e1;
    font-size: 17px;
}

.buttons {
    display: flex;
    gap: 15px;
    margin-top: 30px;
}

.btn {
    display: inline-block;
    padding: 12px 25px;
    background: #38bdf8;
    color: #07111f;
    border-radius: 8px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
}

.btn:hover {
    transform: translateY(-3px);
    background: #7dd3fc;
}

.btn.secondary {
    background: transparent;
    color: #38bdf8;
    border: 1px solid #38bdf8;
}

.btn.secondary:hover {
    background: #38bdf8;
    color: #07111f;
}

/* Profile Card */

.hero-card {
    width: 320px;
    height: 350px;

    background: linear-gradient(
        145deg,
        #172554,
        #0f172a
    );

    border: 1px solid #1e40af;
    border-radius: 25px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.profile-circle {
    width: 150px;
    height: 150px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #38bdf8;
    color: #07111f;

    font-size: 50px;
    font-weight: bold;

    margin-bottom: 25px;
}

.hero-card h3 {
    font-size: 25px;
}

.hero-card p {
    color: #94a3b8;
}

/* =========================
   Sections
========================= */

.section {
    max-width: 1200px;
    margin: auto;
    padding: 100px 25px;
}

.section-title {
    text-align: center;
    font-size: 40px;
    margin-bottom: 50px;
    color: #38bdf8;
}

/* =========================
   About
========================= */

.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
}

.about-content > div {
    background: #111827;
    border: 1px solid #1e293b;
    border-radius: 15px;
    padding: 30px;
}

.about-content h3 {
    font-size: 25px;
    margin-bottom: 15px;
}

.about-content h4 {
    color: #38bdf8;
    margin-bottom: 8px;
}

.about-content p {
    color: #cbd5e1;
    margin-bottom: 15px;
}

/* =========================
   Skills
========================= */

.skills-section {
    max-width: 100%;
    background: #0f172a;
}

.skills-container {
    max-width: 1200px;
    margin: auto;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
}

.skill-card {
    background: #111827;
    padding: 30px;
    border-radius: 15px;
    border: 1px solid #1e293b;
    transition: 0.3s;
}

.skill-card:hover {
    transform: translateY(-8px);
    border-color: #38bdf8;
}

.skill-icon {
    font-size: 40px;
    margin-bottom: 15px;
}

.skill-card h3 {
    font-size: 22px;
    margin-bottom: 10px;
}

.skill-card p {
    color: #94a3b8;
}

/* =========================
   Projects
========================= */

.projects-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
}

.project-card {
    position: relative;

    background: #111827;
    padding: 30px;
    border-radius: 15px;

    border: 1px solid #1e293b;
    transition: 0.3s;
}

.project-card:hover {
    transform: translateY(-8px);
    border-color: #38bdf8;
}

.project-card > span {
    color: #38bdf8;
    font-size: 14px;
}

.project-card h3 {
    font-size: 24px;
    margin: 15px 0;
}

.project-card p {
    color: #94a3b8;
}

.tech {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 20px;
}

.tech small {
    padding: 5px 10px;
    background: #1e293b;
    color: #38bdf8;
    border-radius: 5px;
}

/* =========================
   Contact
========================= */

.contact-section {
    background: #0f172a;
    max-width: 100%;
}

.contact-container {
    max-width: 1000px;
    margin: auto;

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
}

.contact-info h3 {
    font-size: 30px;
    margin-bottom: 15px;
}

.contact-info p {
    color: #94a3b8;
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

input,
textarea {
    width: 100%;
    padding: 14px;

    background: #111827;
    color: white;

    border: 1px solid #334155;
    border-radius: 8px;

    outline: none;
    font-size: 16px;
}

input:focus,
textarea:focus {
    border-color: #38bdf8;
}

textarea {
    resize: vertical;
}

/* =========================
   Footer
========================= */

footer {
    text-align: center;
    padding: 30px 20px;
    background: #020617;
    color: #64748b;
}

footer p {
    margin: 5px;
}

/* =========================
   Responsive
========================= */

@media (max-width: 800px) {

    .nav-links {
        position: absolute;
        top: 70px;
        right: 0;

        width: 100%;
        background: #0b1120;

        display: none;
        flex-direction: column;
        text-align: center;

        padding: 20px;
    }

    .nav-links.active {
        display: flex;
    }

    .menu-btn {
        display: block;
    }

    .hero {
        flex-direction: column;
        text-align: center;
    }

    .hero h1 {
        font-size: 48px;
    }

    .buttons {
        justify-content: center;
        flex-wrap: wrap;
    }

    .about-content,
    .contact-container {
        grid-template-columns: 1fr;
    }

    .skills-container,
    .projects-container {
        grid-template-columns: 1fr 1fr;
    }

    .hero-card {
        width: 280px;
    }
}

@media (max-width: 550px) {

    .hero h1 {
        font-size: 40px;
    }

    .hero h2 {
        font-size: 22px;
    }

    .section-title {
        font-size: 32px;
    }

    .skills-container,
    .projects-container {
        grid-template-columns: 1fr;
    }
}













JAVA SCRIPT


// Mobile Menu

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// Close menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


// Contact Form

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;

    alert(
        "Thank you, " + name +
        "! Your message has been received."
    );

    contactForm.reset();
});





