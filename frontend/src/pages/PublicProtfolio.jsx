import { useEffect, useState } from "react";
import Classic from "../Template/Classsic";

export default function PublicPortfolio({ username }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/portfolio/public/${username}`)
            .then(res => res.json())
            .then(setData);
    }, []);

    if (!data) return <p>Portfolio not found</p>;
    return <Classic data={data} />;
}
