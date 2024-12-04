
export const achievements = [
    {
      id: 'plant_first_seed',
      title: 'Aspirante à Jardineiro',
      description: 'Parabéns! Você plantou sua primeira semente',
      icon: '🌱', 
    },
    {
      id: 'water_plants_5_times',
      title: 'Mestre da Águas',
      description: 'Você regou sua planta 5 vezes!',
      icon: '💧',
    },
    {
      id: 'harvest_first_crop',
      title: 'Agricultor Iniciante',
      description: 'Você colher sua primeira colheita',
      icon: '🌾',
    },


  ];
  

import { db } from './firebase-config'; 
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const addAchievementToUser = async (userId, achievementId) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    console.error('Usuário não encontrado!');
    return;
  }

  const userData = userDoc.data();
  const unlockedAchievements = userData.unlockedAchievements || [];

  if (!unlockedAchievements.includes(achievementId)) {
    unlockedAchievements.push(achievementId);
    await setDoc(userRef, { unlockedAchievements }, { merge: true });
  }
};
