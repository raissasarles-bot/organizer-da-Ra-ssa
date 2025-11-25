# ✨ Organizer da Raíssa

Um aplicativo web progressivo (PWA) bonito e intuitivo para organização pessoal, otimizado para iPhone.

## 🎯 Funcionalidades

- ✅ **Gerenciamento de Tarefas**: Adicione, edite e exclua tarefas facilmente
- 📅 **Múltiplas Visualizações**: Veja suas tarefas por dia, semana ou mês
- 🔄 **Tarefas Recorrentes**: Configure tarefas que se repetem diariamente, semanalmente ou mensalmente
- 🏷️ **Categorias Personalizadas**: Organize tarefas por categorias com cores e emojis
- 📊 **Acompanhamento de Progresso**: Veja seu progresso diário em tempo real
- 🌙 **Modo Escuro**: Alterne entre tema claro e escuro
- 📱 **Instalável**: Funciona como app nativo no iPhone
- 💾 **Offline**: Todos os dados salvos localmente, funciona sem internet

## 🚀 Como Usar

### Opção 1: Abrir Diretamente no Navegador

1. Abra o PowerShell na pasta do projeto
2. Execute o servidor local:
   ```powershell
   python -m http.server 8000
   ```
3. Abra seu navegador e acesse: `http://localhost:8000`

### Opção 2: Instalar no iPhone (Recomendado)

1. **Hospedar o App**: 
   - Você pode usar GitHub Pages, Netlify, Vercel ou qualquer serviço de hospedagem gratuito
   - Ou compartilhar via rede local (veja instruções abaixo)

2. **Instalar no iPhone**:
   - Abra o Safari no iPhone
   - Acesse a URL do app
   - Toque no botão de compartilhar (quadrado com seta)
   - Selecione "Adicionar à Tela de Início"
   - Pronto! O app aparecerá como um ícone na tela inicial

### Compartilhar na Rede Local (iPhone e PC na mesma rede Wi-Fi)

1. No PC, descubra seu IP local:
   ```powershell
   ipconfig
   ```
   Procure por "Endereço IPv4" (ex: 192.168.1.100)

2. Inicie o servidor:
   ```powershell
   python -m http.server 8000
   ```

3. No iPhone, abra o Safari e acesse:
   ```
   http://SEU_IP:8000
   ```
   (Exemplo: http://192.168.1.100:8000)

## 📖 Guia de Uso

### Adicionar uma Tarefa

1. Clique no botão **"➕ Nova Tarefa"**
2. Preencha:
   - **Título**: Nome da tarefa (ex: "Passear com o cachorro")
   - **Descrição**: Detalhes opcionais
   - **Categoria**: Selecione uma categoria
   - **Data**: Escolha a data
   - **Recorrência**: Escolha se a tarefa se repete
3. Clique em **"Salvar Tarefa"**

### Categorias Padrão

- 🏠 **Casa & Limpeza**: Limpar armários, lavar banheiro, etc.
- 🐕 **Pets**: Passear com cachorro, alimentar, etc.
- 💅 **Cuidados Pessoais**: Unhas, cabelo, skincare, etc.
- 📝 **Outras**: Qualquer outra tarefa

### Criar Categoria Personalizada

1. Vá para a aba **"🏷️ Categorias"**
2. Clique em **"➕ Nova Categoria"**
3. Defina:
   - Nome da categoria
   - Emoji representativo
   - Cor da categoria
4. Clique em **"Salvar Categoria"**

### Tarefas Recorrentes

Ao criar uma tarefa, escolha a recorrência:
- **Sem recorrência**: Tarefa única
- **Diária**: Repete todos os dias (ex: passear com cachorro)
- **Semanal**: Repete toda semana no mesmo dia
- **Mensal**: Repete todo mês no mesmo dia

### Visualizações

- **📅 Hoje**: Lista de tarefas do dia com progresso
- **📆 Semana**: Visão dos próximos 7 dias
- **🗓️ Mês**: Calendário mensal completo
- **🏷️ Categorias**: Gerenciar categorias personalizadas

## 🎨 Recursos Visuais

- **Design Moderno**: Gradientes vibrantes (roxo para rosa)
- **Animações Suaves**: Transições e micro-interações
- **Responsivo**: Otimizado para iPhone e outros dispositivos
- **Glassmorphism**: Efeitos modernos de vidro
- **Tema Escuro**: Perfeito para uso noturno

## 💾 Armazenamento de Dados

Todos os dados são salvos localmente no navegador usando `localStorage`:
- ✅ Funciona offline
- ✅ Dados privados (não saem do dispositivo)
- ✅ Rápido e eficiente
- ⚠️ Importante: Não limpe os dados do navegador ou perderá as tarefas

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Design system com variáveis CSS
- **JavaScript**: Lógica da aplicação (Vanilla JS)
- **PWA**: Service Worker para funcionalidade offline
- **LocalStorage**: Persistência de dados

## 📱 Compatibilidade

- ✅ iPhone (Safari)
- ✅ Android (Chrome)
- ✅ Desktop (Chrome, Firefox, Edge, Safari)

## 🆘 Solução de Problemas

### O app não está salvando dados
- Verifique se o navegador permite localStorage
- Não use modo anônimo/privado

### Não consigo instalar no iPhone
- Use o Safari (não funciona com Chrome no iPhone)
- Certifique-se de estar acessando via HTTPS ou localhost

### As tarefas recorrentes não aparecem
- Tarefas recorrentes aparecem automaticamente nas datas futuras
- A data inicial da tarefa é quando ela começa a se repetir

## 📄 Licença

Projeto pessoal - Livre para uso da Raíssa! ❤️

---

Desenvolvido com 💜 para organização pessoal
