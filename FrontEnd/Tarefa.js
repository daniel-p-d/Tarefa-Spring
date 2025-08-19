// Animação POP-UP
function abrirPopup(id) {
    const popup = document.getElementById(id);
    popup.showPopover();
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            popup.classList.add("pop");
        });
    });
}

function fecharPopup(id) {
    const popup = document.getElementById(id);
    popup.classList.remove("pop");
    setTimeout(() => {
    popup.hidePopover();
    }, 300);
}

// Buscar tarefas e criar Div

fetch('http://localhost:8080/tarefa')
  .then(response => response.json())
    .then(tarefas => {
      const divTarefas = document.getElementById('tarefas');
      tarefas.forEach(tarefa => {
        const mensagem = document.getElementById('mensagem');
        mensagem.style.display = 'none';

        const divTarefa = document.createElement('div');
        divTarefa.id = tarefa.id;
        divTarefa.classList.add('tarefa');

        const titulo = document.createElement('h3');
        titulo.classList.add('titulo');
        titulo.textContent = tarefa.titulo;

        const descricao = document.createElement('p');
        descricao.classList.add('descricao');
        descricao.textContent = tarefa.descricao;

        const status = document.createElement('p');
        status.classList.add('status');
        status.textContent = `Status: ${tarefa.status}`;

        // botão atualizar
        const btnAtualizar = document.createElement('button');
        btnAtualizar.title = "Atualizar";
        btnAtualizar.id = "btnTarefa";
        btnAtualizar.innerHTML = '<i class="fa-solid fa-pen"></i>';
        btnAtualizar.onclick = () => {
            abrirPopup('popupAtualizar');

            document.getElementById('atualizarBTN').dataset.id = tarefa.id;

        };
        
        // excluir
        const btnExcluir = document.createElement('button');
        btnExcluir.title = "Excluir";
        btnExcluir.id = "btnTarefa";
        btnExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';
        btnExcluir.onclick = () => 
        confirm(`Deseja realmente excluir a tarefa "${tarefa.titulo}"?`) ? fetch(`http://localhost:8080/tarefa/excluir/${tarefa.id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log('Tarefa excluída com sucesso');
                location.reload();
            } else {
                console.error('Erro ao excluir tarefa');
            }
        })
        .catch(error => console.error('Erro ao excluir tarefa:', error)) : null;
    

        divTarefa.appendChild(titulo);
        divTarefa.appendChild(descricao);
        divTarefa.appendChild(status);
        divTarefa.appendChild(btnAtualizar);
        divTarefa.appendChild(btnExcluir);

        divTarefas.appendChild(divTarefa);

      });
  })
.catch(error => console.error('Erro ao buscar tarefas:', error));

// Adicionar
document.getElementById('addBTN').addEventListener('click', function (event) {
    event.preventDefault();

    const titulo = document.getElementById('tituloAdicionar').value;
    const descricao = document.getElementById('descricaoAdicionar').value;
    const status = document.getElementById('statusAdicionar').value;

    if (titulo.length > 20) {
      alert('O título deve ter no máximo 20 caracteres.');
      return;
    }
    if (descricao.length > 40) {
      alert('A descrição deve ter no máximo 40 caracteres.');
      return;
    }
    
    if (!status) {
      alert('Por favor, selecione um status.');
      return;
    }

    fetch('http://localhost:8080/tarefa/criar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, descricao, status })
    })
    .then(response => response.json())
    .then(data => {
        fecharPopup('popupAdicionar');
        location.reload();

        document.getElementById('tituloAdicionar').value = '';
        document.getElementById('descricaoAdicionar').value = '';
        document.getElementById('statusAdicionar').value = '';
    })
    .catch(error => console.error('Erro ao adicionar tarefa:', error));
});

// atualizar
document.getElementById('atualizarBTN').addEventListener('click', function (event) {
    event.preventDefault();
    
    const id = this.dataset.id;
    const titulo = document.getElementById('tituloAtualizar').value;
    const descricao = document.getElementById('descricaoAtualizar').value;
    const status = document.getElementById('statusAtualizar').value;
    console.log(id);

    fetch(`http://localhost:8080/tarefa/atualizar/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, descricao, status })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Tarefa atualizada:', data);
        fecharPopup('popupAtualizar');
        location.reload();


        document.getElementById('tituloAtualizar').value = '';
        document.getElementById('descricaoAtualizar').value = '';
        document.getElementById('statusAtualizar').value = '';
    })
    .catch(error => console.error('Erro ao atualizar tarefa:', error));
    document.getElementById('tituloAtualizar').value = '';
    document.getElementById('descricaoAtualizar').value = '';
    document.getElementById('statusAtualizar').value = '';
});

