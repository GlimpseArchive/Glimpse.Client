require('../stores/request-entry-store.js');

var glimpse = require('glimpse'),
    React = require('react'),
    entryList = require('./request-entry-list-view.jsx');

function getState(allEntries) {
    return {
        allEntries: allEntries || []
    };
}

module.exports = React.createClass({
    getInitialState: function() {
        return getState();
    },
    // TODO: Get rid of this boiler plate code via a mixin
    componentDidMount: function() {
        this._entryChangedOn = glimpse.on('shell.request.summary.changed', this._entryChanged);
    },
    componentWillUnmount: function() {
        glimpse.off(this._entryChangedOn);
    },
    render: function() {
        return (
            <div className="request-entry-holder">
                <h2>Request</h2>
                <entryList allEntries={this.state.allEntries} />
            </div>
        );
    },
    _entryChanged: function(allEntries) {
        this.setState(getState(allEntries));
    }
});
