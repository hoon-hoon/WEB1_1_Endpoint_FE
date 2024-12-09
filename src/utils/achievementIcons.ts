import { FaCheckCircle, FaRocket, FaGlobeAmericas, FaFire } from 'react-icons/fa';
import { IconType } from 'react-icons';

type AchievementId = 'FIRST_CORRECT' | 'QUIZ_BEGINNER' | 'CATEGORY_EXPLORER' | 'STRIKE_MASTER';

export const achievementIcons: Record<AchievementId, IconType> = {
  FIRST_CORRECT: FaCheckCircle,
  QUIZ_BEGINNER: FaRocket,
  CATEGORY_EXPLORER: FaGlobeAmericas,
  STRIKE_MASTER: FaFire,
};

export const getAchievementIcon = (achievementId: string): IconType => {
  return achievementId in achievementIcons
    ? achievementIcons[achievementId as AchievementId]
    : FaCheckCircle;
};
