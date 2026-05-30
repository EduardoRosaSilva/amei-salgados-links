# 🔗 Central de Links Inteligente - Amei Salgados

[![Netlify Status](https://api.netlify.com/api/v1/badges/SEU_ID_DO_NETLIFY/deploy-status)](https://app.netlify.com/sites/SEU_NOME_NO_NETLIFY/deploys)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> Interface centralizadora de acessos (Linktree alternativo) desenvolvida em Vanilla JS e TailwindCSS, focada em alta conversão e validação em tempo real.

## 🚀 O Projeto
Solução serverless desenvolvida para unificar os canais de atendimento da "Amei Salgados". A arquitetura foi construída de forma modularizada (Separation of Concerns), garantindo carregamento ultrarrápido na *edge network* do Netlify.

## ✨ Funcionalidades Técnicas
- **Validação de Horário Client-Side:** Algoritmo que calcula os minutos do dia baseados no fuso horário do dispositivo do utilizador, exibindo dinamicamente etiquetas de `ABERTO` ou `FECHADO` consoante a matriz de horários comerciais.
- **Interatividade Assíncrona:** Gestão de modais informativos em DOM puro, sem dependência de bibliotecas externas (Zero dependências pesadas).
- **Proteção de Interface:** Bloqueio de ferramentas de programador (F12, Context Menu) para evitar interações não planeadas por parte do utilizador final.
- **Design Sustentável:** Animações CSS personalizadas (`@keyframes`) integradas ao utilitário Tailwind para feedback visual imediato.

🔗 **[Acessar ao Projeto em Produção](https://ameisalgados-links.netlify.app/)**
