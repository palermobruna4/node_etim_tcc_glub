const inputType = document.querySelectorAll('input')[1]
const button = document.querySelector('.ver-senha')
const buttonImage = document.querySelector('.imagem-view')

console.log(inputType)

button.addEventListener("click", () =>{
    if(inputType.type === "password"){
        inputType.setAttribute("type", "text")
        buttonImage.setAttribute("src", "/Imagens/view.svg")
    }

    else{
        inputType.setAttribute("type", "password")
        buttonImage.setAttribute("src", "/Imagens/no-view.svg")
    }

    
})
