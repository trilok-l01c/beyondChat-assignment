import { useState, useEffect, useRef, useId } from "react";
import "./App.css";

// Lets do some real work
function Header() {
    return (
        <header>
            <nav></nav>
            <h1 id="title">Hello, world</h1>
            <p>Starting with this react project</p>
        </header>
    );
}
function List() {
    const [color, setColor] = useState("");
    useEffect(() => {
        const bodyStyle = document.querySelector("body").style;
        bodyStyle.backgroundColor = "#" + color;
        document.title = "Background color is #" + color;
    }, [color]);
    return (
        <>
            <select
                name="dropdown"
                id="select"
                onChange={(e) => {
                    setColor(e.target.value);
                }}
            >
                <option value="FF0000">dog</option>
                <option value="00FF00" selected={true}>
                    cat
                </option>
                <option value="0000FF">Mouse</option>
                <option value="0F0F0F">cockroach</option>
            </select>
        </>
    );
}

const RadioButton = () => {
    return (
        <>
            <input id="box1" type="radio" name="radio" />
            <label htmlFor="box1">Blue</label>
            <input id="box2" type="radio" name="radio" />
            <label htmlFor="box2">Red</label>
            <input type="radio" name="radio" />
            <label htmlFor="box3">Green</label>
        </>
    );
};

function App() {
    const [name, setName] = useState("Alice");
    const [count, setCount] = useState(0);
    // using useRef
    const inputRef = useRef(null);
    useEffect(() => {
        if (count % 5 === 0) inputRef.current.focus();
    }, [count]);
    return (
        <>
            <Header />
            <input
                type="text"
                ref={inputRef}
                value={name}
                onChange={(e) => {
                    const newName = e.target.value;
                    setName(newName);
                }}
            />
            <div width={100} height={100}>
                Your name is: {name}
            </div>
            <span width={50} height={100}>
                Count: {count}
            </span>
            <button
                onClick={() => {
                    setCount((c) => c + 1);
                }}
            >
                Hit me to count!
            </button>
            <List />
            <RadioButton />
        </>
    );
}

export default App;
