import { Meteor } from 'meteor/meteor';
import '/imports/collection/processo.js'
import './methods.js'
import './publish.js'
import '/imports/collection/semestre.js'
import '/imports/collection/curso.js'
import '/imports/collection/ofertaDisciplina.js'
import '/imports/collection/voucherCollection.js'
Meteor.startup(() => {
    console.log(Processo.find({}).fetch());
    //Voucher.remove({})
});
