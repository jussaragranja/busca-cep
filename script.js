const cepField = document.querySelector('#cep')
const cepErrorField = document.querySelector('#cepError')
const rua = document.querySelector('#rua')
const bairro = document.querySelector('#bairro')
const localidade = document.querySelector('#localidade')
const estadoUf = document.querySelector('#estado')
const botao = document.querySelector('button#loading')
const formField = document.querySelector('form')

cepField.addEventListener('focus', () => {
  cleanCepError()
})

cepField.addEventListener('blur', () => {
  let cep = cepField.value
  if (/\d{5}-?\d{3}/.test(cep)) {
    buscarCep(cep)
  } else {
    showCepError()
  }
})

function buscarCep(cep) {
  botao.classList.toggle('hidden')
  formField.classList.toggle('loading')
  let url = `https://viacep.com.br/ws/${cep}/json/`
  fetch(url)
    .then(res => res.json())
    .then(cepViaCep => {
      if(cepViaCep.erro) {
        cleanAddressFields()
      } else {
        formField.classList.toggle('loading')
        botao.classList.toggle('hidden')
        rua.value = cepViaCep.logradouro
        bairro.value = cepViaCep.bairro
        localidade.value = cepViaCep.localidade
        estadoUf.value = cepViaCep.uf
      }
    })
}


function cleanAddressFields() {
  rua.value = ''
  bairro.value = ''
  localidade.value = ''
  estadoUf.value = ''
}