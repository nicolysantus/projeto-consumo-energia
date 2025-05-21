# ⚡ Monitoramento de Consumo de Energia

Aplicação desenvolvida como projeto acadêmico para a disciplina de **Web Mobile**, no curso de **Análise e Desenvolvimento de Sistemas** da **Universidade Presbiteriana Mackenzie**.  
Tem como objetivo incentivar o uso consciente de energia por meio do monitoramento de consumo.

Desenvolvido por: **Nicoly Santos**

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
- **Banco de Dados:** Simulado em memória para fins didáticos
- **Testes de API:** Postman
- **Front-end:** HTML, CSS e JavaScript

---

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos

- Node.js e npm instalados
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

### 4. Inicie o servidor

```bash
npm run start
```

Acesse em:  
[http://localhost:3000](http://localhost:3000)

---

### 5. Inicie o front-end

Abra o arquivo `index.html` no navegador.

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
  "id": 1,
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
    "id": 1,
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

### 🔸 Remover Consumo

- **DELETE** `/:id`

**Exemplo:** `/consumo-energia/1`

**Resposta:**
```json
{
  "success": true
}
```

Caso o registro não exista:

```json
{
  "success": false,
  "message": "Registro não encontrado."
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

Este projeto é **educacional** e tem como principal objetivo aplicar na prática os conhecimentos adquiridos sobre desenvolvimento de APIs RESTful com **NestJS** e interface front-end com HTML, CSS e JavaScript.

Sinta-se à vontade para testar, adaptar ou expandir o sistema conforme seu interesse!
