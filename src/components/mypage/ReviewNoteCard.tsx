import Icon from '@eolluga/eolluga-ui/icon/Icon';
import { QuizWithAnswer } from '@/types/WrongQuizTypes';
import Card from '@/components/common/Card';

export default function ReviewNoteCard({
  quizData,
  onUpdate,
}: {
  quizData: QuizWithAnswer;
  onUpdate: (quizId: number) => void;
}) {
  const { quiz, userAnswer } = quizData;
  const formattedDate = new Date(userAnswer.answeredAt)
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '.');

  const handleUpdate = () => {
    onUpdate(quizData.quiz.id);
  };

  return (
    <Card className="relative">
      <button
        onClick={handleUpdate}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 rounded-full"
      >
        <Icon icon="close" size={24} />
      </button>

      <div className="space-y-2">
        <h2 className="text-xl font-bold leading-tight pr-8">{quiz.content}</h2>
        <div className="flex gap-2 text-sm text-gray-500">
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="pt-4 space-y-6">
        {quiz.type === 'MULTIPLE_CHOICE' ? (
          <div className="space-y-3">
            {quiz.options.map((option) => (
              <div
                key={option.optionNumber}
                className={`p-3 rounded-lg border ${
                  option.optionNumber === userAnswer.choiceNumber
                    ? 'bg-red-50 border-red-200'
                    : option.optionNumber === quiz.answerNumber
                      ? 'bg-green-50 border-green-200'
                      : 'border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <span className="font-medium mr-2">{option.optionNumber}.</span>
                  <span>{option.content}</span>
                  {option.optionNumber === userAnswer.choiceNumber && (
                    <span className="ml-auto text-red-500">내 답변</span>
                  )}
                  {option.optionNumber === quiz.answerNumber && (
                    <span className="ml-auto text-green-500">정답</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-red-500 font-medium min-w-[4rem]">내 답변:</span>
              <span className="font-medium">
                {quiz.options[userAnswer.choiceNumber - 1].content}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-500 font-medium min-w-[4rem]">정답:</span>
              <span className="font-medium">{quiz.options[quiz.answerNumber - 1].content}</span>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-medium mb-2">해설</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{quiz.explanation}</p>
        </div>
      </div>
    </Card>
  );
}
