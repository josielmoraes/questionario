import './formVoucher'
import '/imports/collection/processo.js'
import '/imports/collection/semestre.js'
import '/imports/collection/curso.js'
import '/imports/collection/ofertaDisciplina.js'
import '/imports/collection/voucherCollection.js'

Template.voucher.onCreated(function(){
    Session.set("tipoAvaliacao",0);
    Session.set('tipoAluno',0);
    Session.set('processoSelecionado',"")
    Session.set('cursoSelecionado',"");
    Session.set('disciplinaSelecionada',"");
  var self=this;

  self.autorun(function(){
    self.subscribe("buscaProcesso");
    self.subscribe("buscaSemestre");
    //self.subscribe("buscaCurso");
    self.subscribe("buscaVoucher");
  })
  Meteor.subscribe("buscaCurso");
})

Template.voucher.helpers({
  buscaProcesso(){
    return Processo.find({})
  },
  imprimirProcesso(val){
    var tmp=Semestre.findOne({});
    if(tmp!=null){
      return tmp.anoLetivo+"/"+tmp.periodoLetivo
    }
  },
  buscaCurso(){
    return Curso.find({});
  },
  tipoAluno(){
    var tmp=  Session.get("tipoAvaliacao");
    if(tmp==2){
      return true;
    }else{
      return false;
    }
  },
  disciplina(){
    var tmp=  Session.get("tipoAvaliacao");
    if(tmp==1){
      return true;
    }else{
      return false;
    }
  },
  semestreSelecionado(){
    var valor=Session.get("processoSelecionado");
    if(valor!=""){
      return true;
    }else {
      return false;
    }
  },
  cursoSelecionado(){
    var valor=Session.get("cursoSelecionado");
    if(valor!=""){
      return true;
    }else {
      return false;
    }
  },
  qtde(){
    var tmp=Session.get('disciplinaSelecionada');
    if(tmp!=""){
      return true;
    }else{
      return false;
    }
  },
  qtde2(){
    var tmp=Session.get('tipoAluno');
    if(tmp!=0){
      return true;
    }else{
      return false;
    }
  },
  validar(currentUser){
    console.log(currentUser);
    if(currentUser!=null){
      if(currentUser.profile.permission==0){
        return true;
      }else{
        return false
      }
    }else{
      return false;
    }
  },
  routerGO(){
    Router.go('home')
  }
})
Template.voucher.events({
  'change .avalicao':function(event){
    event.preventDefault();
    var id=event.target.id;
    Session.set("tipoAvaliacao",event.target.value);
    if(event.target.value==1){
      Session.set('tipoAluno',0);
    }else if(event.target.value==2){
        Session.set('disciplinaSelecionada',"");
    }
  },
  'change #curso':function(event){
    event.preventDefault();
    var valor=$('#curso').val();
    if(valor!=""){
      var tmp=Curso.findOne({_id:valor})
       Session.set('cursoSelecionado',valor);
       $("#disciplinaId").val("");
    }else{
      Session.set('cursoSelecionado',"")
    }
  },
  'change #processo':function(){
    event.preventDefault();
    var valor=$('#processo').val();
    if(valor!=""){
      Session.set('processoSelecionado',valor)
    }else{
        Session.set('processoSelecionado',"")
    }
  },
  'change .aluno':function(event){
    event.preventDefault();
    console.log("tipo aluno",event.target.value);
    Session.set('tipoAluno',event.target.value);
  },

  'click #gerar':function(event){
    event.preventDefault();
    console.log("aaa");
    qtde=$("#qtdeVoucher").val();
    var processo=Session.get('processoSelecionado');
    var tipoAvaliacao=Session.get('tipoAvaliacao');
    tipoAvaliacao=parseInt(tipoAvaliacao);
    if(tipoAvaliacao==1){
      var disciplina=Session.get('disciplinaSelecionada');
      if(disciplina==""){
        $("#disciplinaId").focus()
        return
      }
    }else{
      disciplina="";
    }
    var curso=Session.get('cursoSelecionado');
    var tipoAluno=Session.get('tipoAluno');
    tipoAluno=parseInt(tipoAluno)
    //console.log(processo,tipoAvaliacao,curso,tipoAluno,disciplina)

    var tmp=Meteor.call('cadastrarVoucher',qtde,processo,curso,disciplina,tipoAluno,tipoAvaliacao,function(error, result) {
      alert("Foram gerados "+result+" voucher")
      Session.set("processoSelecionado","")
      $('#processo').val("")
    })

  }
})
Template.discplinaAuto.helpers({
  validarCurso(val){
    console.log(val);
    var curso=Session.get('cursoSelecionado');

    if(val.Curso!=""){
      if(val.Curso._id==curso._id){
        return  true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
})
Template.disciplinaBusca.onCreated(function(){
  var self=this;
  self.autorun(function(){
    self.subscribe("buscaOferta",Session.get('cursoSelecionado'));
  })
})
Template.disciplinaBusca.helpers({
  settingsDisciplina: function() {
    //console.log(Meteor.users)
    return {
      position: Session.get("position"),
      limit: 10,
      rules: [
        {
          token: '',
          collection: ofertaDisciplina,
          field: 'Materia.nomeMateria',
          template: Template.discplinaAuto,
          noMatchTemplate:Template.vazio,

        },
      ],
    }
  },
  'inserirRe':function(){
    setTimeout(function() {
      console.log('teste')
      $('#disciplinaId').attr("required", true);
    },100);
  }

})
Template.disciplinaBusca.events({
  'autocompleteselect #disciplinaId':function(event,template,doc){
    event.preventDefault();
    //console.log(doc)
    Session.set('disciplinaSelecionada',doc);
  }
})
