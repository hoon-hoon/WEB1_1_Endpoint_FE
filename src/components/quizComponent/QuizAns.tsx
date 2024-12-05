import Icon from '@eolluga/eolluga-ui/icon/Icon';

interface QuizAnsProps {
  isCorrect: boolean;
  explanation: string;
  answerRate: number;
}

function QuizAns({ isCorrect, explanation, answerRate }: QuizAnsProps) {
  return (
    <>
      <div className={`mt-1 p-2 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
        <div className="flex items-center justify-between">
          <h4
            className={`flex items-center gap-2 font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
          >
            <Icon
              icon={isCorrect ? 'chevron_down_circle' : 'close_circle'}
              className={isCorrect ? 'text-green-600' : 'text-red-600'}
            />
            {isCorrect ? '정답입니다!' : '틀렸습니다 ㅠㅠ'}
          </h4>
          <span className="text-sm font-semibold text-gray-600">{answerRate.toFixed(1)}%</span>
        </div>
        <p className={`mt-2 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
          전체 정답률: {explanation}
        </p>
      </div>
    </>
  );
}

export default QuizAns;
