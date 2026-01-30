# Service Operations Dashboard

Dashboard operacional web para gestão e acompanhamento de serviços de produção em tempo real, organizados por área, com rotação automática, controle de status e regras baseadas no ciclo diário de trabalho.

Web-based operational dashboard for managing and tracking production services in real time, organized by area, with automatic rotation, status control, and daily business-cycle rules.

---

## 📊 Visão Geral | Overview

### 🇧🇷 Português

O **Service Operations Dashboard** foi desenvolvido para ambientes operacionais como oficinas, fábricas e setores de produção.  
Ele centraliza a visualização de serviços ativos, entregas e atividades ao longo do dia de trabalho, priorizando clareza e automação.

### 🇺🇸 English

The **Service Operations Dashboard** is designed for operational environments such as workshops, factories, and production floors.  
It centralizes the visualization of active services, deliveries, and tasks throughout the working day, focusing on clarity and automation.

---

## 🏭 Funcionalidades Principais | Key Features

### 🇧🇷 Português

- **Dashboard Operacional**
  - Exibição de serviços ativos organizados por áreas produtivas (ex: Torno, Plasma, Martelos, Fabricação).
  - Interface pensada para uso em monitores e TVs.

- **Rotação Automática por Área**
  - Alternância automática entre áreas a cada 3 segundos.
  - Seleção manual fixa uma área específica.
  - Botão para retornar ao modo automático.

- **Gestão do Ciclo de Vida dos Serviços**
  - Criação de serviços.
  - Atualização e correção de informações.
  - Exclusão de serviços.
  - Finalização de serviços.

- **Regras Baseadas no Ciclo Diário**
  - Serviços finalizados permanecem visíveis até o fim do expediente.
  - Após o encerramento do dia, serviços finalizados deixam de aparecer no dashboard.
  - Os dados permanecem armazenados no banco para histórico e auditoria.

---

### 🇺🇸 English

- **Operational Dashboard**
  - Displays active services grouped by production areas (e.g. Lathe, Plasma, Hammers, Manufacturing).
  - Designed for large screens such as monitors and TVs.

- **Automatic Area Rotation**
  - Automatically switches between areas every 3 seconds.
  - Manual selection locks the view to a specific area.
  - One-click option to return to automatic mode.

- **Service Lifecycle Management**
  - Create services.
  - Update and correct service data.
  - Delete services.
  - Mark services as finished.

- **Daily Business Cycle Rules**
  - Finished services remain visible until the end of the workday.
  - After business hours, finished services are hidden from the dashboard.
  - All data is persisted for historical records and auditing.

---

## 🕒 Regras de Negócio | Business Rules

### 🇧🇷 Português

- Serviços são exibidos apenas durante o período ativo de trabalho.
- Serviços finalizados:
  - Permanecem visíveis até o fim do expediente.
  - São ocultados automaticamente no próximo dia útil.
- Suporte a turnos divididos (ex: manhã e tarde).

### 🇺🇸 English

- Services are displayed only during active business hours.
- Finished services:
  - Remain visible until the end of the shift.
  - Are automatically hidden on the next working day.
- Supports split shifts (e.g. morning and afternoon schedules).

---

## 🧱 Estrutura da Aplicação | Application Structure

### Frontend

- Dashboard (rota raiz / root route)
- Página de criação de serviço | Create Service page
- Página de atualização de serviço | Update Service page

### Backend

- Criação e persistência de serviços
- Atualização e exclusão de serviços
- Lógica de finalização
- Regras de visibilidade baseadas em horário

---

## 🛠️ Stack Tecnológica | Tech Stack

> Ajuste conforme a evolução do projeto

- Frontend: React + TypeScript
- Backend: Node.js + Express
- Database: MongoDB
- API: RESTful Architecture

---

## 🚀 Melhorias Futuras | Future Improvements

### 🇧🇷 Português

- Histórico e relatórios de serviços
- Autenticação e controle de acesso por perfil
- Exportação de dados (PDF / CSV)
- Atualizações em tempo real com WebSockets
- Suporte a múltiplas empresas ou unidades

### 🇺🇸 English

- Service history and analytics
- Authentication and role-based access
- Data export (PDF / CSV)
- Real-time updates with WebSockets
- Multi-company or multi-branch support

---

## 🎯 Propósito do Projeto | Project Purpose

### 🇧🇷 Português

Este projeto foi desenvolvido como um **dashboard operacional real**, focado em ambientes de produção, e também como **projeto de portfólio**, demonstrando modelagem de regras de negócio e desenvolvimento full stack.

### 🇺🇸 English

This project was developed as a **real-world operational dashboard**, and also serves as a **portfolio project**, showcasing business rule modeling and full-stack development skills.

---

## 📄 Licença | License

MIT License
