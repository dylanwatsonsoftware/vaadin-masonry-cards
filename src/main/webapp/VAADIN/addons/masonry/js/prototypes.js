/** Setup indexOf and contains methods **/
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, fromIndex) {
        if (fromIndex == null) {
            fromIndex = 0;
        } else if (fromIndex < 0) {
            fromIndex = Math.max(0, this.length + fromIndex);
        }
        for (var i = fromIndex, j = this.length; i < j; i++) {
            if (this[i] === obj) return i;
        }
        return -1;
    };
}

Array.prototype.contains = function (obj) {
    return (this.indexOf(obj) != -1);
};

Array.prototype.removeAll = function(key){
    var index = this.indexOf(key);

    if(index === -1) return;

    this.splice(index, 1);
    this.removeAll(key);
};