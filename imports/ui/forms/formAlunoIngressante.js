import './formAlunoIngressante.html'
Template.formAlunoIngressante.events({
  'change .pergunta76':function(event){
    event.preventDefault();
    radio="input[name=pergunta76]:checked";
    if(val==2){
      console.log("entrou");
      $("#pergunta76").attr("disabled",false);
    }else{
      $("#pergunta76").attr("disabled",true);
    }
  }
})
