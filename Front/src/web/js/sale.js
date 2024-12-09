import "regenerator-runtime/runtime"
import DataTable from "datatables.net-dt"
import axios from "axios"
const url = "http://localhost:3000/sales/"
let table
let user
let product
let clients

let token = window.localStorage.getItem("token_de_acesso")
const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const bodyParameters = {
   key: "value"
};

$(document).ready(async function(){
   try{
        loadTable()
        cleanFields()
        loadUser()
        loadProduct()
        loadClient()
   }catch(error){
        alert(error)
   }
})
async function loadUser(){
    user = await axios("http://localhost:3000/users/", config, bodyParameters)
    console.log(user.data)

    var select = $("#selectUser")
    user.data.forEach(u =>{
        var option = document.createElement('option')
        option.value = u['id']
        option.innerHTML = u['name']

        select.append(option)
    })
}
async function loadClient(){
    clients = await axios("http://localhost:3000/clients/", config, bodyParameters)
    console.log(clients.data)

    var select = $("#selectClient")
    clients.data.forEach(p => {
        var option = document.createElement('option')
        option.value = p['id']
        option.innerHTML = p['name']
        
        select.append(option)
    });
}
async function loadProduct(){
    product = await axios("http://localhost:3000/products/",  config, bodyParameters)
    console.log(product.data)

    var select = $("#selectProd")
    product.data.forEach( p => {
        var option = document.createElement('option')
        option.value = p['id']
        option.innerHTML = p['name']

        select.append(option)
    });
}
$("#btnSalvar").click(async function () {
    var id = $("#txtID").val()
    var userId = $("#selectUser").val()
    var prodId = $("#selectProd").val()
    var clientId = $("#selectClient").val()
    var quantity =parseInt($("#txtQuantity").val())
    if(!id){
        axios.post(url,{
            clientId: clientId,
            productId:prodId,
            userId: userId,
            quantity: quantity
        }, config, bodyParameters).then(function(response){
            alert("Venda criada com sucesso")
            cleanFields()
            refreshTable()
        }).catch(function(error){
            alert(error)
        })
    }else{
        axios.put(url+id,{
            id:id,
            userId:userId,
            productId:prodId,
            clientId:clientId,
            quantity:quantity
        } , config, bodyParameters
    ).then(function(response){
            alert("Informações alteradas")
            cleanFields()
            refreshTable()
        }).catch(function(error){
            alert(error)
            console.log(userId, ",", prodId, "/", clientId, "/", quantity, "/", value)
        })
    }
})

$("#btnLimpar").click(async function () {
    cleanFields()
})

$("#tabelaLista").on('click', 'button', function(e){
    var row = table.row($(this).parents('tr'))
    var rowData = row.data()
    if(this.id === "edit"){
        $("#txtID").val(rowData['id'])
        $("#selectUser").val(rowData['userId'])
        $("#selectProd").val(rowData['productId'])
        $("#selectClient").val(rowData['clientName'])
        $("#txtQuantity").val(rowData['quantity'])

    }else{
        deleteSale(rowData['id'])
        refreshTable()
    }
})

async function loadTable() {
    await axios(url, config, bodyParameters).then(function(response){
        // console.log(response.data)
        table = $('#tabelaLista').DataTable({
            data: response.data,
            columnDefs:[
                {title: "ID", targets:0},
                {title: "Usuário", targets:1},
                {title: "Produto", targets:2},
                {title: "Cliente", targets:3},
                {title: "Quantity", targets:4},
                {title: "Opções", targets:-1}
            ],
            columns: [
                {data: "id"},
                {data: "userName"},
                {data: "productName"},
                {data: "clientName"},
                {data: "quantity"},
                {data: null,
                    defaultContent: '<button id="edit">Editar</button>&nbsp;<button id="excluir">Excluir</button>',
                    targets: -1
                }
            ]
        })
    }).catch(function(error){
        alert(error)
    })

}

function cleanFields(){
    $("#txtID").val('')
    $("#selectUser").val('')
    $("#selectProd").val('')
    $("#selectClient").val('')
    $("#txtQuantity").val('')
}

async function deleteSale(id){
    try{
        await axios.delete(url + id, config, bodyParameters)
        alert("Deletado com sucesso")
    }catch(error){
        alert(error)
    }
    await refreshTable()
}

async function refreshTable() {
    console.log("refreshado")
    try {
        const response = await axios(url, config, bodyParameters);
        table.clear().rows.add(response.data).draw();
    } catch (error) {
        console.log("Erro ao atualizar a tabela: " + error);
    }
}