import './imprimirVoucher.html';
Template.tableVoucher.onCreated(function(){
    Session.set("tipoAvaliacao",0);
    Session.set('tipoAluno',0);
    Session.set('processoSelecionado',"")
    Session.set('cursoSelecionado',"");
    Session.set('disciplinaSelecionada',"");
    Session.set('imprimirVoucher',"");
  var self=this;

  self.autorun(function(){
    self.subscribe("buscaProcesso");
    self.subscribe("buscaSemestre");
    //self.subscribe("buscaCurso");
    self.subscribe("buscaVoucher");
  })
  Meteor.subscribe("buscaCurso");
})

Template.tableVoucher.helpers({
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
  valorInput(){
    var processo=Session.get('processoSelecionado');
    var tipoAvaliacao=Session.get('tipoAvaliacao');
    tipoAvaliacao=parseInt(tipoAvaliacao);
    if(tipoAvaliacao==1){
      var disciplina=Session.get('disciplinaSelecionada');
      var tmp=Voucher.find({processo:processo,tipoAvaliacao:tipoAvaliacao,disciplina:disciplina,validar:false}).fetch();
      Session.set('imprimirVoucher',tmp);
      return tmp.length;
    }else if(tipoAvaliacao==2){
      var tipoAluno=Session.get('tipoAluno');
      tipoAluno=parseInt(tipoAluno)
      //console.log("processo: ",processo,"tipoAvaliacao: ",tipoAvaliacao,"tipoAluno:",tipoAluno)
      var tmp=Voucher.find({processo:processo,tipoAvaliacao:tipoAvaliacao,tipoAluno:tipoAluno,validar:false}).fetch();
      Session.set('imprimirVoucher',tmp);
      return tmp.length;
    }

  },
  validar(currentUser){
    if(currentUser==null){
      return false
    }else{
      return true;
    }
  },
  routerGO(){
    Router.go('home')
  }

})
Template.tableVoucher.events({
  'change .avalicao':function(event){
    event.preventDefault();
    var id=event.target.id;
    Session.set("tipoAvaliacao",event.target.value);

  },
  'change #curso':function(event){
    event.preventDefault();
    var valor=$('#curso').val();
    if(valor!=""){
      var tmp=Curso.findOne({_id:valor})
       Session.set('cursoSelecionado',valor)
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
    Session.set('tipoAluno',event.target.value);
  },
  'click #imprimir':function(event){
    event.preventDefault();
    var num=Session.get('imprimirVoucher');
    var cont=$("#qtdeVoucher").val();
    var tipo=Session.get('tipoAvaliacao');

    var string=""
    var curso=Session.get('cursoSelecionado');
    if(curso!=""){
      aux=Curso.findOne({_id:curso});
      string=aux.nome+"\n";
    }
    if(tipo==1){
      var dis=Session.get('disciplinaSelecionada')
      string+="Avaliação da disciplina "+dis.Materia.nomeMateria+"\n";
    }else if(tipo==2){
      string+="AutoAvaliacao e Institucional "
      var aluno=Session.get("tipoAluno");
      if(aluno==1){
        string+="para aluno ingressante";
      }else if(aluno==2){
        string+="para aluno formando";
      }
      string+='\n'
    }
    if(cont>0){
      var dados=""
      for(x=0;x<cont;x++){
        dados+=string;
        dados+="Código: ";
        dados+=num[x].numero;
        dados+="\n\n"
      }
      //console.log(dados);
      var doc={
        content:[
          dados
        ]
      }
      //console.log(doc)
      pdfMake.createPdf(doc).download('Voucher.pdf');
    }else{
      alert("Selecione uma quantidade maior que zero")
    }

  }
})
