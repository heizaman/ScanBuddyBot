var builder = require('botbuilder');
var restify = require('restify');


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 32043, function () {
    console.log('%s listening to %s', server.name, server.url);
});


// Create chat bot
var connector = new builder.ChatConnector({
    appId: /*process.env.MICROSOFT_APP_ID*/'7228fde0-293d-4224-8e14-c7a71460fefe',
    appPassword: /*process.env.MICROSOFT_APP_PASSWORD*/'tquXWZ61!>$uxhtBUFZ921>'
});


//Global Option Variables
const ExitOption = 'Exit';
const RegisterComplaintOption = 'Register Complaint';
const GetInfoOption = 'Get info related to this';
const GetContactOption = 'Get contact details';


//Variables
var info = {
	sector: "govt",
	department: "hdfgj",
	domain: "dfjvk",
	address: "fbjfbdjv",
	objno: null,
	objname: "jfjdvjk"
};

var contact = {
	execname: "govt",
	phone: "hdfgj",
	email: "dfjvk",
	address: "fbjfbdjv"
};


var bot = new builder.UniversalBot(connector, [
    function (session) {
    	builder.Prompts.choice(session,
            'Hi! How may i help you?',
            [RegisterComplaintOption, GetInfoOption, GetContactOption, ExitOption],
            { listStyle: builder.ListStyle.button }
        );
    },
    function (session, result) {
        if (result.response) {
            switch (result.response.entity) {
                case RegisterComplaintOption:
                    var result = session.beginDialog('registerComplaint:/');
                    break;
                case GetInfoOption:
                    session.beginDialog('getInfo:/', info);
                    break;
                case GetContactOption:
                    session.beginDialog('getContact:/', contact);
                    break;
                case ExitOption:
                    session.endDialog('Thank You');
                    break;
                default:
            		session.send(`I am sorry but I didn't understand that. I need you to select one of the options below.`);
                    session.reset();
            }
        } else {
            session.send(`I am sorry but I didn't understand that. I need you to select one of the options below.`);
        	session.reset();
        }
    },
    function (session, result) {
        if (result.complaint) {
        	session.send('Your complaint is : ' + result.complaint);
            session.endDialog('Thank You! Your complaint has been registered.');
        }
    }
]);


//Sub-Dialogs
bot.library(require('./dialogs/register-complaint'));
bot.library(require('./dialogs/get-info'));
bot.library(require('./dialogs/get-contact'));


server.post('/api/messages', connector.listen());