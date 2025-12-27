import "../style/preview.css";

export default function Minimal({ data }) {
    return (
        <div className="minimal-template">
            {/* HEADER */}
            <header>
                <h1>{data.name}</h1>
                <p>{data.bio}</p>
            </header>

            {/* PROFILE IMAGE */}
            {data.photo && (
                <img src={data.photo} alt="Profile" className="minimal-avatar" />
            )}

            {/* CONTACT */}
            <section>
                <h3>Contact</h3>
                <p>{data.contact?.email}</p>
                <p>{data.contact?.phone}</p>
                {data.contact?.linkedin && (
                    <a href={data.contact.linkedin}>LinkedIn</a>
                )}
                {data.contact?.github && (
                    <a href={data.contact.github}>GitHub</a>
                )}
            </section>

            {/* SKILLS */}
            <section>
                <h3>Skills</h3>
                <ul>
                    {data.skills.map((s) => (
                        <li key={s._id}>
                            {s.icon} {s.name} – {s.level}
                        </li>
                    ))}
                </ul>
            </section>

            {/* PROJECTS */}
            <section>
                <h3>Projects</h3>
                {data.projects.map((p) => (
                    <div key={p._id} className="minimal-project">
                        <h4>{p.title}</h4>
                        <p>{p.description}</p>
                        <small>{p.tech}</small><br />
                        {p.github && <a href={p.github}>GitHub</a>}{" "}
                        {p.demo && <a href={p.demo}>Demo</a>}
                    </div>
                ))}
            </section>

            {/* RESUME */}
            {data.resume && (
                <a href={`http://localhost:5000/${data.resume}`} target="_blank">
                    Download Resume
                </a>
            )}
        </div>
    );
}
