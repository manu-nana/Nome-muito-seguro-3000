const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?()#';
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const valorEntropia = document.querySelector('.entropia');

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}
function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

geraSenha();

function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) {
        alfabeto += letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto += letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto += numeros;
    }
    if (checkbox[3].checked) {
        alfabeto += simbolos;
    }

    if (alfabeto.length === 0) {
        campoSenha.value = '';
        classificaSenha(0);
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        const numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto){
    forcaSenha.classList.remove('fraca','media','forte');

    if (tamanhoAlfabeto === 0) {
        valorEntropia.textContent = 'Selecione pelo menos um tipo de caractere para gerar uma senha.';
        return;
    }

    const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    if (entropia > 57){
        forcaSenha.classList.add('forte');
    } else if (entropia > 35) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }

    const dias = Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24));
    valorEntropia.textContent = 'Um computador pode levar até ' + dias + ' dias para descobrir essa senha.';
}