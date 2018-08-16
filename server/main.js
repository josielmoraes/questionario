import {
  Meteor
} from 'meteor/meteor';
import '/imports/collection/processo.js'
import './methods.js'
import './publish.js'
import '/imports/collection/semestre.js'
import '/imports/collection/curso.js'
import '/imports/collection/ofertaDisciplina.js'
import '/imports/collection/voucherCollection.js'
import '/imports/startup/server/captcha.js'
import '/imports/collection/formulario.js'
Meteor.startup(function() {
  process.env.MONGO_URL = "mongodb://localhost:27017/projeto"
  //console.log(Processo.find({}).fetch());
  //Voucher.remove({})

});
