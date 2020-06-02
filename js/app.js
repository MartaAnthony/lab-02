'use strict'
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

  const $newSection = $(`<section>${myTemplate}</section>`);

  $newSection.find('h2').text(this.title);
  $newSection.find('p').text(this.description);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('alt', this.keyword);

  $('main').append($newSection);
}

$.ajax('data/page1.json', {method: 'GET', dataType: 'JSON'})
  .then(horns => {
    horns.forEach(value => {
      new Creature(value).render();
      console.log(allCreatures);
    }) //.then
    //this is where I need to build my keyword array
  })


