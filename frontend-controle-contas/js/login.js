document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const login = document.getElementById('login').value;
  const senha = document.getElementById('senha').value;

  fetch('http://localhost:8080/usuarios/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          login: login,
          senha: senha
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.id) {
          // Salva o ID do usuário no localStorage
          localStorage.setItem('usuarioId', data.id);
          alert('Login realizado com sucesso!');
          window.location.href = 'principal.html';
      } else {
          alert('Login ou senha incorretos.');
      }
  })
  .catch(error => {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique o console para mais detalhes.');
  });
});
