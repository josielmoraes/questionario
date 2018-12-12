import './formAvaliacaoInstituicao.html'
import '/imports/collection/curso.js'
Template.formAvaliacaoInstituicao.onCreated(function() {
  var self = this;
  var curso;
  self.autorun(function() {
    self.subscribe("buscaProcesso");
    self.subscribe("buscaSemestre");
    self.subscribe("buscaCurso");
    self.subscribe("buscaVoucher");
  })
})
Template.formAvaliacaoInstituicao.helpers({
  nomeCurso() {
    var v = Session.get('voucher');
    if (v != null) {
      var t= Curso.findOne({_id:v.curso});
      return t.nome.toUpperCase();
    }
  },

})
