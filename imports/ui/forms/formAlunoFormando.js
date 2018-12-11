import './formAlunoFormando.html'
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
      if (v.disciplina  != null) {
        return v.disciplina.Curso.nome
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
