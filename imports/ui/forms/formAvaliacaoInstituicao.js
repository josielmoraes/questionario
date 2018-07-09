import './formAvaliacaoInstituicao.html'
Template.formAvaliacaoInstituicao.onCreated(function(){
  var self=this;
  var curso;
  self.autorun(function(){
    //self.subscribe("buscaProcesso");
    //self.subscribe("buscaSemestre");
    //subscribe("buscaCurso");
    //self.subscribe("buscaVoucher");
  })
})
Template.formAvaliacaoInstituicao.helpers({
  nomeCurso(){
    var v=Session.get('voucher');
    if(v!=null){
      curso=Curso.findOne({_id:v.curso})
      return  curso.nome.toUpperCase();
    }
  },

})
