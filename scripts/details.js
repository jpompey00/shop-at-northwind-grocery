"use strict"

const detailsOutput = document.getElementById("detailsOutput");

window.onload = () => {
    let UrlParams = new URLSearchParams(location.search);
    let productId = -1;
    if(UrlParams.has("productid")){
        productId = UrlParams.get("productid");
    }
    console.log(productId);

    //TODO: Style this 
    callApi("products").then(data => {
        for(let d of data){
            if(d.productId == productId){
                for(let e  in d){
                    let p = document.createElement("p");
                    p.innerHTML = e + ": " + d[e];

                    detailsOutput.appendChild(p);

                }
            }
        }
    })



}