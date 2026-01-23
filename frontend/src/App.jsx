import { useState, useEffect, useRef, useId } from "react";
import "./App.css";
import "./PostCard";
import Tab from "./Tab";
function App() {
    // here we will have our articles array
    const [activeTab, SetActiveTab] = useState(0);
    return (
        <>
            <div className="container">
                <Tab activeTab={activeTab} />
            </div>
        </>
    );
}

export default App;
// why it's feeling overwhelming?
// Because good things take time. It's a skill. I didn't hit big sixes from the first day, I started playing cricket. Slow down, take time!
