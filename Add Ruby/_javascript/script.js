// Variáveis Criadas a partir de Tags HTML

var tagInputRecebeTxt = document.querySelector("#tagInputRecebeTxt"); // Recebe o texto que será tratado e formatado;
var tagInputRecebeTraducaoTxt = document.querySelector("#tagInputRecebeTraducaoTxt"); // Recebe a tradução do texto que será tratado e formatado;
var tagInputRecebeClasses = document.querySelector("#tagInputRecebeClasses"); // Recebe a classe que será adicionada à div mãe do código retornado. 
var tagBtEnviaTxt = document.querySelector("#tagBtEnviaTxt"); // Recebe o botão que chama a função que serve de motor para o script;
var tagAreaTexto = document.querySelector("#tagAreaTexto"); // Caixa de texto que exibirá o código resultante; 
var template1 = document.querySelector("#template1"); // Tag Ruby; 
var template2 = document.querySelector("#template2"); // Tag Rt; 
var template3 = document.querySelector("#template3"); // Tag Div;
var template4 = document.querySelector("#template4"); // Tags div span; 

// ========================================

// Variáveis Auxiliares

var arrayString = [];
var elementos = [];
var dvPrincipal = template3.content.querySelector("div");

// ========================================

// Eventos

tagInputRecebeTxt.addEventListener("input",VerificaValidadeTagRecebeTxt);
tagBtEnviaTxt.addEventListener("mouseover",MotorChecaEstadoBotao);
tagBtEnviaTxt.addEventListener("mouseout",MotorChecaEstadoBotao);
tagBtEnviaTxt.addEventListener("click",MotorFormataTxt);

// ========================================

// Funções 

Inicio();


// Função padrão de início de código;

function Inicio(){

LimpaImputTxt(tagInputRecebeTxt);
LimpaImputTxt(tagInputRecebeTraducaoTxt);
LimpaImputTxt(tagInputRecebeClasses);
LimpaImputTxt(tagAreaTexto);


VerificaValidadeTagRecebeTxt();

}

// ===============================================


// Função que verifica se a tag tagInputRecebeTxt está preenchida; 

function VerificaValidadeTagRecebeTxt(){
      
MudaEstadoElemento(tagBtEnviaTxt,!((tagInputRecebeTxt.checkValidity()) && (tagInputRecebeTxt.value[0] != " ")));

}

// ===============================================


// Função que serve de motor para a formatação do texto enviado;

function MotorFormataTxt(){
 
toggleClass(this,"pointer");

arrayString = tagInputRecebeTxt.value.split(" ");
addRuby();

if(tagInputRecebeTraducaoTxt.value != "")
    addTraducao();

 
addElementosDvPrincipal();

if(tagInputRecebeClasses.value != "")
    dvPrincipal.setAttribute("class",tagInputRecebeClasses.value);

tagAreaTexto.value += dvPrincipal.outerHTML + '\n\n';

removeElementosDvPrincipal();


LimpaImputTxt(tagInputRecebeTxt);
LimpaImputTxt(tagInputRecebeTraducaoTxt);
VerificaValidadeTagRecebeTxt();



}

// ==============================================

// Função que adiciona a frase enviada à tag ruby e a adiciona ao array elementos 


function addRuby(){
   

for(var x = 0; x < arrayString.length; x++){

  
    var ruby = template1.content.querySelector("ruby");

    ruby.textContent = arrayString[x];
   
    ruby.innerHTML = addRT(ruby);
   

    var novoRuby = document.importNode(template1.content, true);
    
    elementos.push(novoRuby);
    

}

}

// ==============================================

// Função que coloca o furigana enviado dentro da tag rt;

function addRT(rb){

var pos1 = rb.textContent.indexOf("[");
var pos2 = rb.textContent.indexOf("]");

if((pos1 != -1) && (pos2 != -1)){
   

var stringFurigana = rb.textContent.substring(pos1,(pos2 + 1));


var rt = template2.content.querySelector("rt");

rt.textContent = stringFurigana.substring(1,stringFurigana.length - 1);

var novaString = rb.textContent.replace(stringFurigana,rt.outerHTML);

return novaString;

}else{

return rb.textContent;

}

}

// ==============================================

// Função que adiciona a tradução enviada à tag template4 e a adiciona ao array elementos;

function addTraducao(){
   

var txtTraducao = tagInputRecebeTraducaoTxt.value;

var span = template4.content.querySelector("span");


span.textContent = txtTraducao;

var caixaTraducao = document.importNode(template4.content, true)

elementos.push(caixaTraducao);

}

// ==============================================

// Função que limpa o valor de campos input do tipo txt;

function LimpaImputTxt(ele){

ele.value = null;

}


// =======================================================

// Função que habilita ou desabilita um elemento;

function MudaEstadoElemento(ele,val){

ele.disabled = val;

}

// ======================================================


// Função que adiciona elementos à div principal;

function addElementosDvPrincipal(){

for (var x = 0; x < elementos.length; x++){

dvPrincipal.appendChild(elementos[x]);

}

}

// ======================================================

// Função que remove todos os elementos da div principal;

function removeElementosDvPrincipal(){

    var child = dvPrincipal.lastElementChild;


    while(child){ 
        dvPrincipal.removeChild(child); 
        child = dvPrincipal.lastElementChild; 
    } 

    child = dvPrincipal.lastChild;

    while(child){ 
        dvPrincipal.removeChild(child); 
        child = dvPrincipal.lastChild; 
    } 

}

// ======================================================


// Função que verifica se o botão tagBtEnviaTxt está habilitado;

function MotorChecaEstadoBotao(){

if(!(this.disabled))    
    toggleClass(this,"pointer");

}

// ======================================================

// Função que adiciona ou remove uma classe a um determinado elemento;

function toggleClass(ele,cl){

ele.classList.toggle(cl);

}

// ======================================================