import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
import '/imports/ui/startup/router.js'
import '/imports/ui/forms/formDisciplina.js'
import  "/imports/ui/forms/formAlunoFormando.js"
import "/imports/ui/forms/formAlunoIngressante.js"
import '/imports/ui/forms/formAutoAvaliacao.js'
import '/imports/ui/forms/formAvaliacaoInstituicao.js'
import '/imports/collection/voucherCollection.js'
import '/imports/ui/voucher/imprimirVoucher.js'
//MONGO_URL=mongodb://localhost:27017/projeto meteor run

Template.formEnviar.onCreated(function(){

})
Template.formEnviar.helpers({
  tipoQuestionario(){
    var tmp=Session.get('voucher');
    if(tmp.tipoAvaliacao==1){
      return true;
    }else{
      return false;
    }
  },
  tipoAluno(){
    var tmp=Session.get('voucher');
    if(tmp.tipoAluno==1 || tmp.tipoAluno==2){
      return true;
    }else{
      return false;
    }
  },
  tipoAluno2(){
    var tmp=Session.get('voucher');
    if(tmp.tipoAluno==1){
      return true;
    }else{
      return false;
    }
  }
})
Template.formEnviar.events({
  'click #enviar':function(event){
    event.preventDefault();
    var t=94;
    var array=[];
    for(x=1;x<=t;x++){
      id="[name=pergunta"+x+"]";
      tag=$(id).prop("tagName");
      if(tag=="INPUT"){
        type=$(id).attr("type");
        if(type=="radio"){
          radio="input[name=pergunta"+x+"]:checked";
          val=$(radio).val();
          if(val==null){
            $(id).focus();
            //return;
          }else{
            array.push({pergunta:x, resposta:val})
          }
        }else if(type=="text") {
          val=$(id).val();
          if(val==""){
            $(id).focus();
            //return;
          }else{
            array.push({pergunta:x, resposta:val})
          }
        }
      }else if(tag=="SELECT"){
        a=$(id).attr("id");
        val=$(id).val();
        if(val==""){
          $(id).focus();
          //return;
        }else{
          array.push({pergunta:x, resposta:val})
        }
      }else if(tag=="TEXTAREA"){
        a=$(id).attr("id");
        val=$(id).val();
        array.push({pergunta:x, resposta:val})
      }
    }
    console.log(array)
  }
})
Template.validarForm.onCreated(function(){
  var self=this;
  Session.set('voucher',"");
  Meteor.subscribe("buscaCurso");
  self.autorun(function(){
    self.subscribe("buscaVoucher");
    self.subscribe("buscaCurso");
  })
})
Template.validarForm.events({
  'click #validar':function(event){
    event.preventDefault();
    var num=$("#voucher").val();
    num=parseInt(num)
    var tmp=Voucher.findOne({numero:num});
    if(tmp!=null){
      Session.set('voucher',tmp);
      Router.go('/formulario');
    }
  }
})
