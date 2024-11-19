import { ReviewNoteItem } from '@/types/MyPageTpyes';
import Icon from '@eolluga/eolluga-ui/icon/Icon';

export default function ReviewNoteCard({
  note,
  onDelete,
}: {
  note: ReviewNoteItem;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-300 relative">
      <button
        onClick={() => onDelete(note.id)}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 rounded-full"
      >
        <Icon icon="close" size={24} />
      </button>
      <div className="px-6 pt-6 space-y-2">
        <h2 className="text-xl font-bold leading-tight pr-8">{note.question}</h2>
        <p className="text-gray-500">{note.date}</p>
      </div>
      <div className="px-6 pb-6 pt-4 space-y-6">
        {note.choices ? (
          <div className="space-y-3">
            {note.choices.map((choice) => (
              <div
                key={choice.id}
                className={`p-3 rounded-lg border ${
                  choice.id === note.userAnswer
                    ? 'bg-red-50 border-red-200'
                    : choice.id === note.correctAnswer
                      ? 'bg-green-50 border-green-200'
                      : 'border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <span className="font-medium mr-2">{choice.id}.</span>
                  <span>{choice.text}</span>
                  {choice.id === note.userAnswer && (
                    <span className="ml-auto text-red-500">내 답변</span>
                  )}
                  {choice.id === note.correctAnswer && (
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
              <span className="font-medium">{note.userAnswer}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-500 font-medium min-w-[4rem]">정답:</span>
              <span className="font-medium">{note.correctAnswer}</span>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-medium mb-2">해설</h3>
          <p className="text-gray-700 leading-relaxed">{note.explanation}</p>
        </div>
      </div>
    </div>
  );
}
