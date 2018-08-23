// Radix Trie Implementation
// By Samuel Clay [https://gist.github.com/samuelclay/4674630]

var RadixTrie = function(words) {
    this.T = {};
    this.initialize(words);
};

RadixTrie.prototype = {
    
    initialize: function(words) {
        var self = this;
        words = words || [];
        
        words.forEach(function(word) {
            self.insert(word);
        });
    },
    
    insert: function(word, T) {
        var self = this;
        var l = word.length;
        var prefix;
        word = word && word.toLowerCase();
        T = T || this.T;
        
        // Search for existing prefixes
        while (l--) {
            prefix = word.substr(0, l+1);
            if (T[prefix]) {
                // Found prefix, moving into subtrie
                if (!Object.keys(T[prefix]).length) {
                    // If one word is a pure subset of another word, the prefix 
                    // should also point to the subset.
                    T[prefix][""] = {};
                }
                return this.insert(word.substr(l+1), T[prefix]);
            }
        }
        
        // No prefix found means insert word and check for prefix collision
        var siblings = Object.keys(T);
        l = word.length;
        var siblingFound = siblings.some(function(sibling) {
            var s = 0;
            var commonPrefix;
            
            do {
                if (sibling[s] != word[s]) {
                    if (s > 1) {
                        commonPrefix = sibling.substr(0, s-1);
                    }
                    break;
                }
            } while (s++ < l)
            
            if (commonPrefix) {
                // Rearrange trie to move word with prefix collision into new 
                // common prefix subtrie
                T[commonPrefix] = {};
                self.insert(sibling.substr(s-1), T[commonPrefix]);
                T[commonPrefix][sibling.substr(s-1)] = T[sibling];
                self.insert(word.substr(s-1), T[commonPrefix]);
                delete T[sibling];

                return true;
            }
        });
        
        // No siblings at this level? New branch.
        if (!siblingFound) {
            T[word] = {};
        }
    },
    
    lookup: function(word, limit, T, matchedPrefix) {
        limit = limit || 10;
        T = T || this.T;
        matchedPrefix = matchedPrefix || "";
        word = word && word.toLowerCase();
        var self = this;
        var l = word.length;
        var matches = [];
        
        // Search for existing prefixes and recurseively descend
        while (l--) {
            var prefix = word.substr(0, l+1);
            if (T[prefix]) {
                var suffix = word.substr(l+1);
                return this.lookup(suffix, limit, T[prefix], matchedPrefix + prefix);
            }
        }
        
        // No prefixes means check siblings on this level
        l = word.length;
        var siblings = Object.keys(T);
        var siblingFound = siblings.some(function(sibling) {
            var s = l;
            
            // Node parent is full word, so include all children as matches
            if (!s) {
                var nodeMatches = self.names(T[sibling], limit, matchedPrefix + sibling);
                matches = matches.concat(nodeMatches);
            }
            
            if (matches.length > limit) return true;
            
            // Check all child prefixes for matches
            while (s--) {
                if (sibling.substr(0, s+1) == word.substr(0, s+1)) {
                    var siblingMatches = self.names(T[sibling], limit, matchedPrefix + sibling);
                    matches = matches.concat(siblingMatches);
                    return true;
                }
            }
        });
        
        // Match complete word that has no children
        if (!siblings.length && !word.length) {
            matches.push(matchedPrefix);
        }
        
        if (matches.length > limit) {
            matches = matches.slice(0, limit);
        }
        
        return matches;
    },
    
    // Retrieves all words below a node and helpfully adds the provided 
    // prefix to each word.
    names: function(T, limit, matchedPrefix) {
        T = T || this.T;
        var self = this;
        var keys = Object.keys(T);
        var matches = [];
        matchedPrefix = matchedPrefix || "";
        
        // Recursively descend down to fetch all words
        if (keys.length) {
            keys.some(function(key) {
                if (Object.keys(T[key]).length) {
                    var submatches = self.names(T[key], limit, matchedPrefix + key);
                    matches = matches.concat(submatches);
                } else {
                    matches.push(matchedPrefix + key);
                }
                if (matches.length > limit) {
                    return true;
                }
            });
        } else {
            // No children, so just include self
            matches.push(matchedPrefix);
        }
        
        if (matches.length > limit) {
            matches = matches.slice(0, limit);
        }
        
        return matches;

    }
    
};

// Export for node.js
if (typeof module !== 'undefined') {
    module.exports = {
        RadixTrie: RadixTrie
    };
}