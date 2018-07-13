import { Meteor } from 'meteor/meteor';
import "/imports/ui/voucher/voucher.js"

Router.route('/voucher',{
  template:"voucher",
  name:"voucher"
})
Router.route('/formulario',{
  template:"formEnviar",
})
Router.route('/',{
  template:"validarForm",
  name:"home"
})
Router.route('/imprimirVoucher',{
  template:"tableVoucher",
})
Router.route('/entrar',{
  template:"login",
  name:"login"
})
