module.exports = function(app) {
    var RadixTrie = require('../../lib/radix_trie');
    var bktree = require('../../lib/bk_tree');
    const citiesData = require('../../public/data/cities_canada-usa.json');
    app.locals.citiesData = citiesData;

    var cityNames = citiesData.map(function(a) {return a.name;});

    var trie = new RadixTrie(cityNames);
    var tree = new bktree(cityNames);

    console.log('radix trie', trie.lookup('lon'));
    console.log('bk tree', tree.query('london', 3));
    //app.locals.tree = tree;
}