//used to specify the ranges that will be used to determine the color palette
var ColorRange = {
    GRAY : 0,
    PASTEL : 1,
    READABLE_WHITE : 2,
    READABLE_BLACK : 3,
    RED : 4,
    ORANGE : 5,
    YELLOW : 6,
    GREEN : 7,
    BLUE : 8,
    INDIGO : 9,
    VIOLET : 10,
    PINK : 11
};
Object.freeze(ColorRange); //makes ColorRange constant

var proColor = (function() {

    //list of object that contain the color range information for each palette
    var colorList = new Array();

    //Sets the values of colorList
    function _init() {
        //GRAY
        colorList[0] = {
            minH: 0,
            maxH: 0,
            minS: 0,
            maxS: 0,
            minL: 0,
            maxL: 0
        };

        //PASTEL
        colorList[1] = {
            minH: 0,
            maxH: 0,
            minS: 0,
            maxS: 0,
            minL: 0,
            maxL: 0
        };

        //READABLE_WHITE
        colorList[2] = {
            minH: 0,
            maxH: 0,
            minS: 0,
            maxS: 0,
            minL: 0,
            maxL: 0
        };

        //READABLE_BLACK
        colorList[3] = {
            minH: 0,
            maxH: 0,
            minS: 0,
            maxS: 0,
            minL: 0,
            maxL: 0
        };

        //RED
        colorList[4] = {
            minH: 330,
            maxH: 15,
            minS: 50,
            maxS: 100,
            minL: 40,
            maxL: 60
        };
        
        //ORANGE
        colorList[5] = {
            minH: 15,
            maxH: 35,
            minS: 50,
            maxS: 100,
            minL: 40,
            maxL: 60
        };

        //YELLOW
        colorList[6] = {
            minH: 35,
            maxH: 60,
            minS: 50,
            maxS: 100,
            minL: 40,
            maxL: 60
        };

        //GREEN
        colorList[7] = {
            minH: 60,
            maxH: 140,
            minS: 50,
            maxS: 100,
            minL: 40,
            maxL: 60
        };

        //BLUE
        colorList[8] = {
            minH: 140,
            maxH: 245,
            minS: 50,
            maxS: 100,
            minL: 40,
            maxL: 60
        };

        //INDIGO
        colorList[9] = {
            minH: 245,
            maxH: 255,
            minS: 50,
            maxS: 100,
            minL: 40,
            maxL: 60
        };

        //VIOLET
        colorList[10] = {
            minH: 255,
            maxH: 270,
            minS: 50,
            maxS: 100,
            minL: 40,
            maxL: 60
        };

        //PINK
        colorList[11] = {
            minH: 270,
            maxH: 330,
            minS: 50,
            maxS: 100,
            minL: 40,
            maxL: 60
        };
    }

    //returns a random color in the range of the given enum, already formatted properly
    //colorRangeVal a ColorRange enum value
    function _colorFromRange(colorRangeVal) {
        var h, s, l;
        var hRange = colorList[colorRangeVal].maxH - colorList[colorRangeVal].minH;
        var sRange = colorList[colorRangeVal].maxS - colorList[colorRangeVal].minS;
        var lRange = colorList[colorRangeVal].maxL - colorList[colorRangeVal].minL;

        h = Math.round(colorList[colorRangeVal].minH + (Math.random() * hRange));
        s = Math.round(colorList[colorRangeVal].minS + (Math.random() * sRange));
        l = Math.round(colorList[colorRangeVal].minL + (Math.random() * lRange));

        return "hsl(" + h + ", " + s + "%, " + l + "%)";
    }

    //returns the darkest color in the range of the given enum, already formatted properly
    //colorRangeVal a ColorRange enum value
    function _darkest(colorRangeVal) {
        var h, s, l;
        var hRange = colorList[colorRangeVal].maxH - colorList[colorRangeVal].minH;
        var sRange = colorList[colorRangeVal].maxS - colorList[colorRangeVal].minS;
        var lRange = colorList[colorRangeVal].maxL - colorList[colorRangeVal].minL;

        h = colorList[colorRangeVal].minH + (Math.random() * hRange);
        s = colorList[colorRangeVal].minS + (Math.random() * sRange);
        l = colorList[colorRangeVal].minL;

        return "hsl(" + h + ", " + s + "%, " + l + "%)";
    }

    //returns the lightest color in the range of the given enum, alread formatted properly
    //colorRangeVal a ColorRange enum value
    function _lightest(colorRangeVal) {
        var h, s, l;
        var hRange = colorList[colorRangeVal].maxH - colorList[colorRangeVal].minH;
        var sRange = colorList[colorRangeVal].maxS - colorList[colorRangeVal].minS;
        var lRange = colorList[colorRangeVal].maxL - colorList[colorRangeVal].minL;

        h = colorList[colorRangeVal].minH + (Math.random() * hRange);
        s = colorList[colorRangeVal].minS + (Math.random() * sRange);
        l = colorList[colorRangeVal].maxL;

        return "hsl(" + h + ", " + s + "%, " + l + "%)";
    }

    return {
        init: _init,
        colorFromRange: _colorFromRange,
        darkest: _darkest,
        lightest: _lightest
    };
}());