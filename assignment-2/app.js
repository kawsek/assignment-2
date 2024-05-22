const productContainer = document.getElementById("player-container");

const loadAllProduct = () =>
    {
        fetch('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=A')
            .then(res=>res.json())
            .then(data=>{
                
                // console.log(data);
                displayProducts(data);
            })
    }

    document.getElementById("search-button").addEventListener("click", (e)=>{
        const inputValue = document.getElementById("search-input").value;
        
            fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${inputValue}`)
            .then(res=>res.json())
            .then(data=>{
            // console.log(data);
       
            displayProducts (data);
            })


        document.getElementById("search-input").value = "";
})

    const displayProducts = (products) =>{
        productContainer.innerHTML="";
        const abc = products.player;
        
        // console.log(abc);
       
       
        abc.map(product=>{
            // console.log(product);
            const div = document.createElement("div");
            div.classList.add("card");
            
            
            div.innerHTML =`
            <img class="card-img" src=${product.strThumb}
            alt=""/>
                <h5>${product.strPlayer}</h5>
                <h6>Team: ${product.strTeam
                }</h6>
                <h6>Nationality: ${product.strNationality
                }</h6>
                <h6>Plays ${product.strSport} </h6>
                <h6>Position ${product.strPosition
                }</h6>
               
                <button id="modal-show" onclick="singleProduct(${product.idPlayer})">Details</button>
                <button onclick="handleAddToCart('${product.strPlayer}')">Add To Group</button>
                `
            productContainer.appendChild(div);
            
        })
    }
    const arr = [];
    const handleAddToCart=(name)=>{
       
        const cartCount = document.getElementById("count").innerText;
        let convertedCart = parseInt(cartCount);
        convertedCart = convertedCart +1;
        
        if (convertedCart > 11) {
            alert('You can only add up to 11 players.');
            return;
          }
          for(const element of arr)
            {
                if(element == `${name}`)
                    {
                        alert('Already added');
                        return;
                    }
                
            }
        document.getElementById("count").innerText = convertedCart;
        const container = document.getElementById("cart-main-container");
    
        const div = document.createElement("div");
        div.classList.add("cart-info");
        div.innerHTML=`
            <li>${name}</li>
        `;
        
        arr.push(`${name}`);
        
        container.appendChild(div);
        
        // console.log(div);
            
    }
    
    
    const singleProduct= (id)=>
        {
            fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
                    const a = document.getElementById("modal-show");
                    
                    const modalShow = document.getElementsByClassName("modal-dialog modal-dialog-scrollable");
                    
                    const div = document.createElement("div");
            div.classList.add("card-1");
                    div.innerHTML=`
                    <p><strong>Name:</strong> ${player.strPlayer}</p>
                   
                    `;
                    modalShow.appendChild(div);
                    // console.log(modalShow);
                    

                })
        }


    
    loadAllProduct();
