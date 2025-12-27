import { useEffect, useState } from "react";
import Classic from "../Template/Classsic";
import Modern from "../Template/moder";
import Minimal from "../Template/Minimal";
import { getToken } from "../utils/Auth";

export default function Preview({ setPage }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        // ⚡ Load instantly from cache
        const cached = localStorage.getItem("previewData");
        if (cached) {
            setData(JSON.parse(cached));
        }

        // 🔄 Sync in background (no UI block)
        fetch("http://localhost:5000/api/portfolio", {
            headers: { authorization: getToken() }
        })
            .then(res => res.json())
            .then(fresh => {
                setData(fresh);
                localStorage.setItem("previewData", JSON.stringify(fresh));
            });
    }, []);

    if (!data) return <p>Loading...</p>;

    const Template =
        data.theme?.template === "modern"
            ? Modern
            : data.theme?.template === "minimal"
                ? Minimal
                : Classic;

    return (
        <>
            <button onClick={() => setPage("dashboard")}>⬅ Back</button>
            <Template data={data} />
        </>
    );
}
