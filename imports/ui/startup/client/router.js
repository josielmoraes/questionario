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
})
Router.route('/imprimirVoucher',{
  template:"tableVoucher",
})
