"use strict";
//TODO: ADD catch for when API call fails
//Add loading
const searchByCategoryButton = document.getElementById("searchByCategoryButton");
const viewAllButton = document.getElementById("viewAllButton");
const showDiscontinutedCheckbox = document.getElementById("showDiscontinutedCheckbox");
const categorySelect = document.getElementById("categorySelect");
const cardOutput = document.getElementById("cardOutput");

//API URL


window.onload = () => {


    console.log("connected");
    populateCategoriesSelect("categories");

    searchByCategoryButton.onclick = onSearchByCategoryButtonClick;
    viewAllButton.onclick = onViewAllButtonClick
    categorySelect.onchange = onCategorySelectChange;
    showDiscontinutedCheckbox.onchange = onShowDiscontinuedCheckboxChange
}

//TODO: Do this 
function onShowDiscontinuedCheckboxChange(){
    if(showDiscontinutedCheckbox.checked){
        console.log("checked")
    } else {
        console.log("unchekced")
    }
   
}

function onSearchByCategoryButtonClick() {
    categorySelect.style = "display: block;";
    cardOutput.innerHTML = "";
    categorySelect.value = "";

}

function onViewAllButtonClick() {
    categorySelect.style = "display: none;";
    cardOutput.innerHTML = "";
    callApi("products").then(data => {
        for(let d of data){
            cardOutput.appendChild(createListingCard(d));
        }
    })
}

function onCategorySelectChange() {
    cardOutput.innerHTML = "";
    let selectValue = categorySelect.value;
    // console.log(selectValue);   
    callApi("products").then(data => {
        for (let d of data) {
           
            if (selectValue == parseInt(d.categoryId)) {

                cardOutput.appendChild(createListingCard(d));

            }
        }
    })
}

function populateCategoriesSelect(url) {
    callApi(url).then(data => {
        for (let d of data) {
            let theOption = new Option(d.name, d.categoryId);
            categorySelect.appendChild(theOption);
        }
    })
}

//I am calling the api repeatedly, is there a way
//for me to just call it once and store the data to use
//or is that a bad way to go about it



//Creates the card listing for the page
//TODO: Make this Readable and fix it a bit
function createListingCard(data) {
  
    //div
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mask-custom", "p-3", "my-3", "cardListing");

    //div
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");
    //div
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    //div  
    const colDiv1 = document.createElement("div");
    colDiv1.classList.add("col");

    //div
    const colDiv2 = document.createElement("div");
    colDiv2.classList.add("col-8");

    //div
    const colDiv3 = document.createElement("div");
    colDiv3.classList.add("col");

    //div
    const textDiv = document.createElement("div");
    textDiv.classList.add("form-outline");

    //p
    const h1 = document.createElement("p");
    h1.classList.add("h1", "font-weight-bold", "mb-4");
    h1.innerHTML = data.productName;

    //p
    const paragraph1 = document.createElement("p");
    paragraph1.classList.add("h4");
    paragraph1.innerHTML = "Units in Stock: " + data.unitsInStock;

    //p
    const paragraph2 = document.createElement("p");
    paragraph2.classList.add("h4");
    paragraph2.innerHTML = "$" + parseInt(data.unitPrice).toFixed(2);
    colDiv1.appendChild(paragraph2);

    //anchor
    const a = document.createElement("a");
    a.innerHTML = "Learn More";
    a.href = `details.html?productid=${parseInt(data.productId)}`;
    colDiv3.appendChild(a);

    cardDiv.appendChild(cardBodyDiv);
    cardBodyDiv.appendChild(rowDiv);

   //ordering matters
    rowDiv.appendChild(colDiv1);
    rowDiv.appendChild(colDiv2);
    rowDiv.appendChild(colDiv3);

    colDiv2.appendChild(textDiv);
    textDiv.appendChild(h1);
    textDiv.appendChild(paragraph1);

    return cardDiv;
}