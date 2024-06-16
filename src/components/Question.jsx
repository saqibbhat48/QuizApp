import React from 'react';

const Question = ({ question, onAnswer, selectedAnswer }) => {
  if (!question) return null;

  return (
    <div className="question">
      <div className="text-xl text-center font-semibold mb-4"><span>{question.Qn}. </span>{question.questionText}</div>
      <div className="answers">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            className={`block w-full p-2 mb-2 rounded ${selectedAnswer === index ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
            onClick={() => onAnswer(index)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
