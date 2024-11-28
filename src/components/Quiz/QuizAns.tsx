import Icon from '@eolluga/eolluga-ui/icon/Icon';
import ProgressBar from '../common/ProgressBar';

interface QuizAnsProps {
  isCorrect: boolean;
  explanation: string;
  answerRate: number;
}

function QuizAns({ isCorrect, explanation, answerRate }: QuizAnsProps) {
  return (
    <>
      <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
        <h4
          className={`flex items-center gap-2 font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
        >
          <Icon
            icon={isCorrect ? 'chevron_down_circle' : 'close_circle'}
            className={isCorrect ? 'text-green-600' : 'text-red-600'}
          />
          {isCorrect ? '정답입니다!' : '틀렸습니다 ㅠㅠ'}
        </h4>
        <p className={`mt-2 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>{explanation}</p>
      </div>
      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-gray-700">전체 정답률</p>
        <div className="flex items-center gap-2">
          <ProgressBar progress={answerRate} colorClass="bg-pastelGreen" />
          <span className="text-sm font-semibold text-gray-600">{answerRate.toFixed(1)}</span>
        </div>
      </div>
    </>
  );
}

export default QuizAns;
