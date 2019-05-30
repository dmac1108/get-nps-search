'use strict';

const APIKey = 'GyAMgLJwnDgPsN4ksJoxrAVl3YBxZTaygTbNLTiW';
const searchURL = 'https://developer.nps.gov/api/v1/parks'

function displayResults(responseJson){
    $('.js-results').empty();
  console.log("in the display Results function")
  for (let i=0; i<responseJson.data.length; i++){
     
    console.log(responseJson.data[i]);

    let domAppendString = `<article><h2>${responseJson.data[i].fullName}</h2>
    <p>${responseJson.data[i].description}</p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
    </article>`;
    //console.log(domAppendString);
    $('.js-results').append(domAppendString);
    
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
       start: 1,
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
   .then(response => response.json())
   .then(responseJson => displayResults(responseJson));
}


function watchForm(){
 console.log("WatchForm function started");
 $('form').submit(function(){
    const stateSearch = $('input[type="text"]').val();
    const numResults = $('input[type="number"]').val();
    event.preventDefault();
    getData(stateSearch,numResults);
 });
 
}



$(function (){
console.log("App started");
watchForm();
$('input[type="number"]').val(10);
});