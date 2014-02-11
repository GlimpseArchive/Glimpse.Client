glimpse.render.engine.util.table = (function($, util) {
    var factories = {
            array: {
                isHandled: function (data) {
                    var valid = data.length > 0;
                    for (var i = 0; i < data.length; i++) {
                        if (!$.isArray(data[i])) {
                            valid = false;
                            break;
                        }
                    }
                    return valid;
                },
                getHeader: function(data) {
                    return data[0];
                },
                getRowClass: function(data, rowIndex) {
                    return data[rowIndex] && data[rowIndex].length > data[0].length ? ' ' + data[rowIndex][data[rowIndex].length - 1] : '';
                },
                getRowValue: function(dataRow, fieldIndex, header) {
                    return dataRow[fieldIndex];
                },
                getHeaderValue: function(header, fieldIndex) {
                    return header[fieldIndex];
                },
                startingIndex: function() {
                    return 1;
                }
            },
            object: {
                isHandled: function (data) {
                    var valid = data.length > 0;
                    for (var i = 0; i < data.length; i++) {
                        if ($.isArray(data[i]) || data[i] !== Object(data[i])) {
                            valid = false;
                            break;
                        }
                    }
                    return valid; 
                },
                getHeader: function(data) {
                    var result = [];
                    for (var key in data[0]) {
                        if (key != "_metadata")
                            result.push(key);
                    }
                    return result;
                },
                getRowClass: function(data, rowIndex) {
                    return data[rowIndex] && data[rowIndex]._metadata && data[rowIndex]._metadata.style ? ' ' + data[rowIndex]._metadata.style : '';
                },
                getRowValue: function(dataRow, fieldIndex, header) {
                    return dataRow[header[fieldIndex]];
                },
                getHeaderValue: function (header, fieldIndex) {
                    return util.processCasing(header[fieldIndex]);
                },
                startingIndex: function() {
                    return 0;
                }
            },
            other: {
                isHandled: function(data) {
                    return true;
                },
                getHeader: function(data) {
                    return ["Values"];
                },
                getRowClass: function(data, rowIndex) {
                    return '';
                },
                getRowValue: function(dataRow, fieldIndex, header) {
                    return dataRow;
                },
                getHeaderValue: function (header, fieldIndex) {
                    return header[fieldIndex];
                },
                startingIndex: function() {
                    return 0;
                }
            }
        };

    return {
        findFactory: function(data) {
                var match = null;
                for (var key in factories) {
                    if (factories[key].isHandled(data)) {
                        match = factories[key];
                        break;
                    }
                }
                return match;
            }
        };
})(jQueryGlimpse, glimpse.util);
