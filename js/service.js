'use strict';
var gProjs = [];


function createProjs() {
    gProjs.push(createProj('in-picture', 'A fun way for kids to learn', 
    'A simple quiz for kids to learn to some English terms and to read carefully and exactly.', 
    ['Combine JS, HTML and CSS']));
    gProjs.push(createProj('pacman', 'Eat, run, take care!', 
    'Help the monkey to escape from the ghosts and to eat as much as possible (the food is really tasty, promise!)', 
    ['Matrixes','Board Games']));
    gProjs.push(createProj('minesweeper', 'Play strategically', 
    'Let this game develop your logical thinking and beware of the mines. But see, this is not the regular Minesweeper game, make use of the special features.', 
    ['Matrixes','Neighbors']));
    gProjs.push(createProj('bookshop', 'Find your favorite books', 
    'Find philosophical classics or add your own books to sell - simply, with just one click!',
    ['MVC','CRUD']));
    gProjs.push(createProj('balloon-Pop', 'Pop the balloons!', 
    'See the balloons rising up and try to pop them. This is not a challenging game...',
    ['Combine JS, HTML and CSS']));

}
function createProj(id, title, desc, labels) {
    return {
        id: id,
        name: id.charAt(0).toUpperCase() + id.slice(1),
        title: title,
        desc: desc,
        url: 'projects/' + id,
        publishedAt: 'May 2020',
        labels: labels
    }

}

function getProjs() {
    return gProjs;
}

function getProjById(projId) {
    return gProjs.find(function (proj) {
        return proj.id === projId;
    })
}