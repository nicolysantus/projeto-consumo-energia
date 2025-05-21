# ⚡ Monitoramento de Consumo de Energia

<p>
  Aplicação desenvolvida como projeto acadêmico para a disciplina de  
  <strong>Web Mobile</strong>, no curso de  
  <strong>Análise e Desenvolvimento de Sistemas</strong> da  
  <a href="https://www.mackenzie.br" target="_blank"><strong>Universidade Presbiteriana Mackenzie</strong></a>.  
  Tem como objetivo incentivar o uso consciente de energia por meio do monitoramento de consumo.
</p>

<p>
  Desenvolvido por:  
  <a href="https://www.linkedin.com/in/nicolysantus" target="_blank"><strong>Nicoly Santos</strong></a>
</p>


## 📱 Front-End 
![Interface do Front-End](https://drive.google.com/uc?export=view&id=15KkOfCSwrMwNkqxu0II4iRPRraqUKe7U)

---

## 🌟 Funcionalidades

- 🔌 **Registro de Consumo:** Registra a quantidade de energia utilizada.  
- 📈 **Histórico:** Exibe os registros de consumo.  
- 🚨 **Alerta de Consumo:** Informa quando o consumo está elevado.  
- ❌ **Remoção de Dados:** Permite excluir registros.  
- 🔔 **Notificações:** Mostra avisos e dicas sobre consumo de energia.

---

## 🛠️ Tecnologias Utilizadas

- **Back-end:** NestJS, TypeScript, Node.js
- **Banco de Dados:** MongoDB (com integração via Mongoose)
- **Testes de API:** Postman
- **Front-end:** HTML, CSS e JavaScript

---

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos

- Node.js e npm instalados
- MongoDB instalado e em execução localmente (padrão: mongodb://localhost:27017)
- NestJS CLI instalado globalmente:
```bash
npm install -g @nestjs/cli
```

---

### 2. Clone o repositório

```bash
git clone https://github.com/nicolysantus/projeto-consumo-energia.git
cd projeto-consumo-energia
```

---

### 3. Instale as dependências

```bash
npm install
```

---

### 4. Inicie o MongoDB

Certifique-se de que o serviço do MongoDB está rodando localmente. Por padrão, a aplicação conecta em `mongodb://localhost:27017`.

---

### 5. Inicie o servidor

```bash
npm run start
```

Acesse em:  
[http://localhost:3000](http://localhost:3000)

---

## 📬 Endpoints da API

> Base URL: `http://localhost:3000/consumo-energia`

---

### 🔸 Registrar Consumo

- **POST** `/registrar`
- Envia os dados de consumo do usuário

**Exemplo de body (JSON):**
```json
{
  "usuarioId": "usuario123",
  "quantidadeKwh": 150,
  "dataLeitura": "2025-05-01"
}
```

**Resposta:**
```json
{
  "_id": "6650e1f2c2a1b2c3d4e5f6a7",
  "usuarioId": "usuario123",
  "quantidadeKwh": 150,
  "dataLeitura": "2025-05-01T00:00:00.000Z"
}
```

---

### 🔸 Consultar Histórico

- **GET** `/historico?usuarioId=usuario123&dataInicio=2025-01-01&dataFim=2025-12-31`

**Resposta:**
```json
[
  {
    "_id": "6650e1f2c2a1b2c3d4e5f6a7",
    "usuarioId": "usuario123",
    "quantidadeKwh": 150,
    "dataLeitura": "2025-05-01T00:00:00.000Z"
  }
]
```

---

### 🔸 Verificar Alerta

- **GET** `/alerta?usuarioId=usuario123`

**Resposta:**
```json
{
  "alerta": "Nenhum alerta para o usuário."
}
```

---

## 📁 Estrutura de Pastas

```
src
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── consumo_energia
    ├── consumo_energia.controller.ts
    ├── consumo_energia.module.ts
    ├── consumo_energia.service.ts
    ├── dto
    │   ├── registrar-consumo.dto.ts
    │   └── filtro-historico.dto.ts
    └── public
        ├── assets
        ├── index.html
        ├── style.css
        └── script.js
```

---

## 📚 Observações Finais

Este projeto é **educacional** e tem como principal objetivo aplicar na prática os conhecimentos adquiridos nas aulas.

Sinta-se à vontade para testar, adaptar ou expandir a aplicação conforme seu interesse!
