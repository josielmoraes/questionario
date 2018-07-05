import '/imports/collection/processo.js'

Meteor.publish("buscaProcesso",function(){
  return Processo.find({});
})
Meteor.publish("buscaSemestre",function(processo){
  return Semestre.find({})
})
Meteor.publish("buscaCurso",function(){
  return Curso.find({})
})
Meteor.publish('buscaOferta',function(idCurso){
  return ofertaDisciplina.find({'Curso._id':idCurso})
})
Meteor.publish('buscaVoucher',function(){
  return Voucher.find({})
})
