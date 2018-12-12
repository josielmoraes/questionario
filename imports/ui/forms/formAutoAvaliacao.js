import './formAutoAvaliacao.html'
import '/imports/collection/curso.js'
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
      var t= Curso.findOne({_id:v.curso});
      return t.nome.toUpperCase();
      //return v.disciplina.Curso.nome.toUpperCase();
    }
  },
  nomeCurso2() {
    var v = Session.get('voucher');
    if (v != null) {
      var t= Curso.findOne({_id:v.curso});
      return t.nome
    }
  },
})
