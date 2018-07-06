import './formAutoAvaliacao.html'
Template.formAutoAvaliacao.onCreated(function(){
  var self=this;
  var curso;
  self.autorun(function(){
    //self.subscribe("buscaProcesso");
    //self.subscribe("buscaSemestre");
    self.subscribe("buscaCurso");
    //self.subscribe("buscaVoucher");
  })
})
Template.formAutoAvaliacao.helpers({
  nomeCurso(){
    var v=Session.get('voucher');
    if(v!=null){
      curso=Curso.findOne({_id:v.curso})
      return  curso.nome.toUpperCase();
    }
  },
  nomeCurso2(){
    var v=Session.get('voucher');
    if(v!=null){
      curso=Curso.findOne({_id:v.curso})
      return  curso.nome;
    }
  },
})
