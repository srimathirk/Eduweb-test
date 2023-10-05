// Inside MathQuiz.js

import React, { useState } from 'react';
import AdditionQuiz from './AdditionQuiz';
import SubtractionQuiz from './SubtractionQuiz';

const MathQuiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleQuizSelection = (quizType) => {
    setSelectedQuiz(quizType);
  };

  return (
    <div>
      <h1>Math Quiz</h1>
      <div>
        <button onClick={() => handleQuizSelection('addition')}>Addition Quiz</button>
        <button onClick={() => handleQuizSelection('subtraction')}>Subtraction Quiz</button>
        
      </div>
      {selectedQuiz === 'addition' && <AdditionQuiz operator="+" />}
      {selectedQuiz === 'subtraction' && <SubtractionQuiz operator="-" />}
      
    </div>
  );
};

export default MathQuiz;
