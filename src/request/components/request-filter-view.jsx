'use strict';

var glimpse = require('glimpse');
var React = require('react');
var LinkedStateMixin = React.addons.LinkedStateMixin;

module.exports = React.createClass({
    mixins: [ LinkedStateMixin ],
    getInitialState: function () {
        return {
            uri: '',
            method: '',
            contentType: '',
            statusCode: ''
        };
    },
    render: function () {
        return (
            <div className="request-session-holder">
                <h2>Filter</h2>
                <div>
                    <label htmlFor="request-fitler-uri">Uri</label><br />
                    <input type="text" id="request-fitler-uri" valueLink={this.linkState('uri')} />
                </div><br />
                <div>
                    <label htmlFor="request-fitler-method">Method</label><br />
                    <input type="text" id="request-fitler-method" valueLink={this.linkState('method')} />
                </div><br />
                <div>
                    <label htmlFor="request-fitler-contentType">Content Type</label><br />
                    <input type="text" id="request-fitler-contentType" valueLink={this.linkState('contentType')} />
                </div><br />
                <div>
                    <label htmlFor="request-fitler-statusCode">Status Code</label><br />
                    <input type="text" id="request-fitler-statusCode" valueLink={this.linkState('statusCode')} />
                </div><br />
                <input type="button" value="Filter" onClick={this._onFilter} />
                <input type="button" value="Clear" onClick={this._onClear} />
            </div>
        );
    },
    _onFilter: function () {
        glimpse.emit('shell.request.filter.updated', this.state);
    },
    _onClear: function () {
        var resetState = this.getInitialState();
        this.setState(resetState);

        glimpse.emit('shell.request.filter.updated', resetState);
    }
});
