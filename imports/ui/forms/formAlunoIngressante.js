import './formAlunoIngressante.html'

Template.formAlunoIngressante.onCreated(function() {
  var self = this;
  var curso;
  self.autorun(function() {
    self.subscribe("buscaProcesso");
    self.subscribe("buscaSemestre");
    self.subscribe("buscaCurso");
    self.subscribe("buscaVoucher");
  })

})
Template.formAlunoIngressante.helpers({
  nomeCurso() {
    var v = Session.get('voucher');
    if (v.disciplina.Curso != null) {

      return v.disciplina.Curso.nome.toUpperCase();
    }
  },
  nomeCurso2() {
    var v = Session.get('voucher');
    if (v.disciplina.Curso != null) {

      return v.disciplina.Curso.nome;
    }
  },
  ano() {
    var inicio = 1950;
    var final = 2005;
    var array = new Array();
    array.push("");
    for (x = inicio; x < final; x++) {
      array.push(x);
    }
    return array;
  },
  anoEnsino() {
    var inicio = 1950;
    var final = 2025;
    var array = new Array();
    array.push("");
    for (x = inicio; x < final; x++) {
      array.push(x);
    }
    return array;
  }
})

Template.formAlunoIngressante.events({
  'change .pergunta77': function(event) {
    event.preventDefault();
  /*  radio = "input[name=pergunta77]:checked";
    if (val == 2) {
      console.log("entrou");
      $("#pergunta78").attr("disabled", false);
    } else {
      $("#pergunta78").attr("disabled", true);
    }*/
  },
})
