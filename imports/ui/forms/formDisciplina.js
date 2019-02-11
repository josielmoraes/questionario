import './formDisciplina.html'
import '/imports/collection/curso.js'
Template.formDisciplina.onCreated(function() {
  var self = this;
  var curso;
  self.autorun(function() {
    self.subscribe("buscaProcesso");
    self.subscribe("buscaSemestre");
    self.subscribe("buscaCurso");
    self.subscribe("buscaVoucher");
  })
})

Template.formDisciplina.helpers({
  nomeCurso() {
      var v = Session.get('voucher');
      if (v!= null) {
        var t= Curso.findOne({_id:v.curso});
        return t.nome.toUpperCase();
      }
  },
  nomeDisciplina() {
    var v = Session.get('voucher');
    if (v.disciplina != "") {
      return v.disciplina.Materia.nomeMateria;
    }
  },
  codigoMateria() {
      var v = Session.get('voucher');
      if (v.disciplina != "") {
        return v.disciplina.Materia.codMateria;
      }
  },
  nomeDocente() {
      var v = Session.get('voucher');
      if (v.disciplina != "") {
        return v.disciplina.Professor.nome
      }
  },
  semestre() {
      var v = Session.get('voucher');
      if (v.disciplina != "") {
        return v.disciplina.Semestre
      }
  }
})
