const clicks = () => {
    const type = document.getElementById("search-input");
    const getValue = parseInt (type.value);
    console.log(getValue) ;
    type.value = '';

    if ( getValue < 0 ||  isNaN (getValue) || getValue == ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'please input positive numbers!',
          })
    }

    else{
        const url = `https://deckofcardsapi.com/api/deck/new/draw/?count=${getValue}`
        fetch (url)
        .then(res => res.json())
        .then(data => loadData(data.cards))
    }

}

const loadData = (card) => {
  
    const displays = document.getElementById("display");
    displays.innerHTML='';

    for(const cards of card){
        // console.log(cards)
     
        const div = document.createElement("div")
        div.classList.add('col-lg-4')
        div.classList.add('mb-5')
        div.innerHTML = `
        <div onclick="loadDetails('${cards.code}')" class="card" style="width: 18rem;">
         <img src="${cards.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${cards.code}</h5>
        <p> ${cards.value} </p>
        </div>
        </div>
        `;

        displays.appendChild(div);

    }
}

const loadDetails = (detail )=> {
     fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=52")
//   console.log(url)
    .then(res => res.json())
    .then(data => {
        const alldata = data.cards
        const findcard = alldata.find(data => data.code === detail);
        // console.log(findcard) ;
        const showdetials= document.getElementById("details");
        showdetials.textContent='';
        const create = document.createElement("div")
        create.innerHTML = `
        <div  class="card" style="width: 18rem;">
        <img src="${findcard.image}" class="card-img-top" alt="...">
       <div class="card-body">
       <h5 class="card-title">${findcard.code}</h5>
       <p> ${findcard.value} </p>
       </div>
       </div>
        `;
         
        showdetials.appendChild (create) ;

    })
 
}

