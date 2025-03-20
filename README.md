# Sistema de Controle de Contas

## 📌 Introdução
Este sistema foi desenvolvido para auxiliar no gerenciamento financeiro dos usuários, permitindo o cadastro de contas, categorias de despesas e parcelas. A aplicação segue a arquitetura MVC e está dividida em backend, desenvolvido com **Java & Spring Boot**, e frontend, construído com **HTML, CSS e JavaScript**.

## 🚀 Tecnologias Utilizadas

### Backend:
- **Java**
- **Spring Boot**
- **Spring Data JPA**
- **MySQL**
- **Maven**

### Frontend:
- **HTML**
- **CSS**
- **JavaScript**
- **Go Live (Extensão do VS Code para subir o servidor)**

---

## 🗂️ Estrutura do Projeto

### 📌 Backend (Spring Boot)
O backend é estruturado seguindo o padrão **MVC (Model-View-Controller)**.

#### 🏗️ Model (Entities - Relacionadas ao Banco de Dados)
- **Categoria**
- **Contas**
- **Parcelas**
- **Usuários**

#### 📦 DTOs (Data Transfer Objects)
- **CategoriaDTO**
- **ContasDTO**
- **ParcelasDTO**
- **UsuariosDTO**
- **DtoConverter**
- **LoginDTO**
- **ContaDetalhadaDTO**

#### 📂 Repositórios (Repositories)
- **CategoriaRepository**
- **ContasRepository**
- **ParcelasRepository**
- **UsuariosRepository**

#### ⚙️ Serviços (Services)
- **CategoriaService**
- **ContasService**
- **ParcelasService**
- **UsuariosService**

#### 🎛️ Controladores (Controllers)
- **CategoriaController**
- **ContasController**
- **ParcelasController**
- **UsuariosController**

#### 🔗 Relacionamentos
- Um **Usuário** pode ter várias **Contas**.
- Uma **Conta** pode estar associada a uma **Categoria**.
- Uma **Conta** pode ter várias **Parcelas**.

#### 🔄 Fluxo do Sistema
1. O usuário se cadastra no sistema.
2. Ele adiciona suas contas, especificando descrição, valor, vencimento e status.
3. As contas podem ser categorizadas conforme despesas ou receitas.
4. Se uma conta for parcelada, cada parcela terá um status de pagamento.
5. O sistema atualiza os status conforme os pagamentos forem realizados.

---

## 💻 Como Rodar o Backend (Spring Boot)

### 📌 Pré-requisitos
Antes de começar, certifique-se de ter os seguintes requisitos instalados em sua máquina:
- **Java 17 ou superior**
- **Maven**
- **MySQL**

### 🛠️ Configuração do Banco de Dados
1. Criar um banco de dados MySQL:
   ```sql
   CREATE DATABASE sistema_controle_contas;
   ```
2. Configurar o `application.properties` :
   ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/sistema_controle_contas
    spring.datasource.username=root
    spring.datasource.password=suaSenha
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
   ```

### ▶️ Executando a Aplicação
1. Navegue até a pasta do projeto backend.
2. Execute o comando:
   ```sh
   mvn spring-boot:run
   ```
3. A API estará disponível em `http://localhost:8080`

---

## 🎨 Frontend (HTML, CSS, JavaScript)
O frontend foi desenvolvido utilizando tecnologias web puras e consome a API REST desenvolvida no backend.

### 📌 Páginas Implementadas
- **Página de Login** (interage com a API)
- **Página de Cadastro** (interage com a API)
- **Página de Controle de Contas** (interage com a API)

### 🚀 Como Rodar o Frontend
1. Navegue até a pasta do frontend.
2. Utilize a extensão **Go Live** do VS Code para subir o servidor local.
3. Acesse `http://127.0.0.1:5500/login.html`.

---

## 🛠️ Endpoints Principais

### 📌 Autenticação
- `POST http://localhost:8080/usuarios/login` - Autenticação do usuário.
  ```json
  {
    "login": "pedro",
    "senha": "12345"
  }
  ```

- `POST http://localhost:8080/usuarios` - Cadastro de usuário.
  ```json
  {
    "nome": "Pedro Silva",
    "cpf": "78744222200",
    "telefone": "(11) 99999-9999",
    "endereco": "Rua Março, 123",
    "email": "pedro@email.com",
    "login": "pedro",
    "senha": "12345"
  }
  ```

### 📌 Usuários
- `GET http://localhost:8080/usuarios` - Lista todos os usuários.
- `GET http://localhost:8080/usuarios/{id}` - Busca usuário por ID.

### 📌 Contas
- `POST http://localhost:8080/contas` - Adiciona uma nova conta.
  ```json
  {
    "descricao": "Compra de ingredientes de doces e salgados",
    "valor": 300.00,
    "dataVencimento": "2025-03-19",
    "dataPagamento": null,
    "tipoConta": "Despesa",
    "status": false,
    "usuarioId": 1,
    "categoriaId": 1
  }
  ```

- `GET http://localhost:8080/contas` - Lista todas as contas.
- `GET http://localhost:8080/contas/{id}` - Busca uma conta por ID.
- `PUT http://localhost:8080/contas/{id}` - Atualiza uma conta existente.
- `DELETE http://localhost:8080/contas/{id}` - Exclui uma conta.

### 📌 Parcelas
- `GET http://localhost:8080/parcelas` - Lista todas as parcelas.
- `POST http://localhost:8080/parcelas` - Adiciona uma nova parcela.
  ```json
  {
    "dataVencimento": "2025-04-05",
    "numeroParcela": 1,
    "valorParcela": 500.00,
    "status": "PENDENTE",
    "contaId": 1
  }
  ```

- `PUT http://localhost:8080/parcelas/{id}/status?status=PAGO` - Atualiza o status de uma parcela.

---

## 📜 Conclusão
Este sistema oferece uma solução prática para gerenciar contas, categorias e parcelas, permitindo uma organização financeira.

