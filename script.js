const recipeList =document.querySelector('.recipe-list')
const form = document.querySelector('.form')
const recipeDetails = document.querySelector('.recipe-details')

form.addEventListener('submit', (parametro)=>{
    parametro.preventDefault()
    const inputValue = parametro.target[0].value
    
    resposta(inputValue)
})

async function resposta(ingrediente) {
     recipeList.innerHTML =`<p>Carregando Receitas...</p>`
    try{
    const resposta= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`)

    const dados =await resposta.json()

    receitas(dados.meals)
    }catch(err){
      recipeList.innerHTML = `<P>Nenhuma Receita Encontrada</p>`
    }
}
function receitas(receita){
    recipeList.innerHTML = receita.map(item => `
        <div class='recipe-card' onclick="listarReceita(${item.idMeal})">
        <img src="${item.strMealThumb}">
        <h3>${item.strMeal}</h3>
        </div>     
        `);
}

async function listarReceita(id){
 
    const resposta= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,)
    const dados =await resposta.json()
    const receita = dados.meals[0]
     console.log(dados);
     
    let ingredientes=''
 
    for(let i = 1; i<= 20; i++){
       if(receita[`strIngredient${i}`]){
          ingredientes += `<li>${receita[`strIngredient${i}`]} - ${receita[`strMeasure${i}`]}</li>`
        
        }else{
        break
       }
    }

    recipeDetails.innerHTML= `
    <h2>${receita.strMeal}</h2>
    <img class="imgReceita" src="${receita.strMealThumb}">
    <h3>${receita.strArea}</h3>
    <h3>Ingredientes:</h3>
    <ul>${ingredientes}</ul>
    <h3>Modo de Preparo:</h3>
    <P>${receita.strInstructions}</P>
    <P>Aula:<video> <a href="${receita.strYoutube} target="_blank"> Clique Aqui Para Assistir no Youtube</a></p>
    `
}

