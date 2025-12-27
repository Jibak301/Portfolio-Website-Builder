import "../style/preview.css";

export default function Modern({ data }) {
    return (
        <div className="modern-template">
            {/* HERO */}
            <header className="modern-hero">
                {data.photo && <img src={data.photo} alt="Profile" />}
                <div>
                    <h1>{data.name}</h1>
                    <p>{data.bio}</p>
                </div>
            </header>

            {/* CONTACT */}
            <section className="modern-section">
                <h3>Contact</h3>
                <div className="modern-links">
                    {data.contact?.email && <span>📧 {data.contact.email}</span>}
                    {data.contact?.phone && <span>📞 {data.contact.phone}</span>}
                    {data.contact?.linkedin && (
                        <a href={data.contact.linkedin} target="_blank">LinkedIn</a>
                    )}
                    {data.contact?.github && (
                        <a href={data.contact.github} target="_blank">GitHub</a>
                    )}
                </div>
            </section>

            {/* SKILLS */}
            <section className="modern-section">
                <h3>Skills</h3>
                <div className="modern-skills">
                    {data.skills.map((s) => (
                        <div key={s._id} className="skill-chip">
                            {s.icon} {s.name}
                            <small>{s.level}</small>
                        </div>
                    ))}
                </div>
            </section>

            {/* PROJECTS */}
            <section className="modern-section">
                <h3>Projects</h3>
                <div className="modern-projects">
                    {data.projects.map((p) => (
                        <div key={p._id} className="project-card">
                            {p.image && <img src={p.image} alt={p.title} />}
                            <h4>{p.title}</h4>
                            <p>{p.description}</p>
                            <small>{p.tech}</small>
                            <div className="project-links">
                                {p.github && <a href={p.github}>GitHub</a>}
                                {p.demo && <a href={p.demo}>Demo</a>}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* RESUME */}
            {data.resume && (
                <footer className="modern-footer">
                    <a href={`http://localhost:5000/${data.resume}`} target="_blank">
                        📄 Download Resume
                    </a>
                </footer>
            )}
        </div>
    );
}
