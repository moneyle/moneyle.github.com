﻿function bookmarksite(a, b) {
    if (document.all) {
        window.external.AddFavorite(b, a);
    } else {
        if (window.sidebar) {
            window.sidebar.addPanel(a, b, "");
        }
    }
}
function setHomepage() {
    var t = 'http://www.moneyle.com/'; if (document.all) { document.body.style.behavior = 'url(#default#homepage)'; document.body.setHomePage(t); } else if (window.sidebar) {
        if (window.netscape) {
            try
{ netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); } catch (e) { alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true"); } 
        } var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch); prefs.setCharPref('browser.startup.homepage', 'http://www.moneyle.com/');
    } 
}