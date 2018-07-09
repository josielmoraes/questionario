import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {
    reCAPTCHA.config({
        sitekey: '6LcvPmMUAAAAAA_CLhGwn5p-BS0UMVt2ZlfIFTXW'
    });
     console.log("ReCaptcha: configurando client");
});
