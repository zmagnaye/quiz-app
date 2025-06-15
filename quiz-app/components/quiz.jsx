import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Quiz() {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, category, difficulty } = location.state;
    const [questions, setQuestions] = useState([]);
    const [currIndex, setCurrIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selAnswer, setSelAnswer] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

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
        setSelAnswer(answer);
        const correct = answer === questions[currIndex].correct;
        setIsAnswerCorrect(correct);
        if (correct) {
            setScore((prev) => prev + 1);
        }
        setShowFeedback(true);
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
                <button onClick={() => navigate("/")}>Start Over</button>
            </div>
        );  
    }

    const currQuestion = questions[currIndex];

    const handleNext = () => {
        setShowFeedback(false);
        setSelAnswer("");

        if (currIndex + 1 < questions.length) {
            setCurrIndex((prev) => prev + 1);
        } else {
            setShowResult(true);
        }
    }
    
    return (
        <div className="quiz-container">
            <h2>Question {currIndex + 1} of {questions.length}</h2>
            <h3 dangerouslySetInnerHTML={{__html: currQuestion.question}}/>
            <ul>
                {currQuestion.answers.map((answer, idx) => (
                    <li key={idx}>
                        <button onClick={() => handleAnswer(answer)} disabled={!!selAnswer} dangerouslySetInnerHTML={{__html: answer}}/>
                    </li>
                ))}
            </ul>

            {showFeedback && (
                <div className="feedback">
                    {isAnswerCorrect ? (
                        <p>Great job, {name}! You got the correct answer.</p>
                    ) : (
                        <p>Sorry, {name}. That's incorrect. The correct answer is:{""}
                            <span dangerouslySetInnerHTML={{__html: questions[currIndex].correct}}/>
                        </p>
                    )}
                    <button onClick={handleNext}>Next Question</button>
                </div>
            )}
        </div>
    );
}

export default Quiz;