var builder = require('botbuilder');


const library = new builder.Library('getContact');

library.dialog('/', [
    function (session, contact) {
    	if(contact.execname)
        	session.send('Executive Name: ' + contact.execname);
    	if(contact.phone)
        	session.send('Phone No.: ' + contact.phone);
    	if(contact.email)
        	session.send('Email: ' + contact.email);
    	if(contact.address)
        	session.send('Address: ' + contact.address);
        session.endDialog();
    }
]);


module.exports = library;