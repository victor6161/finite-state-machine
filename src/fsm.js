class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      /*  console.log(config);
        console.log(config.states.normal);
        console.log(config.states.busy);
        console.log(config.states.sleeping);
        console.log(config.states.hungry);*/
        if(config === undefined) throw new Exceptions();
        this.config = config;
        this.state = config.initial;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        console.log('getState' + this.state);

        return this.state;
    }

    /**
     * Goes to specifiedn state.
     * @param state
     */
    changeState(state) {
        console.log("state " + state);
        console.log("this.state " + this.state);
        if(state === 'normal' || state === 'busy'  || state === 'hungry' || state === 'sleeping'){
            this.previousState = this.state;
            this.state = state;
        }else{
            throw new Exceptions();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     *   
     */
    trigger(event) {
        if(this.config.states[this.state].transitions[event] != undefined){
            this.previousState = this.state;
            this.state = this.config.states[this.state].transitions[event];
        }else{
            throw new Exceptions();
        }  
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arr = new Array();
        if(event === undefined){
            for (var i in this.config.states) {
                if (this.config.states.hasOwnProperty(i)) {
                    console.log(i);
                    arr.push(i);
                }
            }
        } else{
            for (var i in this.config.states) {
                if (this.config.states.hasOwnProperty(i)) {
                    if(this.config.states[i].transitions[event]){
                        arr.push(i);
                    }
                }
            }
        }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.previousState === undefined ){
            return false;
        }else{
            this.nextState = this.state;
            this.state = this.previousState;
            this.previousState = undefined;
            return true;
        }    
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.nextState === undefined ){
            return false;
        }else{
            this.state = this.nextState;
            this.nextState = undefined;
            return true;
        } 
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.nextState = undefined;
        this.previousState = undefined;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
