export default function Classic({ data }) {
    return (
        <div>
            {data.photo && <img src={data.photo} width="120" />}
            <h1>{data.name}</h1>
            <p>{data.bio}</p>

            <h3>Skills</h3>
            {data.skills.map(s => (
                <p key={s._id}>{s.icon} {s.name} - {s.level}</p>
            ))}

            <h3>Projects</h3>
            {data.projects.map(p => (
                <div key={p._id}>
                    <h4>{p.title}</h4>
                    <p>{p.description}</p>
                    <a href={p.github}>GitHub</a>
                </div>
            ))}
        </div>
    );
}
