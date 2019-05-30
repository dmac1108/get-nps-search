'use strict';

const APIKey = 'GyAMgLJwnDgPsN4ksJoxrAVl3YBxZTaygTbNLTiW';
const searchURL = 'https://developer.nps.gov/api/v1/parks'

function displayResults(responseJson){
    $('.js-results').empty();
  console.log("in the display Results function")
  for (let i=0; i<responseJson.data.length; i++){
     
    console.log(responseJson.data[i].addresses);

    let domAppendString = `<article><h2>${responseJson.data[i].fullName}</h2>
    <p>${responseJson.data[i].description}</p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
    </article>`;
    //console.log(domAppendString);

    $('.js-results').append(domAppendString);
    
    for (let j=0; j<responseJson.data[i].addresses.length; j++){
      //only append the physical address to the list
      if(responseJson.data[i].addresses[j].type === 'Physical'){
      let line2String = "";
      let line3String = "";
      let line1String = `<p>${responseJson.data[i].addresses[j].line1}</p>`;
      if(responseJson.data[i].addresses[j].line2 != null)
      {
        line2String = `<p>${responseJson.data[i].addresses[j].line2}</p>`;
      }
      if(responseJson.data[i].addresses[j].line3 != null)
      {
        line3String = `<p>${responseJson.data[i].addresses[j].line3}</p>`;
      }
      let cityStateZip = `<p>${responseJson.data[i].addresses[j].city}, ${responseJson.data[i].addresses[j].stateCode} ${responseJson.data[i].addresses[j].postalCode}</p>`
      let addressString = line1String + line2String + line3String + cityStateZip;

      $('.js-results').append(addressString);
    }
    }
    
  }
}


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function getData(stateSearch,numResults){
   console.log("in the getData function");
   //create the query string
   const params = {
       stateCode: `${stateSearch}`,
       limit: `${numResults}`,
       fields: "addresses",
       api_key: APIKey
   };
   const queryString = formatQueryParams(params);
   
   /*const options = {
       headers: new Headers({
        "accept" : "application/json"
       }) 
   };*/
   
   const url = searchURL + '?' + queryString;
   console.log(url);

   /*fetch(url)
   .then(response => {
       if(response.ok)
       {response.json()}
       else {
           throw new Error(response.statusText);
       }})
   //.then(responseJson => displayResults(responseJson))
   .then(responseJson => console.log(responseJson))
   .catch(err => console.log(err));*/

   fetch(url)
   /*.then(response => {
    if(response.ok)
    {response.json()}
    }
       )*/
    .then(response => response.json())
   .then(responseJson => displayResults(responseJson))
   .catch(err => console.log(err));
}


function watchForm(){
 console.log("WatchForm function started");
 $('form').submit(function(){
    const regex = /^[A-Za-z]{2}(?:,[A-Za-z]{2})*$/i;
    if($('input[type="text"]').val().match(regex)){
    const stateSearch = $('input[type="text"]').val();
    const numResults = $('input[type="number"]').val()-1;
    event.preventDefault();
    getData(stateSearch,numResults);
    }
    else{
        alert("Enter the two letter state abbreviation followed by commas");
    }
 });
 
}



$(function (){
console.log("App started");
watchForm();
$('input[type="number"]').val(10);
});