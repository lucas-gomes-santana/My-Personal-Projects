//Importando os módulos da biblioteca electron necessários para o App
const{app,BrowserWindow,ipcMain,dialog,Menu} = require('electron');
const fs = require('fs');

let Interface; //Variável da interface do App

//Criando a interface quando o App estiver pronto
app.on('ready',() => {
    //Definindo as dimensões da tela
    Interface = new BrowserWindow({
        width:1000,
        height:650,
        frame:true, //Mantém os botões da janela do app(fechar,minimizar e diminuir o tamanho) quando a tela estiver maximizada
        webPreferences:{
            //Conecta o processo principal com o processo de renderização
            preload:__dirname +'/preload.js',
        },
        menuBarVisible:false, //Desativando o menu padrão de opções do electron
    });
    
    Interface.loadFile('index.html'); //Carregando o arquivo HTML

    Interface.maximize(); //Maximiza o tamanho da tela ao iniciar o App

    Menu.setApplicationMenu(null);

});

//Parte do código que cria o evento de abrir arquivos
ipcMain.handle('dialog:openfile',async() => {
    //Abre a caixa de diálogo para selecionar um arquivo do computador e abrí-lo
    const {canceled,filePaths} = await dialog.showOpenDialog({
        properties:['openfile'], //Permite abrir arquivos
    });

    if (!canceled){
        //Lê o conteúdo do arquivo selecionado
        const ConteudoArquivo = fs.readFileSync(filePaths[0],'utf-8');
        return {ConteudoArquivo,filePath:filePaths[0]}; //Retorna o caminho e o conteúdo do arquivo
    }
});

//Parte do código que cria o evento de salvar arquivo
ipcMain.handle('dialog:saveFile',async(event,{filePath,ConteudoArquivo}) => {
    if(filePath){
        try {
            fs.writeFileSync(filePath,ConteudoArquivo,'utf-8');
            return filePath; //Retorna o caminho do arquivo após salvar 
        } catch (error) {
            console.error("Erro ao sobrescrever o arquivo ",error);
            throw error;
        }

    }
    else{ 
        // Se não houver caminho, abre a caixa de diálogo para salvar o arquivo
        const{canceled,filePath:NovoCaminhoArquivo} = await dialog.showSaveDialog({});
        if(!canceled){
            try {
                fs.writeFileSync(NovoCaminhoArquivo,ConteudoArquivo,'utf-8');
                return NovoCaminhoArquivo;
            } catch (error) {
                console.error("Erro ao salvar o novo arquivo: ",error);
                throw error;
            }
        }
    }
});

//Adicionando as ferramentas de desenvolvedores 
ipcMain.on('devtools:open',() => {
    const webContents = BrowserWindow.getFocusedWindow()?.webContents;
    if (webContents){
        webContents.openDevTools();
    }
});