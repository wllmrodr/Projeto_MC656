# Projeto_MC656!!!
Nosso projeto consiste no desenvolvimento de um aplicativo mobile didático e lúdico que ensina crianças a plantar mudas de leguminosas, como o feijão. A ideia surgiu da necessidade de promover o contato das crianças com a natureza e a educação ambiental de forma interativa e acessível. O aplicativo, além de ensinar as etapas do plantio, busca incentivar a curiosidade e a responsabilidade desde cedo, utilizando uma abordagem divertida e educativa. A motivação principal é contribuir para a formação de uma geração mais consciente e conectada com o meio ambiente, através do aprendizado prático e envolvente.

### Seção de Arquitetura
![image](https://github.com/user-attachments/assets/e47ea121-3cc4-46e9-9db0-651b38638a23)
O MVC é uma das abordagens mais utilizadas, principalmente em aplicações web e mobile, por conseguir separar as responsabilidades e assim facilitando a manutenção e a escalabilidade.

No diagrama C4, a camada superior ficou com a parte de View, que fornecerá a interface para as crianças, a camada do meio com a parte de Controller, que cuida de aspectos como gerenciamento de usuário, gerenciamento de jardim, e cuidado e crescimento das plantas, e a inferior com a parte de Model, que fará a interface com os bancos de dados com as informações sobre os usuários e sobre os modelos de cada planta utilizada.

### Componentes:

Página de Autenticação: Recebe e processa dados de login dos usuários, registrando e autenticando o progresso de cada um no sistema.

Componente de Navegação e Interface Acessível: Proporciona uma interface amigável para facilitar o uso do app, especialmente para crianças.

Componente de Cadastro de Plantas: Permite que os usuários adicionem novas plantas ao seu jardim virtual.

Componente de Notificação: Utiliza o Firebase Cloud Messaging (FCM) para enviar lembretes aos usuários sobre o cuidado das plantas.

Gerenciamento de Usuários: Armazena e autentica usuários usando um banco de dados no Firebase.

Componente de Educação: Gerencia quais animações e instruções são exibidas para cada planta, auxiliando no aprendizado das crianças.

Componente de Pontuação: Calcula e armazena o progresso de cada usuário, permitindo monitorar suas conquistas no app.

Componente de Gerenciamento do Jardim: Garante que as plantas do usuário sejam salvas e atualizadas no banco de dados.

Componente de Passagem de Tempo: Utiliza a API nativa do dispositivo para monitorar o tempo, permitindo a estimativa da saúde das plantas com base no cuidado recebido.

Database (Firebase): Armazena os dados de usuários e plantas, sendo acessado por diversos componentes para leitura e escrita.