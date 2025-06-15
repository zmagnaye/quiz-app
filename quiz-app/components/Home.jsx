import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [formData, setFormData] = useState({
        name: "",
        category:"",
        difficulty:"",
    });
    
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validation for all required fields
        if(!formData.name || !formData.category || !formData.difficulty) {
            setError("Fill out all fields.");
            return;
        }

        //If no error, proceed
        setError("");
        console.log("Form submitted: ", formData);

        navigate("quiz", {state: formData});
    };

    return (
        <div className="home-container">
            <h1>Trivia Quiz</h1>
            <p className="instructions"> Please enter your Name and select your quiz preference.</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">First Name:</label><br/>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}></input>
                </div>

                <div>
                    <label htmlFor="category">Category:</label><br/>
                    <select id="category" name="category" value={formData.category} onChange={handleChange}>
                        <option value="">Choose a category:</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="17">Science & Nature</option>
                        <option value="18">Science & Computers</option>
                        <option value="21">Sports</option>
                        <option value="23">History</option>
                        <option value="32">Entertainment: Cartoon & Animation</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="difficulty">Difficulty:</label><br/>
                    <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange}>
                        <option value="">Choose the difficulty:</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <br/>

                <button type="submit">Start</button>

                {error && <p className="error-messge">{error}</p>}
            </form>
        </div>
    );
}

export default Home;