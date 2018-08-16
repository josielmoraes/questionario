import './formAlunoIngressante.html'

Template.formAlunoIngressante.onCreated(function() {
  var self = this;
  var curso;
  self.autorun(function() {
    //self.subscribe("buscaProcesso");
    //self.subscribe("buscaSemestre");
    //self.subscribe("buscaCurso");
    //self.subscribe("buscaVoucher");
  })

})
Template.formAlunoIngressante.helpers({
  nomeCurso() {
    var v = Session.get('voucher');
    if (v != null) {
      curso = Curso.findOne({
        _id: v.curso
      })
      return curso.nome.toUpperCase();
    }
  },
  nomeCurso2() {
    var v = Session.get('voucher');
    if (v != null) {
      curso = Curso.findOne({
        _id: v.curso
      })
      return curso.nome;
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
  'change .pergunta76': function(event) {
    event.preventDefault();
    radio = "input[name=pergunta76]:checked";
    if (val == 2) {
      console.log("entrou");
      $("#pergunta76").attr("disabled", false);
    } else {
      $("#pergunta76").attr("disabled", true);
    }
  },
})
