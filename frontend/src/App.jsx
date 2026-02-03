import { useState, useEffect, useRef, useContext } from "react";
import "./App.css";
import "./PostCard";
import Tab from "./Tab";
import { TabContext } from "./TabContext";
function App() {
    // here we will have our articles array
    const [activeTab, SetActiveTab] = useState(0);
    const totalTabs = 3;
    const handleNext = () => {
        SetActiveTab((prev) => Math.min(prev + 1, totalTabs - 1));
    };

    const handlePrev = () => {
        SetActiveTab((prev) => Math.max(prev - 1, 0));
    };
    return (
        <>
            <h2>Job application form</h2>
            <TabContext.Provider value={{ activeTab, SetActiveTab, totalTabs }}>
                <Tab
                    onNext={handleNext}
                    onPrev={handlePrev}
                    activeTab={activeTab}
                    SetActiveTab={SetActiveTab}
                />
            </TabContext.Provider>
        </>
    );
}

export default App;
// why it's feeling overwhelming?
// Because good things take time. It's a skill. I didn't hit big sixes from the first day, I started playing cricket. Slow down, take time!
