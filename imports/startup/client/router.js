import {
  Meteor
} from 'meteor/meteor';
import "/imports/ui/voucher/voucher.js"
var prefix="/questionario";
Router.route(prefix+'/voucher', {
  template: "voucher",
  name: "voucher"
})
Router.route(prefix+'/formulario', {
  template: "formEnviar",
  name: "formEnviar"
})
Router.route(prefix+'/', {
  template: "validarForm",
  name: "home"
})
Router.route(prefix+'/imprimirVoucher', {
  template: "tableVoucher",
})
Router.route(prefix+'/entrar', {
  template: "login",
  name: "login"
})
