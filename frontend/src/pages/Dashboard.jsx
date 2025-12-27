import { useEffect, useState } from "react";
import "../style/dashbroad.css";
import { getToken, logout } from "../utils/Auth";
import {
  FaUser,
  FaTools,
  FaProjectDiagram,
  FaFilePdf,
  FaMoon,
  FaSun,
  FaGripLines
} from "react-icons/fa";

export default function Dashboard({ setPage }) {
  const token = getToken();

  /* ================= UI ================= */
  const [active, setActive] = useState("profile");
  const [mode, setMode] = useState("light");
  const [theme, setTheme] = useState({
    template: "classic",
    color: "#4f46e5",
    font: "Arial",
    layout: "full"
  });

  /* ================= CORE DATA ================= */
  const [published, setPublished] = useState(false);

  const [sectionsOrder, setSectionsOrder] = useState([
    "profile",
    "skills",
    "projects",
    "resume",
    "themes",
    "publish"
  ]);

  /* ================= PROFILE ================= */
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    photo: "",
    email: "",
    phone: "",
    linkedin: "",
    github: ""
  });

  /* ================= SKILLS ================= */
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState({
    name: "",
    level: "Beginner",
    icon: "⭐"
  });

  /* ================= PROJECTS ================= */
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    demo: "",
    image: ""
  });

  /* ================= RESUME ================= */
  const [resume, setResume] = useState("");

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    fetch("http://localhost:5000/api/portfolio", {
      headers: { authorization: token }
    })
      .then(res => res.json())
      .then(data => {
        setProfile({
          name: data.name || "",
          bio: data.bio || "",
          photo: data.photo || "",
          email: data.contact?.email || "",
          phone: data.contact?.phone || "",
          linkedin: data.contact?.linkedin || "",
          github: data.contact?.github || ""
        });

        setSkills(data.skills || []);
        setProjects(data.projects || []);
        setPublished(data.published || false);
        setResume(data.resume || "");
        setTheme(data.theme || theme);
      });
  }, []);

  /* ================= SAVE PROFILE ================= */
  const saveProfile = async () => {
    await fetch("http://localhost:5000/api/portfolio/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify({
        name: profile.name,
        bio: profile.bio,
        photo: profile.photo,
        contact: {
          email: profile.email,
          phone: profile.phone,
          linkedin: profile.linkedin,
          github: profile.github
        }
      })
    });
    alert("Profile saved");
  };

  const saveTheme = async () => {
    await fetch("http://localhost:5000/api/portfolio/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify({ theme })
    });

    alert("Template saved successfully");
  };

  /* ================= SKILLS ================= */
  const addSkill = async () => {
    if (!skill.name) return;

    const res = await fetch("http://localhost:5000/api/portfolio/skill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify(skill)
    });

    const savedSkill = await res.json();
    setSkills([...skills, savedSkill]);
    setSkill({ name: "", level: "Beginner", icon: "⭐" });
  };

  const updateSkill = async (s) => {
    await fetch(`http://localhost:5000/api/portfolio/skill/${s._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify(s)
    });
  };

  const deleteSkill = async (id) => {
    await fetch(`http://localhost:5000/api/portfolio/skill/${id}`, {
      method: "DELETE",
      headers: { authorization: token }
    });
    setSkills(skills.filter(s => s._id !== id));
  };

  /* ================= PROJECTS ================= */
  const addProject = async () => {
    if (!project.title) return;

    const res = await fetch("http://localhost:5000/api/portfolio/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify(project)
    });

    const savedProject = await res.json();
    setProjects([...projects, savedProject]);

    setProject({
      title: "",
      description: "",
      tech: "",
      github: "",
      demo: "",
      image: ""
    });
  };

  const updateProject = async (p) => {
    await fetch(`http://localhost:5000/api/portfolio/project/${p._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify(p)
    });
  };

  const deleteProject = async (id) => {
    await fetch(`http://localhost:5000/api/portfolio/project/${id}`, {
      method: "DELETE",
      headers: { authorization: token }
    });
    setProjects(projects.filter(p => p._id !== id));
  };

  /* ================= RESUME ================= */
  const uploadResume = async (file) => {
    const formData = new FormData();
    formData.append("resume", file);

    const res = await fetch("http://localhost:5000/api/portfolio/resume", {
      method: "POST",
      headers: { authorization: token },
      body: formData
    });

    const data = await res.json();
    setResume(data.resume);
    alert("Resume uploaded");
  };

  /* ================= PUBLISH ================= */
  const togglePublish = async () => {
    await fetch("http://localhost:5000/api/portfolio/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify({ published: !published })
    });
    setPublished(!published);
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    logout();
    setPage("login");
  };

  /* ================= DRAG & DROP ================= */
  const reorder = (from, to) => {
    const updated = [...sectionsOrder];
    const moved = updated.splice(from, 1)[0];
    updated.splice(to, 0, moved);
    setSectionsOrder(updated);
  };

  /* ================= UI ================= */
  return (
    <div className={`dashboard-layout ${mode}`}>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Dashboard</h2>

        {sectionsOrder.map((s, i) => (
          <button
            key={s}
            draggable
            onDragStart={e => e.dataTransfer.setData("index", i)}
            onDragOver={e => e.preventDefault()}
            onDrop={e => reorder(e.dataTransfer.getData("index"), i)}
            onClick={() => setActive(s)}
          >
            <FaGripLines /> {s.toUpperCase()}
          </button>
        ))}

        <button onClick={() => setMode(mode === "light" ? "dark" : "light")}>
          {mode === "light" ? <FaMoon /> : <FaSun />} Mode
        </button>

        <button onClick={() => setPage("preview")}>Live Preview</button>
        <button onClick={handleLogout}>Logout</button>
      </aside>

      {/* CONTENT */}
      <main className="content">
        {active === "profile" && (
          <section className="card">
            <h3><FaUser /> Profile</h3>
            <input placeholder="Name" value={profile.name}
              onChange={e => setProfile({ ...profile, name: e.target.value })} />
            <textarea placeholder="Bio" value={profile.bio}
              onChange={e => setProfile({ ...profile, bio: e.target.value })} />
            <input placeholder="Profile Photo URL" value={profile.photo}
              onChange={e => setProfile({ ...profile, photo: e.target.value })} />
            {profile.photo && <img src={profile.photo} className="avatar" />}
            <input placeholder="Email" value={profile.email}
              onChange={e => setProfile({ ...profile, email: e.target.value })} />
            <input placeholder="Phone" value={profile.phone}
              onChange={e => setProfile({ ...profile, phone: e.target.value })} />
            <input placeholder="LinkedIn" value={profile.linkedin}
              onChange={e => setProfile({ ...profile, linkedin: e.target.value })} />
            <input placeholder="GitHub" value={profile.github}
              onChange={e => setProfile({ ...profile, github: e.target.value })} />
            <button onClick={saveProfile}>Save Profile</button>
          </section>
        )}

        {active === "skills" && (
          <section className="card">
            <h3><FaTools /> Skills</h3>
            <input placeholder="Skill" value={skill.name}
              onChange={e => setSkill({ ...skill, name: e.target.value })} />
            <select value={skill.level}
              onChange={e => setSkill({ ...skill, level: e.target.value })}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <button onClick={addSkill}>Add Skill</button>
            {skills.map(s => (
              <div key={s._id}>
                {s.icon} {s.name} ({s.level})
                <button onClick={() => deleteSkill(s._id)}>❌</button>
              </div>
            ))}
          </section>
        )}

        {active === "projects" && (
          <section className="card">
            <h3><FaProjectDiagram /> Projects</h3>
            <input placeholder="Title" value={project.title}
              onChange={e => setProject({ ...project, title: e.target.value })} />
            <textarea placeholder="Description" value={project.description}
              onChange={e => setProject({ ...project, description: e.target.value })} />
            <input placeholder="Tech Stack" value={project.tech}
              onChange={e => setProject({ ...project, tech: e.target.value })} />
            <input placeholder="GitHub" value={project.github}
              onChange={e => setProject({ ...project, github: e.target.value })} />
            <input placeholder="Demo" value={project.demo}
              onChange={e => setProject({ ...project, demo: e.target.value })} />
            <input placeholder="Image URL" value={project.image}
              onChange={e => setProject({ ...project, image: e.target.value })} />
            <button onClick={addProject}>Add Project</button>
            {projects.map(p => (
              <div key={p._id}>
                <b>{p.title}</b>
                <button onClick={() => deleteProject(p._id)}>❌</button>
              </div>
            ))}
          </section>
        )}

        {active === "resume" && (
          <section className="card">
            <h3><FaFilePdf /> Resume</h3>
            <input type="file" accept="application/pdf"
              onChange={e => uploadResume(e.target.files[0])} />
            {resume && (
              <a href={`http://localhost:5000/${resume}`} target="_blank">
                Download Resume
              </a>
            )}
          </section>
        )}

        {active === "themes" && (
          <section className="card">
            <h3>Choose Template</h3>

            <div className="template-grid">

              <div
                className={`template-card ${theme.template === "classic" ? "active" : ""}`}
                onClick={() => setTheme({ ...theme, template: "classic" })}
              >
                <h4>Classic</h4>
                <p>Clean & professional</p>
              </div>

              <div
                className={`template-card ${theme.template === "modern" ? "active" : ""}`}
                onClick={() => setTheme({ ...theme, template: "modern" })}
              >
                <h4>Modern</h4>
                <p>Bold & colorful</p>
              </div>

              <div
                className={`template-card ${theme.template === "minimal" ? "active" : ""}`}
                onClick={() => setTheme({ ...theme, template: "minimal" })}
              >
                <h4>Minimal</h4>
                <p>Simple & elegant</p>
              </div>

              <div
                className={`template-card ${theme.template === "creative" ? "active" : ""}`}
                onClick={() => setTheme({ ...theme, template: "creative" })}
              >
                <h4>Creative</h4>
                <p>Stylish layout</p>
              </div>

            </div>

            <button onClick={saveTheme}>Save Template</button>
          </section>
        )}

        {active === "publish" && (
          <section className="card">
            <h3>Publish Portfolio</h3>
            <button onClick={togglePublish}>
              {published ? "Unpublish" : "Publish"}
            </button>
            {published && (
              <p>
                Public URL:<br />
                <b>http://localhost:5173/{profile.name}</b>
              </p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
