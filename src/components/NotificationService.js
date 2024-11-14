const admin = require("firebase-admin");

// Inicializa o Firebase com as credenciais do serviço
admin.initializeApp({
  credential: admin.credential.applicationDefault(), // ou use uma chave JSON
  databaseURL: "https://<YOUR_PROJECT_ID>.firebaseio.com",
});

class NotificationService {
  /**
   * Envia uma notificação para um usuário específico.
   * @param {string} userToken - Token FCM do dispositivo do usuário.
   * @param {string} title - Título da notificação.
   * @param {string} body - Corpo da notificação.
   * @returns {Promise<void>}
   */
  async Notificacao(userToken, title, body) {
    const mensagem = {
      notification: {
        title: title,
        body: body,
      },
      token: userToken,
    };

    try {
      const response = await admin.messaging().send(mensagem);
      console.log("Notificação enviada com sucesso:", response);
    } catch (error) {
      console.error("Erro ao enviar notificação:", error);
    }
  }
}

module.exports = new NotificationService();

/*Ao enviar a notificação para o usuário será utilizado o seguinte código:
const notificationService = require("./NotificationService");

const userToken = "user_fcm_token";

// Dados da notificação
const title = "Hora de cuidar da sua planta!";
const body = "Não se esqueça de regar sua planta para mantê-la saudável!";

notificationService.Notificacao(userToken, title, body);*/
