import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";

function Quiz() {
    const location = useLocation();
    const { name, category, difficulty } = location.state;
    const [questions, setQuestions] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selAnswer, setSelAnswer] = useState("");
    const [showResult, setShowResult] = useState(false);

    //fetch questions from API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch (
                    `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
                );

                const data = await response.json();
                const formatQuestion = data.results.map((q) => {
                    const allAnswers = [...q.incorrect_answers];
                    const randIndex = Math.floor(Math.random() * 10);
                    allAnswers.splice(randIndex, 0, q.correct_answer);
                    return {
                        question: q.question, correct: q.correct_answer, answers: allAnswers
                    };
                });

                setQuestions(formatQuestion);
            } catch (error) {
                console.error("Error fetching questions: ", error);
            }
        };
        
        fetchQuestions();
    }, [category, difficulty]);

    const handleAnswer = (answer) => {
        if (answer === questions[currIndex].correct) {
            setScore((prev) => prev + 1);
        }

        if (currIndex + 1 < questions.length) {
            setCurrIndex((prev) => prev + 1);
            setSelAnswer("");
        } else {
            setShowResult(true);
        }
    };

    if (questions.length === 0) {
        return <div className="quiz-container">
            <p>Loading Questions...</p>
        </div>;
    }

    if (showResult) {
        return (
            <div className="quiz-container"> 
                <h2>Quiz Completed</h2>
                <p>{name}, your score is {score} out of {questions.length}</p>
            </div>
        );
    }

    const currQuestion = questions[currIndex];
    
    return (
        <div className="quiz-container">
            <h2>Question {currIndex + 1} of {questions.length}</h2>
            <h3 dangerouslySetInnerHTML={{__html: currQuestion.question}}/>
            <ul>
                {currQuestion.answers.map((answer, idx) => (
                    <li key={idx}>
                        <button onClick={() => handleAnswer(answer)} disabled={selAnswer} dangerouslySetInnerHTML={{__html: answer}}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Quiz;