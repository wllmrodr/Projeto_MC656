
import React, { useEffect, useState } from "react";
import { db } from "/src/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { achievements } from "/firebase/achievements";

const AchievementsList = ({ userId }) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setUnlockedAchievements(userDoc.data().unlockedAchievements || []);
      }
    };

    fetchAchievements();
  }, [userId]);

  return (
    <div>
      <h2>Suas Conquistas</h2>
      <ul>
        {unlockedAchievements.map((achievementId) => {
          const achievement = achievements.find((a) => a.id === achievementId);
          return (
            <li key={achievement.id}>
              <span>{achievement.icon}</span> {achievement.title} - {achievement.description}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AchievementsList;
