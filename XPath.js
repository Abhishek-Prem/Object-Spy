document.onclick= function(event) {
    if (event===undefined) event= window.event;                     
    var target= 'target' in event? event.target : event.srcElement; 
	var root= document.compatMode==='CSS1Compat'? document.documentElement : document.body;
    var XPath= getPathTo(target);
	var txyz= getPageXYZ(target);
    localStorage.setItem('XPath', XPath);
}

function getPathTo(element) {
    if (element.id!=='')
        return 'id("'+element.id+'")';
    if (element===document.body)
        return element.tagName;

    var ix= 0;
    var siblings= element.parentNode.childNodes;
    for (var i= 0; i<siblings.length; i++) {
        var sibling= siblings[i];
        if (sibling===element)
            return getPathTo(element.parentNode)+'/'+element.tagName+'['+(ix+1)+']';
        if (sibling.nodeType===1 && sibling.tagName===element.tagName)
            ix++;
    }
}

function getPageXYZ(element) {
    var x= element.getAttribute("id"); y= element.getAttribute("name"); z= element.getAttribute("class");
    return [x, y, z];
}



var XPath=window.localStorage.getItem('XPath');
return XPath;