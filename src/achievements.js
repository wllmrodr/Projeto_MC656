import { db } from './firebase-config'; // Configuração do Firebase
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Estrutura de Dados: Achievements
export const achievements = [
  {
    id: 'plant_first_seed',
    title: 'Aspirante à Jardineiro',
    description: 'Parabéns! Você plantou sua primeira semente!',
    icon: '🌱', // Pode ser um emoji ou URL para um ícone
  },
  {
    id: 'water_plants_5_times',
    title: 'Mestre das Águas',
    description: 'Você regou sua planta 5 vezes!',
    icon: '💧',
  },
  {
    id: 'harvest_first_crop',
    title: 'Primeira Colheira',
    description: 'Você acaba de colher sua primeira safra!',
    icon: '🌾',
  },
];

// Função para adicionar achievements ao usuário no Firestore
export const addAchievementToUser = async (userId, achievementId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.error('Usuário não encontrado!');
      return;
    }

    const userData = userDoc.data();
    const unlockedAchievements = userData.unlockedAchievements || [];

    // Verifica se o achievement já foi desbloqueado
    if (!unlockedAchievements.includes(achievementId)) {
      unlockedAchievements.push(achievementId);
      await setDoc(userRef, { unlockedAchievements }, { merge: true });
      console.log(`Achievement ${achievementId} desbloqueado para o usuário ${userId}`);
    }
  } catch (error) {
    console.error('Erro ao adicionar achievement:', error);
  }
};
