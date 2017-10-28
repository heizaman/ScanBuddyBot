var builder = require('botbuilder');


const library = new builder.Library('registerComplaint');

library.dialog('/', [
    function (session) {
        builder.Prompts.text(session, 'Please enter your complaint:');
    },
    function (session, results) {
        session.endDialogWithResult({ complaint: results.response, resumed: builder.ResumeReason.completed });
    }
]).cancelAction('cancel', 'Complaint not registered!', { matches: /^cancel/i });


module.exports = library;