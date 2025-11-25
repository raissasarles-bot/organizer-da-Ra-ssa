# 📱 Como Instalar o Organizer da Raíssa no iPhone

Guia passo a passo para instalar o app na tela inicial do iPhone.

## 🌐 Método 1: Usando Hospedagem Online (Recomendado)

### Passo 1: Hospedar o App Online

Escolha uma das opções gratuitas:

#### Opção A: GitHub Pages (Mais Fácil)

1. Crie uma conta no [GitHub](https://github.com) (se não tiver)
2. Crie um novo repositório público
3. Faça upload de todos os arquivos do projeto
4. Vá em Settings → Pages
5. Selecione a branch `main` e clique em Save
6. Aguarde alguns minutos e você terá uma URL tipo: `https://seuusuario.github.io/organizer-raissa`

#### Opção B: Netlify

1. Acesse [Netlify](https://www.netlify.com)
2. Arraste a pasta do projeto para o site
3. Pronto! Você terá uma URL tipo: `https://organizer-raissa.netlify.app`

#### Opção C: Vercel

1. Acesse [Vercel](https://vercel.com)
2. Importe o projeto
3. Deploy automático! URL tipo: `https://organizer-raissa.vercel.app`

### Passo 2: Instalar no iPhone

1. **Abra o Safari** no iPhone (importante: use o Safari, não o Chrome)
2. **Acesse a URL** do seu app hospedado
3. **Toque no botão de compartilhar** (quadrado com seta para cima) na barra inferior
4. **Role para baixo** e toque em **"Adicionar à Tela de Início"**
5. **Edite o nome** se quiser (ou deixe "Organizer da Raíssa")
6. **Toque em "Adicionar"**

✅ **Pronto!** O app aparecerá na tela inicial como um app nativo!

---

## 🏠 Método 2: Rede Local (PC e iPhone na mesma Wi-Fi)

Use este método para testar antes de hospedar online.

### Passo 1: Preparar o PC

1. Abra o **PowerShell** na pasta do projeto:
   ```powershell
   cd C:\Users\user\.gemini\antigravity\scratch\OrganizadorRaissa
   ```

2. Descubra o **IP do seu PC**:
   ```powershell
   ipconfig
   ```
   Procure por "Endereço IPv4" na seção da sua rede Wi-Fi
   
   Exemplo: `192.168.1.100`

3. **Inicie o servidor**:
   ```powershell
   python -m http.server 8000
   ```
   
   Deixe esta janela aberta!

### Passo 2: Acessar no iPhone

1. Certifique-se de que o **iPhone está na mesma rede Wi-Fi** que o PC
2. Abra o **Safari** no iPhone
3. Digite na barra de endereço:
   ```
   http://SEU_IP:8000
   ```
   Exemplo: `http://192.168.1.100:8000`

4. O app deve carregar!

### Passo 3: Instalar (Opcional para Rede Local)

⚠️ **Nota**: Apps em rede local podem não funcionar perfeitamente como PWA. Para melhor experiência, use o Método 1 (hospedagem online).

Se quiser testar a instalação:
1. Toque no botão de compartilhar
2. "Adicionar à Tela de Início"
3. O app funcionará apenas quando o PC estiver ligado e o servidor rodando

---

## ✨ Após a Instalação

### O que você pode fazer:

- ✅ Abrir o app tocando no ícone (como qualquer app)
- ✅ Usar em tela cheia (sem barra do Safari)
- ✅ Funciona offline (depois de carregar uma vez)
- ✅ Receber notificações (se configurado)
- ✅ Dados salvos localmente no iPhone

### Dicas:

1. **Primeira vez**: Abra o app com internet para carregar todos os recursos
2. **Backup**: Os dados ficam salvos no iPhone. Para não perder, não limpe os dados do Safari
3. **Atualização**: Se hospedar online e atualizar o código, o app atualizará automaticamente
4. **Múltiplos dispositivos**: Instale em vários dispositivos, mas os dados não sincronizam (cada um tem seus próprios dados)

---

## 🆘 Problemas Comuns

### "Não consigo adicionar à tela de início"

- ✅ Certifique-se de estar usando o **Safari** (não Chrome)
- ✅ Verifique se está acessando via **HTTP** ou **HTTPS** (não file://)

### "O ícone não aparece bonito"

- ✅ Aguarde alguns segundos após adicionar
- ✅ Verifique se os arquivos de ícone estão na pasta `assets/icons/`

### "App não funciona offline"

- ✅ Abra o app pelo menos uma vez com internet
- ✅ Aguarde o Service Worker registrar (pode levar alguns segundos)
- ✅ Verifique no console do Safari se há erros

### "Perdi minhas tarefas"

- ⚠️ Dados são salvos localmente no Safari
- ⚠️ Se limpar dados do navegador, perde as tarefas
- 💡 Considere fazer backup manual exportando os dados (funcionalidade futura)

---

## 🎉 Pronto para Usar!

Agora a Raíssa pode organizar suas tarefas diretamente do iPhone! 

**Próximos passos sugeridos:**
1. Adicione algumas tarefas de teste
2. Configure categorias personalizadas
3. Experimente o modo escuro 🌙
4. Teste as tarefas recorrentes

Boa organização! ✨
