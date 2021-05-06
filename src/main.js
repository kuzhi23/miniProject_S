
//json 파일에서 아이템을 동적으로 받아온다.
function loadItems(){
    return fetch('./data/data.json')
        .then(response =>response.json())
        .then(json => json.items)
}

//updata the list
function displayItems(items) {
    const container = document.querySelector('.items')
    container.innerHTML = items.map(function(item){
                                return createHTMLstring(item)
                            }).join('')

}

//Creat Html
function createHTMLstring(item){
    return `
      <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
      </li>
    `
}

function onButtonClick(event, items){
    const dataset = event.target.dataset
    const key = dataset.key
    const value = dataset.value

    if(key === null || value === null ){
        return;
    }

    displayItems(items.filter(item => item[key] === value ))
}


function setEventListers(items){
    const logo = document.querySelector('.logo')
    const buttons = document.querySelector('.buttons')
    logo.addEventListener('click', ()=>displayItems(items))
    buttons.addEventListener('click', event=>onButtonClick(event, items))
}
//main
loadItems()
.then(items =>{
    displayItems(items);
    setEventListers(items)
})
.catch(console.log)