/*
logica de programação

1.pegar a infromação do input, quamdo o botao for clicado

2.ir até a API, e trazer as receitas

3.colocar as receitas na tela

4.saber qnd o usuario clicou na receita individua do API

5.buscra informações da receita individual

6.colocar a receita individual na tela


*/
const meuform = document.querySelector(".search-form")
const receitaslist = document.querySelector(".receitaslist")
const detalhes= document.querySelector(".detalhes")




meuform.addEventListener("submit", function (event) {
    event.preventDefault()
    const inputvalue = event.target[0].value

    searchrecipes(inputvalue)

})


async function searchrecipes(ingredient) {
    receitaslist.innerHTML=`<p>Carregando receitas...</p>`
    try{
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    const data = await response.json()
   
    showrecipes(data.meals)
    } catch(err){
        receitaslist.innerHTML=`<p>
        Nenhuma Receita Encontrada</p>`

        

    }
}


function showrecipes(recipes) {
    receitaslist.innerHTML = recipes.map(
        (item)  => `
    <div class="recipe-card" onclick="getreceitadetalhes(${item.idMeal})">
    <img src="${item.strMealThumb}">
    <h3>
    ${item.strMeal}
    </h3>
    </div>
    
    `
    ).join("")
    
}
async function getreceitadetalhes(id){
    
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data = await response.json()
const recipe = data.meals[0]
let ingredient=""


for (let i = 1;i<=20; i++ ){
if(recipe[`strIngredient${i}`]){
ingredient  +=`<li>${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}</li>`
}else{
    break
}
}
detalhes.innerHTML=
`
<ul>
${ingredient}
<h2>
${recipe.strMeal
}
<img src="${recipe.strMealThumb}" >

<h3> ${recipe.strCategory}</h3>
<h3>Origem: ${recipe.strArea}</h3>
<h3> Ingredientes:</h3>
</h2>
</ul>
<h3>Instruções:</h3>
<p> ${recipe.strInstructions}</p>
<p> Tags:${recipe.strTags}</p>
<p>Vídeo:  <a href="${recipe.strYoutube}" target="_blank">Assista no Youtube</a> </a></p>

`

}