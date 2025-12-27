export default function Sidebar({ setPage, setToken }) {
    return (
        <div className="sidebar">
            <h3>Dashboard</h3>

            <p onClick={() => setPage("profile")}>Profile</p>
            <p onClick={() => setPage("skills")}>Skills</p>
            <p onClick={() => setPage("projects")}>Projects</p>

            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    setToken(null);
                }}
            >
                Logout
            </button>
        </div>
    );
}
