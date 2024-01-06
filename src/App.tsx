import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { Difficulty, QuestionsState, fetchQuizQuestions } from './api';
import "./App.css"

const  TOTAL_QUESTION = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {

  const [loading,setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number,setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score,setScore] = useState(0);
  const [gameOver,setGameOver] = useState(true);

// Assuming this is inside an async function or a useEffect hook
// const fetchData = async () => {
//   try {
//     const questions = await fetchQuizQuestions(TOTAL_QUESTION, Difficulty.EASY);
//     console.log(questions);
//     // Now you can use the 'questions' array as needed in your application
//   } catch (error) {
//     console.error('Error fetching quiz questions:', error);
//   }
// };



  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTION,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e:any)=>{
    if (!gameOver) {
      // User's answer
      const answer = e.target.textContent;
      // console.log('answer',e.target.textContent);
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  }

  const nextQuestion = () =>{
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTION) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  }

  return (
    <div className="App">
      <h1>Quiz App</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTION ? (
        <button className='start' onClick={startTrivia}>Start</button>
      ):null}
      {!gameOver?<p>Score:{score}</p>:null}
      {loading && <p>Question Loading ....</p>}
      {!loading && !gameOver && (<QuestionCard questionNr={number+1} totalQuestion={TOTAL_QUESTION} userAnswer={userAnswers?userAnswers[number]:undefined} question={questions[number].question } answers={questions[number].answers} callback={checkAnswer}/>)}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTION - 1 ? (
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  );
}

export default App;
