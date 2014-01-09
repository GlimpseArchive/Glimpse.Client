glimpse.util = (function($) { 
    var connectionNotice = function(scope) {
            var that = (this === window) ? {} : this;
            that.scope = scope;
            that.text = scope.find('span');
            return that;
        }; 

    connectionNotice.prototype = {
        connected : false, 
        prePoll : function () {
            var that = this;
            if (!that.connected) { 
                that.text.text('Connecting...'); 
                that.scope.removeClass('glimpse-connect').addClass('glimpse-disconnect');
            }
        },
        complete : function (textStatus) {
            var that = this;
            if (textStatus != "success") {
                that.connected = false;
                that.text.text('Disconnected...');
                that.scope.removeClass('glimpse-connect').addClass('glimpse-disconnect');
            }
            else {
                that.connected = true;
                that.text.text('Connected...');
                that.scope.removeClass('glimpse-disconnect').addClass('glimpse-connect');
            }
        }
    };
     
    return {
        cookie : function (key, value, days) {
            if (arguments.length > 1) { 
                value = $.isPlainObject(value) ? JSON.stringify(value) : String(value);
        
		        var date = new Date();
                date.setDate(date.getDate() + days || 1000);
        
	            document.cookie = key + "=" + encodeURIComponent(value) + "; expires=" + date.toGMTString() + "; path=/";
                return;
            }
     
	        key += "=";
	        var ca = document.cookie.split(';');
	        for (var i = 0; i < ca.length; i++) {
		        var c = ca[i];
		        while (c.charAt(0) == ' ') 
		            c = c.substring(1, c.length);
		        if (c.indexOf(key) == 0) 
		            return JSON.parse(decodeURIComponent(c.substring(key.length, c.length)));
	        }
        },
        localStorage: function (key, value) {
            if (arguments.length == 1)
                return JSON.parse(localStorage.getItem(key));
            localStorage.setItem(key, JSON.stringify(value)); 
        },
        htmlEncode: function (value) {
            return !(value == null) ? value.replace(/&/g, '&amp;').replace(/"/g, '&#x34;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
        },
        jsEncode: function (value) {
            return !(value == null) ? value.replace(/\\/g, '\\\\').replace(/"/g, '\"') : '';
        },
        preserveWhitespace: function (value) {
            if (value != null && typeof value !== "string")
                value = value.toString();
            if (!value)
                return '';
            return value.replace(/\r\n/g, '<br />').replace(/\n/g, '<br />').replace(/\t/g, '&#xa0; &#xa0; ').replace(/  /g, '&#xa0; ');
        },
        lengthJson: function (data) {
            var count = 0;
            if (data === Object(data))
                for (var key in data) { count++; };
            return count;
        }, 
        uriTemplate: function (uri, data) {
            if (uri == null)
                return '';
            return UriTemplate.parse(uri).expand(data || {});
        },
        getDomain: function (uri) {
            if (uri.indexOf('://') > -1)
                uri = uri.split('://')[1];
            return uri.split('/')[0];
        },
        sortTabs: function (data) {
            var sorted = {},
                i, temp = [];
            
            for (i in data)
                temp.push({ id: i, name: data[i].name });
            temp.sort(function(a, b) {
                return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            });
            for (i = 0; i < temp.length; i++)
                sorted[temp[i].id] = data[temp[i].id];
            return sorted;
        },
        containsTokens: function(formatString) {
            return formatString != null && !$.isNumeric(formatString) && formatString.indexOf('{{') > -1;
        },
        getTokens: function(formatString) { 
            var count = 0, working = '', result = [];
            for (var i = 0; i < formatString.length; i++) {
                var x = formatString[i];
                
                if (count <= 2) { 
                    if (x == '{')
                        count++;
                    else if (x == '}' && count > 0)
                        count--;
                    else if (count == 2) 
                        working += '' + x; 
                    else {
                        count = 0;
                        working = '';
                    }

                    if (count == 0 && working != '') {
                        result.push(working);
                        working = '';
                    }
                } 
            }
            return result;
        },
        connectionNotice: function(scope) {
            return new connectionNotice(scope); 
        },
        timeConvert : function(value) {
            if (value < 1000)
                return value.toFixed(1) + ' ms';
            return Math.round(value / 10) / 100 + ' s';
        },
        processCasing : function (data) {
            var result = '',
                previous = '',
                blacklist = [ ' ', '-', '/', '_' ];
            if (data == null)
                return data;
            for (var i = 0; i < data.length; i++) {
                var current = data[i],
                    next = data[i + 1];
                if (blacklist.indexOf(current) > -1)
                    return data;

                if (i == 0 || ((jQueryGlimpse.isNumeric(previous) && !jQueryGlimpse.isNumeric(current)) || (!jQueryGlimpse.isNumeric(previous) && jQueryGlimpse.isNumeric(current)) || (!jQueryGlimpse.isNumeric(current) && current.toUpperCase() == current && (previous.toUpperCase() != previous || (next && next.toUpperCase() != next)))))
                    result = i == 0 ? current.toUpperCase() : result + ' ' + current.toUpperCase();
                else
                    result += current;

                previous = current;
            }

            return result;
        }
    };
})(jQueryGlimpse);
