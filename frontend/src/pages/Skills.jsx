import { useEffect, useState } from "react";
import { addSkill, getSkills, deleteSkill } from "../api";

export default function Skills() {
    const token = localStorage.getItem("token");
    const [skills, setSkills] = useState([]);
    const [name, setName] = useState("");
    const [level, setLevel] = useState("");

    useEffect(() => {
        getSkills(token).then(res => res.json()).then(setSkills);
    }, []);

    const add = async () => {
        const res = await addSkill(token, { name, level });
        setSkills([...skills, await res.json()]);
    };

    return (
        <div>
            <h3>Skills</h3>
            <input placeholder="Skill" onChange={e => setName(e.target.value)} />
            <input placeholder="Level" onChange={e => setLevel(e.target.value)} />
            <button onClick={add}>Add</button>

            {skills.map(s => (
                <div key={s._id}>
                    {s.name} - {s.level}
                    <button onClick={() => deleteSkill(token, s._id)}>X</button>
                </div>
            ))}
        </div>
    );
}
