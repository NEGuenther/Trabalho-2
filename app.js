function consultarCadastro() {
    const id = document.getElementById("id").value;
    if (id === "") {
        alert("Por favor, insira um ID.");
        return;
    }

    const url = `https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/${id}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                // Exibe as informações
                document.getElementById("informacoes").innerHTML = `
                    <p><strong>ID:</strong> ${data.id}</p>
                    <p><strong>Nome:</strong> ${data.nome}</p>
                    <p><strong>Departamento:</strong> ${data.departamento}</p>
                    <p><strong>Endereço:</strong> ${data.endereco}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                `;
                // Exibe o botão de exclusão
                document.getElementById("btnExclusao").style.display = 'inline-block';
                // Preenche o formulário de alteração
                document.getElementById("nome").value = data.nome;
                document.getElementById("departamento").value = data.departamento;
                document.getElementById("endereco").value = data.endereco;
                document.getElementById("email").value = data.email;
                // Exibe o formulário de alteração
                document.getElementById("alteracao").style.display = 'block';
            } else {
                alert("ID não encontrado.");
            }
        })
        .catch(error => {
            alert("Erro na consulta.");
        });
}

function excluirCadastro() {
    const id = document.getElementById("id").value;
    const url = `https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/${id}`;

    fetch(url, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            const statusDiv = document.getElementById("status");
            if (data.status === "Ok") {
                statusDiv.innerHTML = data.mensagem;
                statusDiv.className = "ok";
            } else {
                statusDiv.innerHTML = data.mensagem;
                statusDiv.className = "erro";
            }
            document.getElementById("resultadoExclusao").style.display = 'block';
        })
        .catch(error => {
            alert("Erro ao excluir cadastro.");
        });
}

function alterarCadastro() {
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const departamento = document.getElementById("departamento").value;
    const endereco = document.getElementById("endereco").value;
    const email = document.getElementById("email").value;

    const url = `https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/${id}`;
    const data = {
        id: id,
        nome: nome,
        departamento: departamento,
        endereco: endereco,
        email: email
    };

    fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            const statusDiv = document.getElementById("status");
            if (data.status === "Ok") {
                statusDiv.innerHTML = data.mensagem;
                statusDiv.className = "ok";
            } else {
                statusDiv.innerHTML = data.mensagem;
                statusDiv.className = "erro";
            }
            document.getElementById("resultadoExclusao").style.display = 'block';
        })
        .catch(error => {
            alert("Erro ao alterar cadastro.");
        });
}
