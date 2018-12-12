import './formAlunoFormando.html'
import '/imports/collection/curso.js'
Template.formAlunoFormando.onCreated(function() {
  var self = this;
  var curso;
  self.autorun(function() {
    self.subscribe("buscaProcesso");
    self.subscribe("buscaSemestre");
    self.subscribe("buscaCurso");
    self.subscribe("buscaVoucher");
  })

})
Template.formAlunoFormando.helpers({
  nomeCurso() {
      var v = Session.get('voucher');
      if (v  != null) {
        var t= Curso.findOne({_id:v.curso});
        return t.nome;
      }
  },
  ano() {

      var inicio = 2015;
      var final = 2030;
      var array = new Array();
      array.push(" ");
      for (x = inicio; x <= final; x++) {
        array.push(x);
      }

      return array;

  }
})
