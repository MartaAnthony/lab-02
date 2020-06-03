'use strict';
console.log('connected');

let allCreatures = [];

function Creature(obj){
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  this.image_url = obj.image_url;
  allCreatures.push(this);
}

Creature.prototype.render = function(){

  const myTemplate = $('#photo-template').html();

  const $newSection = $(`<section class=${this.keyword}>${myTemplate}</section>`);

  $newSection.find('h2').text(this.title);
  $newSection.find('p').text(this.description);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('alt', this.keyword);


  $('main').append($newSection);
}

// const dropDownMenu = () => {
//   keywordExtractor();
//   console.log("inside drop down", keywordExtractor.length, keywordExtractor);
//   for(let i= 0; i < keywordExtractor.length; i++){
//     $('option').append('i');
//   }
// }



// creating a drop down menu with unique keywords
const keywordExtractor = () => {
  const keywords = [];
  allCreatures.forEach(creature => {
    // looping through all the keywords. If a keyword does not exist in the keywords array, we put it in there
    if (!keywords.includes(creature.keyword)){
      keywords.push(creature.keyword)
    }
  })

  keywords.forEach(keyword => {
    let keywordAppend = `<option value="${keyword}">${keyword}</option>`
    $('select').append(keywordAppend);
  })
}

// getting the data from json file and creating and rendering the objects, then calling the keyword function
$.ajax('data/page1.json', {method: 'GET', dataType: 'JSON'})
  .then(horns => {
    horns.forEach(value => {
      new Creature(value).render();
      console.log(allCreatures);
    })
    keywordExtractor();
  })

// we need a filter function
// identify what was clicked on
// remove everything
// show only what was clicked on
function filter(event) {
  // find the thing that was clicked
  let thingIClickedOn = $(this).val();
  $('section').hide();
  $(`.${thingIClickedOn}`).show();
}

$('#menu').on('change', filter);

