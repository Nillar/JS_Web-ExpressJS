const fs = require('fs');
let storage = {};
let objectLength = 0;

function objectCount() {
    for (let key in storage) {
        if(storage.hasOwnProperty(key)){
            objectLength++;
        }
    }
    return objectLength;
}

function put(key, value) {
    if (typeof(key) !== 'string') {
        console.log('Key must be a string');
        return;
    }

    return storage[key] = value;
}


function get(key) {
    if (storage.hasOwnProperty(key)) {
       return storage[key];
    }
    else {
        return "Key does not exist.";
    }
}

function getAll() {

    objectCount();
    if (objectLength === 0) {
        return 'There are no items in the storage.';

    }
    else {
        return storage;
    }

}

function deleteItem(key) {
    if (storage.hasOwnProperty(key)) {
        delete storage[key];
    }
    else {
        console.log('No such key in the database.')
    }
}

function update(key, value) {
    if (storage.hasOwnProperty(key)) {
        return storage[key] = value;
    }
    else {
        console.log('No such key in database');
    }
}

function clear() {
    storage = {};
    objectLength = 0;
}

function save() {
    fs.writeFileSync('./storage/data.json', JSON.stringify(storage), 'utf-8');
}

function load(callback) {
    fs.readFile('./storage/data.json', 'utf-8', (err, data) => {
        if (err) {
            return;
        }

        storage = JSON.parse(data);
        console.log(callback());
        // console.log(data);
        // console.log(storage);
    })
}


module.exports = {
    put: put,
    get: get,
    getAll: getAll,
    clear: clear,
    save: save,
    load: load,
    delete: deleteItem,
    update: update
};
//
// // get('first');
//
// put('first', 'firstValue');
// put('second', 'secondValue');
// put('third', 'thirdValue');
// put('fouth', 'fourthValue');
//
// getAll(); // objectLength = 4
// update('first', 'updatedFirst');
// deleteItem('second');
//
// save();
// clear(); // objectLength = 0
// getAll();
//
// load();



