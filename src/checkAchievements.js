
import { addAchievementToUser } from '../firebase/achievements';
import { achievements } from '/firebase/achievements';

export const checkAndUnlockAchievements = async (userId, action) => {
  const conditions = {
    'plant_seed': 'plant_first_seed',
    'water_5_times': 'water_plants_5_times',
    'harvest_crop': 'harvest_first_crop',
  };

  const achievementId = conditions[action];
  if (achievementId) {
    await addAchievementToUser(userId, achievementId);
  }
};