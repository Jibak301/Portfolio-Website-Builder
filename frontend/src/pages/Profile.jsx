import { useState } from "react";
import { updateProfile, uploadPhoto, uploadResume } from "../api";

export default function Profile() {
    const token = localStorage.getItem("token");
    const [form, setForm] = useState({ name: "", bio: "" });

    return (
        <div>
            <h3>Profile</h3>

            <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
            <textarea placeholder="Bio" onChange={e => setForm({ ...form, bio: e.target.value })} />

            <button onClick={() => updateProfile(token, form)}>Save</button>

            <input type="file" onChange={e => uploadPhoto(token, e.target.files[0])} />
            <input type="file" onChange={e => uploadResume(token, e.target.files[0])} />
        </div>
    );
}
