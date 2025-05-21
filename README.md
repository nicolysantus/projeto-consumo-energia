# ⚡ Monitoramento de Consumo de Energia

Aplicação desenvolvida como projeto acadêmico para a disciplina de **Web Mobile**, no curso de **Análise e Desenvolvimento de Sistemas** da **Universidade Presbiteriana Mackenzie**.  
O objetivo é promover o uso consciente de energia e contribuir com o **ODS 7** da ONU:  
**"Garantir o acesso a fontes de energia fiáveis, sustentáveis e modernas para todos."**

Desenvolvido por: **Nicoly Santos**

![Interface do Front-End](https://drive.google.com/uc?export=view&id=15KkOfCSwrMwNkqxu0II4iRPRraqUKe7U)

---

## 🌟 Funcionalidades

- 🔌 **Registro de Consumo:** Registra o consumo mensal de energia de cada usuário (kWh + data).
- 📈 **Histórico de Consumo:** Permite consultar o histórico de consumo em um período determinado.
- 🚨 **Alerta de Consumo Elevado:** Gera alertas automáticos se o consumo do mês atual for maior que o do mês anterior.

---

## 🛠️ Tecnologias Utilizadas

- **Back-end:** NestJS, TypeScript, Node.js
- **Banco de Dados:** Simulado em memória para fins didáticos
- **Testes de API:** Postman

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
git clone https://github.com/seu-usuario/nestjs-consumo-energia.git
cd nestjs-consumo-energia
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

- **GET** `/historico?usuarioId=usuario123&inicio=2025-01-01&fim=2025-12-31`

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
    └── dto
        ├── registrar-consumo.dto.ts
        └── filtro-historico.dto.ts
```

---

## 📚 Observações Finais

Este projeto é **educacional** e tem como principal objetivo aplicar na prática os conhecimentos adquiridos sobre desenvolvimento de APIs RESTful com **NestJS**.

Sinta-se à vontade para testar, adaptar ou expandir o sistema conforme seu interesse! 🚀
