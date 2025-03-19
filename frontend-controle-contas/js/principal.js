document.addEventListener('DOMContentLoaded', function () {
  const addContaForm = document.getElementById('add-conta-form');
  const contasTableBody = document.getElementById('contas-table-body');
  const categoriaSelect = document.getElementById('categoriaId');

  // Função para carregar as categorias dinamicamente
  function carregarCategorias() {
    fetch('http://localhost:8080/categorias')
      .then(response => response.json())
      .then(categorias => {
        categoriaSelect.innerHTML = ''; // Limpa as opções existentes
        categorias.forEach(categoria => {
          const option = document.createElement('option');
          option.value = categoria.id;
          option.text = categoria.descricao;
          categoriaSelect.add(option);
        });
      })
      .catch(error => console.error('Erro ao carregar categorias:', error));
  }

  // Função para adicionar uma nova conta
  function adicionarConta(event) {
    event.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const dataVencimento = document.getElementById('dataVencimento').value;
    const tipoConta = document.getElementById('tipoConta').value;
    const categoriaId = parseInt(document.getElementById('categoriaId').value);
    const status = document.getElementById('status').value === 'true';

    const usuarioId = localStorage.getItem('usuarioId');

    const conta = {
      descricao: descricao,
      valor: valor,
      dataVencimento: dataVencimento,
      tipoConta: tipoConta,
      status: status,
      usuarioId: usuarioId,
      categoriaId: categoriaId
    };

    const id = document.getElementById('id').value;

    if (id) {
      // Edição
      conta.id = parseInt(id);
      fetch(`http://localhost:8080/contas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(conta)
      })
        .then(response => {
          if (response.ok) {
            alert('Conta atualizada com sucesso!');
            carregarContas(); // Recarrega as contas após atualizar
            addContaForm.reset(); // Limpa o formulário
            addContaForm.action = 'http://localhost:8080/contas';
            addContaForm.method = 'post';
          } else {
            response.text().then(text => {
              alert(`Erro ao atualizar conta: ${text}`);
              console.error('Erro ao atualizar conta:', text);
            });
          }
        })
        .catch(error => console.error('Erro ao atualizar conta:', error));
    } else {
      // Criação de uma nova conta
      fetch('http://localhost:8080/contas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(conta)
      })
        .then(response => {
          if (response.ok) {
            alert('Conta adicionada com sucesso!');
            carregarContas(); // Recarrega as contas após adicionar
            addContaForm.reset(); // Limpa o formulário
          } else {
            response.text().then(text => {
              alert(`Erro ao adicionar conta: ${text}`);
              console.error('Erro ao adicionar conta:', text);
            });
          }
        })
        .catch(error => console.error('Erro ao adicionar conta:', error));
    }
  }

  // Função para carregar as contas cadastradas
  function carregarContas() {
    contasTableBody.innerHTML = ''; // Limpa a tabela antes de carregar

    fetch('http://localhost:8080/contas')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then(text => {
            console.error('Erro ao carregar contas:', text);
            alert(`Erro ao carregar contas: ${text}`);
          });
        }
      })
      .then(data => {
        if (data) {
          data.forEach(conta => {
            const row = document.createElement('tr');

            const descricaoCell = document.createElement('td');
            descricaoCell.textContent = conta.descricao;

            const valorCell = document.createElement('td');
            valorCell.textContent = conta.valor;

            const dataVencimentoCell = document.createElement('td');
            dataVencimentoCell.textContent = conta.dataVencimento;

            const tipoContaCell = document.createElement('td');
            tipoContaCell.textContent = conta.tipoConta;

            const statusCell = document.createElement('td');
            statusCell.textContent = conta.status ? 'Paga' : 'Pendente';

            const actionsCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => editarConta(conta.id));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', () => excluirConta(conta.id));

            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);

            row.appendChild(descricaoCell);
            row.appendChild(valorCell);
            row.appendChild(dataVencimentoCell);
            row.appendChild(tipoContaCell);
            row.appendChild(statusCell);
            row.appendChild(actionsCell);

            contasTableBody.appendChild(row);
          });
        }
      })
      .catch(error => console.error('Erro ao carregar contas:', error));
  }

  // Função para editar uma conta
  function editarConta(id) {
    fetch(`http://localhost:8080/contas/${id}`)
      .then(response => response.json())
      .then(conta => {
        document.getElementById('id').value = conta.id;
        document.getElementById('descricao').value = conta.descricao;
        document.getElementById('valor').value = conta.valor;
        document.getElementById('dataVencimento').value = conta.dataVencimento;
        document.getElementById('tipoConta').value = conta.tipoConta;
        document.getElementById('categoriaId').value = conta.categoriaId;
        document.getElementById('status').value = conta.status;

        // Altera a ação do formulário para editar
        addContaForm.action = `http://localhost:8080/contas/${id}`;
        addContaForm.method = 'put';
      })
      .catch(error => console.error('Erro ao carregar conta para edição:', error));
  }

  // Função para excluir uma conta
  function excluirConta(id) {
    if (confirm(`Tem certeza que deseja excluir a conta com ID: ${id}?`)) {
      fetch(`http://localhost:8080/contas/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            alert('Conta excluída com sucesso!');
            carregarContas(); // Recarrega as contas após excluir
          } else {
            response.text().then(text => {
              alert(`Erro ao excluir conta: ${text}`);
              console.error('Erro ao excluir conta:', text);
            });
          }
        })
        .catch(error => console.error('Erro ao excluir conta:', error));
    }
  }

  addContaForm.addEventListener('submit', adicionarConta);

  // Carrega as categorias e as contas ao carregar a página
  carregarCategorias();
  carregarContas();
});
