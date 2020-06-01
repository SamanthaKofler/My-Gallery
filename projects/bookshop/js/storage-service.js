'use strict';

function saveToStorage(key, val) {
    var json = JSON.stringify(val);
    localStorage.setItem(key, json);
    // localStorage.setItem(key, JSON.stringify(val))
    // localStorage[key] = JSON.stringify(val);
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}