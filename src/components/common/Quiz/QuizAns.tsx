interface QuizAnsProps {
  isCorrect: boolean;
  explanation: string;
}

function QuizAns({ isCorrect, explanation }: QuizAnsProps) {
  return (
    <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
      <h4 className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
        {isCorrect ? '정답입니다!' : '틀렸습니다 ㅠㅠ'}
      </h4>
      <p className={`mt-2 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>{explanation}</p>
    </div>
  );
}

export default QuizAns;
