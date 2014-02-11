﻿// jquery-1.8.0.min.js
/*(import:jquery-1.8.0.min.js)*/
// uritemplate.min.js
/*(import:uritemplate.min.js)*/

// glimpse.jquery.draggable.js
/*(import:glimpse.jquery.draggable.js)*/
// glimpse.jquery.draggable.js
/*(import:glimpse.jquery.dropdown.js)*/

// glimpse.core.js
/*(import:glimpse.core.js)*/

// glimpse.pubsub.js
/*(import:glimpse.pubsub.js)*/
// glimpse.util.js
/*(import:glimpse.util.js)*/
// glimpse.settings.js
/*(import:glimpse.settings.js)*/
// glimpse.data.js
/*(import:glimpse.data.js)*/
// glimpse.element.js
/*(import:glimpse.element.js)*/

// glimpse.system.js
/*(import:glimpse.system.js)*/

// glimpse.render.js
/*(import:glimpse.render.js)*/
// glimpse.render.engine.js
/*(import:glimpse.render.engine.js)*/
// glimpse.render.engine.util.js
/*(import:glimpse.render.engine.util.js)*/
// glimpse.render.engine.util.raw.js
/*(import:glimpse.render.engine.util.raw.js)*/
// glimpse.render.engine.util.table.js
/*(import:glimpse.render.engine.util.table.js)*/
// glimpse.render.engine.style.js
/*(import:glimpse.render.engine.style.js)*/
// glimpse.render.engine.keyvalue.js
/*(import:glimpse.render.engine.keyvalue.js)*/
// glimpse.render.engine.empty.js
/*(import:glimpse.render.engine.empty.js)*/
// glimpse.render.engine.master.js
/*(import:glimpse.render.engine.master.js)*/
// glimpse.render.engine.string.js
/*(import:glimpse.render.engine.string.js)*/
// glimpse.render.engine.layout.js
/*(import:glimpse.render.engine.layout.js)*/
// glimpse.render.engine.table.js
/*(import:glimpse.render.engine.table.js)*/
// glimpse.render.engine.func.js
/*(import:glimpse.render.engine.func.js)*/
// glimpse.render.engine.heading.js
/*(import:glimpse.render.engine.heading.js)*/
// glimpse.render.tab.js
/*(import:glimpse.render.tab.js)*/
// glimpse.render.panel.js
/*(import:glimpse.render.panel.js)*/
// glimpse.render.lazy.js
/*(import:glimpse.render.lazy.js)*/
// glimpse.render.default.js
/*(import:glimpse.render.default.js)*/

// glimpse.shell.controls.js
/*(import:glimpse.shell.controls.js)*/
// glimpse.shell.info.js
/*(import:glimpse.shell.info.js)*/
// glimpse.shell.resize.js
/*(import:glimpse.shell.resize.js)*/
// glimpse.shell.popup.js
/*(import:glimpse.shell.popup.js)*/
// glimpse.shell.title.js
/*(import:glimpse.shell.title.js)*/
// glimpse.shell.correlation.js
/*(import:glimpse.shell.correlation.js)*/
// glimpse.shell.environment.js
/*(import:glimpse.shell.environment.js)*/
// glimpse.shell.path.js
/*(import:glimpse.shell.path.js)*/

// glimpse.shell.notification.js
/*(import:glimpse.shell.notification.js)*/

// glimpse.version.check.js
/*(import:glimpse.version.check.js)*/
// glimpse.version.shell.js
/*(import:glimpse.version.shell.js)*/

// glimpse.paging.js
/*(import:glimpse.paging.js)*/
// glimpse.paging.engine.js
/*(import:glimpse.paging.engine.js)*/
// glimpse.paging.engine.util.js
/*(import:glimpse.paging.engine.util.js)*/
// glimpse.paging.engine.continuous.js
/*(import:glimpse.paging.engine.continuous.js)*/
// glimpse.paging.engine.scrolling.js
/*(import:glimpse.paging.engine.scrolling.js)*/
// glimpse.paging.engine.traditional.js
/*(import:glimpse.paging.engine.traditional.js)*/

// glimpse.tab.js
/*(import:glimpse.tab.js)*/

// glimpse.ajax.js
/*(import:glimpse.ajax.js)*/
// glimpse.history.js
/*(import:glimpse.history.js)*/
// glimpse.timeline.js
/*(import:glimpse.timeline.js)*/
// glimpse.hud.js
/*(import:glimpse.hud.js)*/

// google-code-prettify.js
/*(import:google-code-prettify.js)*/

if (glimpse.extensions) {
    for (var i = 0; i < glimpse.extensions.length; i++)
        glimpse.extensions[i]();
}
glimpse.pubsub.publish('trigger.system.start');
