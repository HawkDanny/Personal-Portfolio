module.exports = {
    axiom: "",
    ruleset: [],

    //Axiom is a string that contains the seed for the system,
    //and rules is an array of strings that contain any number of rules
    createSystem: function(axiom, rules) {
        this.axiom = axiom;

        this.parseRules(rules);
    },

    parseRules: function(rules) {
        //Loop through the rules provided, and parse them into objects, that are added to ruleset
        for (var i = 0; i < rules.length; i++) {
            var arrowIndex = rules[i].indexOf("->");

            //Use substring to slice up each rule into a target and a rule
            this.ruleset.push({
                target: rules[i].substring(0, arrowIndex),
                rule: rules[i].substring(arrowIndex + 2)
            });
        }
    },

    //The function that should be called by the main method
    runCycles: function(numCycles) {
        for (var i = 0; i < numCycles; i++)
            this.cycle();
    },

    //Runs one iteration of the ruleset
    cycle: function() {
        var temp = this.axiom;
        
        var newString = "";
        //Loop through each letter of the current axiom
        for (var i = 0; i < temp.length; i++) {
            var letter = temp.substring(i, i + 1);

            for (var j = 0; j < this.ruleset.length; j++) {
                //Check if the letter is the same as any rule's target.
                //If it is, brea out of the loop
                if (letter == this.ruleset[j].target) {
                    newString += this.ruleset[j].rule;
                    break;
                }

                //If all rules' targets have been tested, then just add
                //the letter to the new string.
                if (j == this.ruleset.length - 1) {
                    newString += letter;
                }
            }
        }

        this.axiom = newString;
    }
};