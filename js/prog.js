let agregar = document.getElementById('agregar')
let tabla = document.getElementById('tabla_de_registro')
let formulario = document.getElementById('ingresar_datos')

let panel_de_cambio = document.getElementById('panel_de_cambio')
let cambio_nombre = document.getElementById('cambio_nombre');
let cambio_serie = document.getElementById('cambio_serie');
let fecha_cambio = document.getElementById('fecha_cambio');
let botao_alterar = document.getElementById('botao_alterar')

botao_alterar.addEventListener('click', confirmar_alteracao)

agregar.addEventListener('click', guardar)

window.onload = function(){
    if (localStorage.getItem('dados') != null){
        cadastro = JSON.parse(localStorage.getItem('dados'))
    }
    listar() 
}   

let cadastro = []
var dados_dos_inputs 
var guardar_id
var exclusao = false

function guardar() {
    let nome = document.getElementById('nombre').value
    let idade = document.getElementById('serie').value
    let email = document.getElementById('fecha').value

    cadastro.push({id: cadastro.length, nomeCliente: nome, idadeCliente: idade, emailCliente: email})
        localStorage.setItem('dados',JSON.stringify(cadastro))
        guardar_dados(cadastro.length-1)

        formulario.reset()

}

function guardar_dados(tamanho_do_cadastro){
    dados_dos_inputs = JSON.parse(localStorage.getItem('dados'))
    tabla.innerHTML += `<tr>     
                            <td>${dados_dos_inputs[tamanho_do_cadastro]['id']}</td>
                            <td>${dados_dos_inputs[tamanho_do_cadastro]['nomeCliente']}</td>
                            <td> ${dados_dos_inputs[tamanho_do_cadastro]['idadeCliente']}</td>
                            <td> ${dados_dos_inputs[tamanho_do_cadastro]['emailCliente']}</td>
                            <td><button class="excluir" type="button" onclick=excluir(${tamanho_do_cadastro})>Eliminar</button></td>
                            <td><button class="alterar" type="button" onclick=alterar(${tamanho_do_cadastro})>Editar</button></td>
                         </tr>` 
                         
}
function listar() {
    for (var i in cadastro) {
        tabla.innerHTML += `<tr>
                            <td>${i}</td>         
                            <td>${cadastro[i]['nomeCliente']}</td>                            
                            <td> ${cadastro[i]['idadeCliente']}</td>                             
                            <td> ${cadastro[i]['emailCliente']}</td>
                            <td><button class="excluir" type="button" onclick=excluir(${i})>Eliminar</button></td>
                            <td><button class="alterar" type="button" onclick=alterar(${i})>Editar</button></td>
                            </tr>`

    }
}

function excluir(id_do_elemento) {
    exclusao = true
    cadastro.splice(id_do_elemento,1)
    localStorage.setItem('dados',JSON.stringify(cadastro))
    tabla.innerHTML = ""
    listar()
}

function alterar(id_do_elemento) {
    exclusao = false
    let alteracao = cadastro[id_do_elemento]
    guardar_id  = id_do_elemento
    cambio_nombre.value = alteracao.nomeCliente;
    cambio_serie.value = alteracao.emailCliente;
    fecha_cambio.value = alteracao.idadeCliente;
    panel_de_cambio.style.display = "block";
    agregar.style.display = "none";
    

}
// Confirmo a alteração, caso um elemento seja excluído no meio da mudança ele não faz nada.
function confirmar_alteracao() {
    if (exclusao == false) {
    cadastro[guardar_id].nomeCliente = cambio_nombre.value
    cadastro[guardar_id].emailCliente = cambio_serie.value
    cadastro[guardar_id].idadeCliente = fecha_cambio.value 
    localStorage.setItem('dados',JSON.stringify(cadastro))
    tabela.innerHTML = ""
    panel_de_cambio.style.display = "none";
    agregar.style.display = "block";
    listar()
    guardar_id = undefined
    }else {
        alert("Um elemento foi excluído no meio da alteração, nenhuma mudança feita")
        exclusao = false
        panel_de_cambio.style.display = "none";
        agregar.style.display = "block";
        tabla.innerHTML = ""
        listar()
    }
}

function fechar_tela() {
    panel_de_cambio.style.display = "none";
    tabla.innerHTML = ""
    listar()
}