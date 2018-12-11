import {
  Meteor
} from 'meteor/meteor';

Meteor.startup(function() {
  reCAPTCHA.config({
    sitekey: '6LfjemMUAAAAAEdqVsthImzgpBB5JWp2ELJX5WFQ'
  });
  //console.log("ReCaptcha: configurando client");;

  var width = screen.width;
  //alert(width)
});
