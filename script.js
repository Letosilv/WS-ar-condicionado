document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#formulario");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Coleta dos campos
      const nomeInput = form.querySelector('input[name="nome"]');
      const emailInput = form.querySelector('input[name="email"]');
      const mensagemInput = form.querySelector('textarea[name="mensagem"]');

      const nome = nomeInput?.value.trim();
      const email = emailInput?.value.trim();
      const mensagem = mensagemInput?.value.trim();

      // Validação
      if (!nome) {
        alert("Por favor, informe seu nome.");
        nomeInput.focus();
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (emailInput && !emailRegex.test(email)) {
        alert("Por favor, informe um e-mail válido.");
        emailInput.focus();
        return;
      }

      if (!mensagem) {
        alert("Por favor, descreva o serviço que você precisa.");
        mensagemInput.focus();
        return;
      }

      // Envio para o WhatsApp
      const textoWhatsApp = `Olá! Meu nome é ${nome}, meu e-mail é ${email}. Preciso do seguinte serviço: ${mensagem}`;
      const numero = "5511940090323";
      const urlWhatsApp = `https://wa.me/${numero}?text=${encodeURIComponent(textoWhatsApp)}`;
      window.open(urlWhatsApp, "_blank");

      // Envio para API (se desejar armazenar no backend)
      const dados = { nome, email, mensagem };

      try {
        const resposta = await fetch("http://localhost:8080/api/contato", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados)
        });

        const retorno = await resposta.text();
        alert(retorno);
        form.reset();
      } catch (erro) {
        console.error("Erro:", erro);
        alert("Erro ao enviar o formulário. Verifique a conexão com o servidor.");
      }
    });
  }

  // Busca de serviços
  const buscarBtn = document.getElementById("buscarBtn");
  if (buscarBtn) {
    buscarBtn.addEventListener("click", buscarServicos);
  }

  async function buscarServicos() {
    const termo = document.getElementById("termo").value;
    const resposta = await fetch(`/api/servicos/buscar?termo=${termo}`);
    const dados = await resposta.json();

    const resultados = document.getElementById("resultados");
    resultados.innerHTML = "";

    if (dados.length === 0) {
      resultados.innerHTML = "<p>Nenhum serviço encontrado.</p>";
      return;
    }

    dados.forEach(servico => {
      const item = document.createElement("div");
      item.innerHTML = `<strong>${servico.nome}</strong><br>${servico.descricao}<hr>`;
      resultados.appendChild(item);
    });
  }

  // Rolagem suave para âncoras
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const alvo = document.querySelector(this.getAttribute("href"));
      if (alvo) {
        alvo.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
