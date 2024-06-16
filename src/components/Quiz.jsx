import React, { useState, useEffect, useRef } from 'react';
import questions from '../data/questions.json';
import Question from './Question';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(6); // 10 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('quizState'));
    if (savedState) {
      setCurrentQuestionIndex(savedState.currentQuestionIndex);
      setSelectedAnswers(savedState.selectedAnswers);
      setTimeLeft(savedState.timeLeft);
      setQuizStarted(savedState.quizStarted);
    }
  }, []);

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            handleQuizCompletion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [quizStarted, timeLeft]);

  useEffect(() => {
    localStorage.setItem(
      'quizState',
      JSON.stringify({
        currentQuestionIndex,
        selectedAnswers,
        timeLeft,
        quizStarted,
      })
    );
  }, [currentQuestionIndex, selectedAnswers, timeLeft, quizStarted]);

  const handleAnswer = (answer) => {
    const newSelectedAnswers = {
      ...selectedAnswers,
      [currentQuestionIndex]: answer,
    };
    setSelectedAnswers(newSelectedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleQuizCompletion(newSelectedAnswers);
    }
  };

  const handleQuizCompletion = (newSelectedAnswers = selectedAnswers) => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (newSelectedAnswers[index] === question.correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setQuizStarted(false);
    setQuizCompleted(true);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizCompleted(false);
    setTimeLeft(600);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
  };

  const exitQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeft(600);
    setScore(0);
  };

  const renderTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (quizCompleted) {
    return (
      <div className="quiz container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="text-2xl font-bold text-center text-green-600">Quiz Completed!</div>
        <div className="text-xl font-bold text-center mt-4">Your Score: {score} / {questions.length}</div>
        <div className="text-center mt-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600"
            onClick={exitQuiz}
          >
            Exit Quiz
          </button>
        </div>
      </div>
    );
  }

  if (timeLeft === 0 && !quizCompleted) {
    return (
      <div className="quiz container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="text-2xl font-bold text-red-600 text-center">Time is up!</div>
        <div className="text-center mt-4">
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600"
            onClick={handleQuizCompletion}
          >
            Show Score
          </button>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="quiz container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <button
          className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600 mx-auto block"
          onClick={startQuiz}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quiz container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="timer text-xl font-bold mb-4 text-right text-indigo-600">
        Time Left: {renderTimer()}
      </div>
      {questions.length > 0 && (
        <Question
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
        />
      )}
    </div>
  );
};

export default Quiz;
