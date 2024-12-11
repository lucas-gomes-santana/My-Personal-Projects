document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById("editor"); //Variável do campo de texto(textarea do HTML)
    let CurrentFilePath = null; // Armazena o caminho do arquivo que foi aberto

    // Evento que abre um arquivo
    document.getElementById("openFile").addEventListener('click', async () => { 
        const resultado = await window.electronAPI.openFile(); // Chama a função do processo principal
        if (resultado) {
            editor.value = resultado.ConteudoArquivo; // Preenche o editor com o conteúdo do arquivo
            CurrentFilePath = resultado.filePath; // Armazena o caminho do arquivo aberto
            console.log("Caminho do arquivo aberto: ", CurrentFilePath);
        } else {
            alert("Erro ao abrir o arquivo");
        }
    });

    // Evento que salva manualmente o conteúdo do editor
    document.getElementById("SaveFile").addEventListener('click', async () => {
        try {
            const NovoCaminhoArquivo = await window.electronAPI.saveFile({
                filePath: CurrentFilePath, // Passa o caminho atual do arquivo (se houver)
                ConteudoArquivo: editor.value // Passa o conteúdo do editor
            });

            //Verificação do caminho do arquivo salvo
            if (NovoCaminhoArquivo || CurrentFilePath) {
                if (NovoCaminhoArquivo){
                    CurrentFilePath = NovoCaminhoArquivo;
                }
                alert("As modificações foram salvas com sucesso!");    
                
                editor.value = editor.value;  //Força a atualização do campo de texto
                editor.focus(); //Garante que o campo de texto esteja focado para edição
            } 
            else {
                alert("Erro ao salvar o arquivo!");
                return;
            }
        } catch (error) {
            console.error("Erro ao salvar o arquivo:", error);
            alert("Ocorreu um erro ao salvar o arquivo.");
        }             
    });

    // Adição de atalhos de teclado no App
    document.addEventListener('keydown', (event) => {
        // Adição do evento de salvar o arquivo (Ctrl+S)
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault(); // Evita o comportamento padrão do navegador
            document.getElementById("SaveFile").click(); // Adiciona o evento de salvar arquivo quando Ctrl+S for pressionado
        }

        // Adiciona o evento de abrir um arquivo (Ctrl+O)
        if (event.ctrlKey && event.key === 'o') {
            event.preventDefault();
            document.getElementById("openFile").click(); // Adiciona o evento de abrir o arquivo
        }

        // Adiciona o evento para abrir as ferramentas de desenvolvedores
        if (event.ctrlKey && event.shiftKey && event.key === 'I') {
            window.electronAPI.openDevTools();
        }
    });
});
