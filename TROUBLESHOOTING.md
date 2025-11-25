# 🔧 Solução de Problemas - GitHub Pages

## Erro 404: File not found

Se você está vendo este erro no GitHub Pages, siga estas etapas:

### ✅ Checklist de Verificação

#### 1. Verificar se os arquivos foram enviados corretamente

No seu repositório GitHub, você deve ver estes arquivos na raiz:
- ✅ `index.html`
- ✅ `styles.css`
- ✅ `app.js`
- ✅ `manifest.json`
- ✅ `service-worker.js`
- ✅ Pasta `assets/` com subpasta `icons/`

**Se faltam arquivos**: Faça upload de todos os arquivos da pasta `OrganizadorRaissa`

#### 2. Verificar configuração do GitHub Pages

1. Vá em **Settings** (Configurações) do repositório
2. No menu lateral, clique em **Pages**
3. Verifique:
   - **Source**: Deve estar em `Deploy from a branch`
   - **Branch**: Selecione `main` (ou `master`)
   - **Folder**: Selecione `/ (root)`
4. Clique em **Save**
5. Aguarde 2-5 minutos para o deploy

#### 3. Verificar a URL

A URL do GitHub Pages deve ser:
```
https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/
```

**Importante**: 
- Use a barra `/` no final da URL
- Não adicione `/index.html` manualmente
- Exemplo correto: `https://joao.github.io/organizer-raissa/`

#### 4. Limpar cache do navegador

Às vezes o erro persiste por causa do cache:
1. Pressione `Ctrl + Shift + R` (Windows) ou `Cmd + Shift + R` (Mac)
2. Ou abra em modo anônimo/privado

#### 5. Verificar status do deploy

1. No repositório, vá na aba **Actions**
2. Veja se há algum deploy falhando (❌)
3. Se houver erro, clique para ver os detalhes

---

## 🚀 Método Alternativo: Netlify (Mais Fácil!)

Se o GitHub Pages continuar com problemas, use o Netlify - é ainda mais simples:

### Passo a Passo Netlify

1. **Acesse**: https://www.netlify.com
2. **Faça login** (pode usar conta do GitHub)
3. **Arraste a pasta** `OrganizadorRaissa` para a área de drop
4. **Pronto!** Em segundos você terá uma URL tipo:
   ```
   https://organizer-raissa.netlify.app
   ```

### Vantagens do Netlify
- ✅ Deploy instantâneo (segundos)
- ✅ Não precisa configurar nada
- ✅ URL personalizada grátis
- ✅ HTTPS automático
- ✅ Mais confiável

---

## 📋 Checklist Completo para GitHub Pages

Copie e cole este checklist para verificar tudo:

```
[ ] Todos os arquivos estão no repositório
[ ] index.html está na raiz (não em subpasta)
[ ] GitHub Pages está ativado em Settings → Pages
[ ] Branch correta selecionada (main/master)
[ ] Folder selecionado: / (root)
[ ] Aguardei 5 minutos após salvar configurações
[ ] Tentei acessar com / no final da URL
[ ] Limpei o cache do navegador
[ ] Verifiquei a aba Actions (sem erros)
```

---

## 🆘 Ainda não funciona?

### Opção 1: Verificar estrutura de pastas

Certifique-se de que a estrutura no GitHub está assim:

```
seu-repositorio/
├── index.html          ← Na raiz!
├── styles.css
├── app.js
├── manifest.json
├── service-worker.js
├── README.md
├── COMO_INSTALAR_NO_IPHONE.md
└── assets/
    └── icons/
        ├── icon-192.png
        └── icon-512.png
```

**ERRO COMUM**: Às vezes as pessoas criam uma pasta extra:
```
seu-repositorio/
└── OrganizadorRaissa/    ← ERRADO! Não deve ter esta pasta
    └── index.html
```

Se for o caso, mova todos os arquivos para a raiz do repositório.

### Opção 2: Criar repositório do zero

1. Crie um novo repositório no GitHub
2. Nome sugerido: `organizer-raissa`
3. Marque "Add a README file"
4. Clique em "Create repository"
5. Clique em "Add file" → "Upload files"
6. Arraste TODOS os arquivos da pasta `OrganizadorRaissa`
7. Commit
8. Vá em Settings → Pages
9. Ative com branch `main` e folder `/ (root)`

---

## 💡 Dica: Teste Local Primeiro

Antes de hospedar, teste localmente para garantir que funciona:

```powershell
cd C:\Users\user\.gemini\antigravity\scratch\OrganizadorRaissa
python -m http.server 8000
```

Acesse: http://localhost:8000

Se funcionar local mas não no GitHub Pages, o problema é na configuração do GitHub.

---

## 📱 Depois que Funcionar

Quando o site estiver no ar:
1. Abra a URL no Safari do iPhone
2. Toque no botão de compartilhar
3. "Adicionar à Tela de Início"
4. Pronto! App instalado! 🎉

---

**Precisa de ajuda?** Me envie:
- URL do seu repositório GitHub
- Screenshot do erro
- Screenshot das configurações em Settings → Pages
