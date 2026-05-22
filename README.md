<div align="center">

# 📸 Instagram Skill — Claude Code

**Skill MCP que publica fotos no Instagram de forma autônoma via Instagram Graph API**

![Node.js](https://img.shields.io/badge/Node.js-v24-339933?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![MCP](https://img.shields.io/badge/MCP-Protocol-6B48FF?style=for-the-badge)
![Instagram](https://img.shields.io/badge/Instagram-Graph_API_v21-E4405F?style=for-the-badge&logo=instagram&logoColor=white)
![Status](https://img.shields.io/badge/Desafio-Concluído_✅-22c55e?style=for-the-badge)

> 🚀 Publicação 100% via API · Sem browser · Sem Selenium · Execução autônoma em background

</div>

---

## 🏗️ Arquitetura

```
Usuário
   ↓  "Publique uma foto no Instagram..."
Claude Code
   ↓  invoca a ferramenta publicar_foto
MCP Server  (Node.js — index.js)
   ↓  chama a Instagram Graph API
Instagram Graph API v21.0
   ↓
Post publicado no Instagram ✅
```

---

## ⚙️ Como funciona

1. O **Claude Code** carrega a skill via protocolo **MCP**
2. O usuário pede ao Claude para publicar uma foto
3. O Claude invoca autonomamente a ferramenta `publicar_foto`
4. O MCP Server executa o fluxo oficial da Graph API em 3 etapas:

| Etapa | Endpoint | Descrição |
|:---:|---|---|
| 1️⃣ | `POST /{ig-user-id}/media` | Cria o container de mídia |
| 2️⃣ | `GET /{container-id}?fields=status_code` | Polling até status `FINISHED` |
| 3️⃣ | `POST /{ig-user-id}/media_publish` | Publica o post no Instagram |

> ⚠️ O polling na etapa 2 é obrigatório — publicar antes do status `FINISHED` causa erro `Media ID is not available`.

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Função |
|---|---|---|
| Claude Code | v2.1.148 | Interface IA que invoca a skill autonomamente |
| MCP SDK Anthropic | latest | Implementação do protocolo MCP Server |
| Node.js | v24.15.0 | Runtime do servidor MCP |
| Axios | latest | Requisições HTTP para a Graph API |
| Instagram Graph API | v21.0 | Publicação de fotos sem browser |
| Meta for Developers | Sandbox | Configuração do app e permissões |

---

## 📂 Estrutura

```
instagram-skill-claude/
├── index.js          # MCP Server — lógica principal da skill
├── package.json      # Dependências do projeto
├── package-lock.json
└── README.md
```

---

## 🚀 Configuração e uso

### 1. Clone o repositório

```bash
git clone https://github.com/joaop-n12/instagram-skill-claude.git
cd instagram-skill-claude
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure suas credenciais

No arquivo `index.js`, preencha:

```js
const ACCESS_TOKEN = "seu_access_token_aqui";
const IG_USER_ID   = "seu_instagram_user_id_aqui";
```

> 💡 Gere seu token em [Meta for Developers](https://developers.facebook.com) → API do Instagram → Gerar token

### 4. Registre a skill no Claude Code

```bash
claude mcp add instagram-skill node /caminho/para/index.js
```

### 5. Use no Claude Code

```
Publique uma foto no Instagram com a URL "https://..." e a legenda "Meu post via API! 🚀"
```

---

## ✅ Requisitos do desafio

- ✅ Execução 100% via API — sem browser, sem Selenium
- ✅ Publicação de foto com legenda
- ✅ Execução autônoma em background
- ✅ Integração nativa com Claude Code via MCP
- ✅ Polling de status implementado corretamente
- ✅ App Meta em modo Sandbox
- ✅ Evidências de funcionamento (prints + vídeo)

---

## 🧠 Conceitos explorados

- Arquitetura MCP Server (Model Context Protocol)
- Fluxo de tools/skills do Claude Code
- Instagram Graph API — fluxo de publicação em 3 etapas
- Polling assíncrono com `setTimeout`
- Access Tokens e escopos de permissão da Meta
- Integração HTTP com APIs externas via Axios
- Execução autônoma de agentes de IA
- Configuração de apps na Meta for Developers

---

## 📸 Resultado

<div align="center">

**A skill publica posts reais no Instagram diretamente pelo Claude Code,
utilizando exclusivamente a Instagram Graph API — sem qualquer interação manual.**

</div>

---

<div align="center">

Desenvolvido por **João Pedro de Souza Nunes**

*Desafio Técnico — TiOps Tecnologia · 2026*

</div>
