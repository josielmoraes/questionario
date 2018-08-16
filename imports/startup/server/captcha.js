import {
  Meteor
} from 'meteor/meteor';

Meteor.startup(function() {

  reCAPTCHA.config({
    privatekey: '6LfjemMUAAAAAG8fkpoZjFx3ClmeENRM5af43oue'
  });
  console.log("ReCaptcha: configurando servidor");;

});
