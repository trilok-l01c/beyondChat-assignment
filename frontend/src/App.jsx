import { useState } from "react";
import "./App.css";

function App() {
    const [name, setName] = useState("Trilok");
    return (
        <>
            <input
                type="text"
                value={name}
                onChange={(e) => {
                    const newName = e.target.value;
                    setName(newName);
                }}
            />
            <div width={100} height={100}>
                Your name is:
                {name}
            </div>
        </>
    );
}

export default App;
