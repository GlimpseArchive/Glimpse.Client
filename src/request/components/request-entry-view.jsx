var glimpse = require('glimpse'),
    React = require('react'),
    entryList = require('./request-entry-list-view.js'),
    entryStore = require('../stores/request-entry-store.js');

function allEntryState() {
    return {
        allEntries: entryStore.getAllFor(1111111) // TODO: Need to update here
    };
}

module.exports = React.createClass({
    getInitialState: function() {
        return allEntryState();
    },
    componentDidMount: function() {
        this._entryChangedOn = glimpse.on('shell.request.entry.changed', this._entryChanged);
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
    _entryChanged: function() {
        this.setState(allEntryState());
    }
});
