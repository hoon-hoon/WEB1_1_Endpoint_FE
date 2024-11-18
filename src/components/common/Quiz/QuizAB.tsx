import type { QuizAB as QuizABType } from '@/types';

function QuizAB({ quiz, onAnswer }: { quiz: QuizABType; onAnswer?: (answer: string) => void }) {
  const handleOptionClick = (option: string) => {
    if (onAnswer) {
      onAnswer(option);
    }
  };

  return (
    <div>
      <h3>{quiz.question}</h3>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px' }}>
        {quiz.options.map((option, index) => (
          <button key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizAB;
