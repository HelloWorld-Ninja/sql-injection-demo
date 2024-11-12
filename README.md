# Projeto de Demonstração de SQL Injection com Next.js e MySQL

Este projeto é um exemplo educacional para demonstrar vulnerabilidades de **SQL Injection** usando Next.js e MySQL. A aplicação inclui uma tela de login que permite explorar como ataques de SQL Injection podem comprometer a segurança de uma aplicação web.

> **Atenção:** Este projeto é estritamente para fins educacionais. Nunca implemente esse tipo de código em produção.

## Requisitos

- Node.js (versão 14 ou superior)
- MySQL
- NPM ou Yarn

## Passo a Passo para Instalação e Configuração

### 1. Clone o Repositório

Primeiro, clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/HelloWorld-Ninja/sql-injection-demo
cd seu-repositorio
2. Instale as Dependências
Instale as dependências do projeto usando NPM ou Yarn:

npm install
# ou
yarn install
```


3. Configuração do Banco de Dados MySQL
Abra o MySQL e crie um banco de dados para este projeto:

```sql
CREATE DATABASE projeto_demo_sql_injection;
Selecione o banco de dados que você acabou de criar:

USE projeto_demo_sql_injection;
Crie a tabela users:

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

Insira um usuário de teste na tabela users:

```sql
INSERT INTO users (username, password) VALUES ('admin', 'password123');
```
Nota: Em um projeto real, nunca armazene senhas em texto simples. Use hashing seguro (ex.: bcrypt) para proteger as senhas.

4. Configuração do Arquivo .env.local
No diretório raiz do projeto, crie um arquivo .env.local para armazenar suas variáveis de ambiente:

touch .env.local
Adicione as seguintes variáveis ao arquivo .env.local, substituindo as informações com as suas configurações do MySQL:

```env
MYSQL_HOST=localhost
MYSQL_USER=seu_usuario
MYSQL_PASSWORD=sua_senha
MYSQL_DATABASE=projeto_demo_sql_injection
```

5. Inicialize o Servidor de Desenvolvimento
Agora, inicie o servidor Next.js em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em http://localhost:3000.

6. Testando a Vulnerabilidade de SQL Injection
Tela de Login: Acesse http://localhost:3000/login para visualizar a tela de login.

Demonstração de SQL Injection: Tente o seguinte payload para explorar a vulnerabilidade:

```sql
Username: admin' OR '1'='1
Password: qualquer texto
```

Este payload manipula a consulta SQL, retornando todos os usuários onde username = 'admin', ignorando a senha e demonstrando como um SQL Injection pode ser explorado.

Estrutura do Projeto
A estrutura principal do projeto é a seguinte:

```bash
my-next-app
├── app
│   ├── api
│   │   └── login
│   │       └── route.ts          # Rota API para autenticação de login (vulnerável a SQL Injection)
│   ├── dashboard
│   │   └── page.tsx              # Página do dashboard (área restrita)
│   └── login
│       └── page.tsx              # Página de login com visualização de senha
├── public                        # Arquivos públicos
├── .env.local                    # Variáveis de ambiente
├── package.json                  # Dependências do projeto
└── README.md                     # Instruções do projeto
```

Notas Importantes

- Segurança: Este projeto é vulnerável por design para fins de demonstração. Em um ambiente de produção, sempre use consultas parametrizadas para evitar SQL Injection.
- Hashing de Senha: Em um projeto real, use um mecanismo de hashing como bcrypt para armazenar senhas de forma segura.
- Configurações do Banco de Dados: Certifique-se de que o MySQL está configurado corretamente e que as informações de conexão no .env.local estão corretas.

Próximos Passos

- Implementar Proteções: Explore a correção da vulnerabilidade usando prepared statements para proteger contra SQL Injection.
- Hashing Seguro de Senha: Use hashing para proteger senhas no banco de dados.
- Validação de Sessão: Implemente um sistema de sessão seguro para proteger o acesso ao dashboard.
- Este projeto foi criado para demonstrar como SQL Injection pode comprometer a segurança de uma aplicação e deve ser usado apenas em ambientes controlados e para aprendizado.

---

Esse `README.md` explica detalhadamente o projeto, incluindo requisitos, instalação, config
