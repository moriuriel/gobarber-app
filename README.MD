# Recuperção de senha []

**RF**

- O usuário deve poder recuperar sua senha infromando o seu e-mail;
- O usuário deve receber um e-mail com instrução de recuperção de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envio em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar;

# Autalização do perfil []

**RF**

- O usuário deve poder atualizar nome, email e senha;

**RNF**

**RN**

- O usuário não pode alterar seu email para um email já utlizado;
- Para atualizar sua senha, o usuário deve confirmar sua senha antiga;
- Para atualizar sua senha, o usuário deve confirmar sua nova senha;

# Painel do prestador []

**RF**

- O usuário deve poder listar seus agendamentos de uma data expecífica;
- O prestador deve receber uma notifição sempre que houver um novo agendamento;
- O prestador deve visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia deve ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviados em tempo-real utlizando Socket.io;

**RN**

- A notificação deve ter um status de lida e não lida para que o prestador possa controlar;

# Agendamento de serviços []

**RF**

- O usuário deve poder listar todos prestadores cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar os horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenda em cache;

**RN**

- Cada agendamento deve durar 1h;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em uma horário já passou;
- O usuário não pode agendar um horário com ele mesmo;
