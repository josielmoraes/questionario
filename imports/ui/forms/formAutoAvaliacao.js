import './formAutoAvaliacao.html'
import {
  Session
} from 'meteor/session'

Template.formAutoAvaliacao.onCreated(function() {
  var self = this;
  var curso;
  self.autorun(function() {
    self.subscribe("buscaProcesso");
    self.subscribe("buscaSemestre");
    self.subscribe("buscaCurso");
    self.subscribe("buscaVoucher");
  })
})
Template.formAutoAvaliacao.helpers({
  nomeCurso() {
    var v = Session.get('voucher');
    if (v != null) {
      return v.disciplina.Curso.nome.toUpperCase();
    }
  },
  nomeCurso2() {
    var v = Session.get('voucher');
    if (v != null) {
      return v.disciplina.Curso.nome;
    }
  },
})
