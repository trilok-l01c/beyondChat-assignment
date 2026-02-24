import { useState } from "react";

// ################# learn how to retrieve content from the backend ###########################
// - We need the data from our api we made with the help of express
const [blogsData, setData] = useState([
    {
        title: "dummy blog1",
        content: "...",
    },
]);

// main App component
const App = () => {
    return (
        <>
            <h1 className="title">Thought Notes</h1>
            <div className="container"></div>
        </>
    );
};
