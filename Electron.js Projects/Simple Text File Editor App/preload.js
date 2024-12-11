const{contextBridge,ipcRenderer} = require('electron'); //Importando os módulos do electron

// Expõe funções seguras para o frontend do código acessar
contextBridge.exposeInMainWorld('electronAPI', {
    
    openFile:() => ipcRenderer.invoke('dialog:openfile'),  //Abre um arquivo,chamando a função no processo principal
    saveFile: (data) => ipcRenderer.invoke('dialog:saveFile',data), //Salva um arquivo,passando dados para o  processo principal
    openDevTools: () => ipcRenderer.send('devtools:open') //Adiciona o DevTools de forma segura no App
});