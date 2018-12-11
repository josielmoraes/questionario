import './formAvaliacaoInstituicao.html'
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
    if (v.disciplina.Curso != null) {
      return  v.disciplina.Curso.nome.toUpperCase();
    }
  },

})
