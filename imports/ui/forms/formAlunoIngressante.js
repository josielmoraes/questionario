import './formAlunoIngressante.html'
import '/imports/collection/curso.js'
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
    if (v!= null) {
      var t= Curso.findOne({_id:v.curso});
      return t.nome.toUpperCase();
    }
  },
  nomeCurso2() {
    var v = Session.get('voucher');
    if (v!= null) {
      var t= Curso.findOne({_id:v.curso});
      return t.nome;
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
  'change .pergunta79': function(event) {
    event.preventDefault();
    radio = "input[name=pergunta79]:checked";
    val=$(radio).val();
    if (val == 1) {
      console.log("entrou");
      $("#pergunta80").attr("disabled", false);
    } else {
      $("#pergunta80").attr("disabled", true);
    }
  },
})
