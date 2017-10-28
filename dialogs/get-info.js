var builder = require('botbuilder');


const library = new builder.Library('getInfo');

library.dialog('/', [
    function (session, info) {
    	if(info.sector)
        	session.send('Sector: ' + info.sector);
        if(info.department)
        	session.send('Department: ' + info.department);
        if(info.domain)
        	session.send('Domain: ' + info.domain);
        if(info.address)
        	session.send('Address: ' + info.address);
        if(info.objno)
        	session.send('No.: ' + info.objno);
        if(info.objname)
        	session.send('Name: ' + info.objname);
        session.endDialog();
    }
]);


module.exports = library;