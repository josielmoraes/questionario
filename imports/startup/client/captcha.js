import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {
  reCAPTCHA.config({
      sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
  });
     console.log("ReCaptcha: configurando client");
});
