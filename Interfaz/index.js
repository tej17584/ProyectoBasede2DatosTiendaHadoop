//Zona donde importamos librerías y otros assets y extras
const{ app,BrowserWindow,Menu,ipcMain} = require('electron');
const url = require('url');
const path= require('path');

//Este proceso es para que se actualice solito
if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname,{
        //refrescamos código principal
        electron: path.join(__dirname,'../node_modules','.bin','electron')
    })
}

//Cramos la variable del mainWindow GLOBAL
let mainWindow
//Creamos variables globales
let NuevaVentana

//Este es el menú donde corre todo
app.on('ready',()=> {
    //Creamos el main Window y llamamos al index.html
    mainWindow= new BrowserWindow({webPreferences:{
        nodeIntegration:true
    }});
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'index.html'),
        protocol: 'file',
        slashes: true
    }));

    //Acá jalamos el nuevo menú
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    //evento de cierre cuando se cierra ejecutamos una funcion
    mainWindow.on('closed',()=>{
        app.quit();
    });
});


//creamos una funcion para probar el proceso la ventad
function CrearnuevaVentana(){
    NuevaVentana =  new BrowserWindow({
        width: 400,
        height:400,
        title:'Agregar producto',
        webPreferences:{
            nodeIntegration:true
        }
    });
    //NuevaVentana.setMenu(null);
    //llamamos a la ventadas
    NuevaVentana.loadURL(url.format({
        pathname:path.join(__dirname,'generic.html'),
        protocol: 'file',
        slashes: true
    }));

    //Escuchamos su evento de cierre

    NuevaVentana.on('close',()=>{
        NuevaVentana=null;
    });
    
}
//Creamos el vector para el menu
const templateMenu=[
    {
        label: 'File',
        submenu: [
            {
                label: 'Opciones',
                accelerator: 'Ctrl+N',
                click(){
                    CrearnuevaVentana();
                }
            },
            //podemosa gregar más cosas
            {
                label: 'Salir',
                accelerator: 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];


//Ventanas
if(process.env.NODE_ENV !== 'production'){
    templateMenu.push({
        label:'DevTools',
        submenu:[
            {
                label:'Show/Hide Dev Tools',
                accelerator:'Ctrl+D',
                click(item,focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}