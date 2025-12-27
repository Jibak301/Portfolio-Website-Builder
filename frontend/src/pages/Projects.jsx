import { useEffect, useState } from "react";
import { addProject, getProjects, deleteProject } from "../api";

export default function Projects() {
    const token = localStorage.getItem("token");
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({ title: "", description: "" });

    useEffect(() => {
        getProjects(token).then(res => res.json()).then(setProjects);
    }, []);

    const add = async () => {
        const fd = new FormData();
        Object.keys(form).forEach(k => fd.append(k, form[k]));
        const res = await addProject(token, fd);
        setProjects([...projects, await res.json()]);
    };

    return (
        <div>
            <h3>Projects</h3>
            <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
            <textarea placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
            <input type="file" onChange={e => setForm({ ...form, image: e.target.files[0] })} />
            <button onClick={add}>Add</button>

            {projects.map(p => (
                <div key={p._id}>
                    {p.title}
                    <button onClick={() => deleteProject(token, p._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}
