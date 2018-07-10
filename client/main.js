import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'
import './main.html';
import '/imports/startup/client/router.js'
import '/imports/ui/forms/formDisciplina.js'
import  "/imports/ui/forms/formAlunoFormando.js"
import "/imports/ui/forms/formAlunoIngressante.js"
import '/imports/ui/forms/formAutoAvaliacao.js'
import '/imports/ui/forms/formAvaliacaoInstituicao.js'
import '/imports/collection/voucherCollection.js'
import '/imports/ui/voucher/imprimirVoucher.js'
import '/imports/startup/client/captcha.js'
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
  },

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
  },

})
Template.validarForm.onCreated(function(){
  var self=this;
  Session.setPersistent('voucher',"");
  Meteor.subscribe("buscaCurso");
  self.autorun(function(){
    self.subscribe("buscaVoucher");
    self.subscribe("buscaCurso");
  })
})
Template.validarForm.helpers({
  validar(currentUser){
    console.log(currentUser)
    if(currentUser!=null){
      return true;
    }else{
      return false;
    }
  }
})
Template.validarForm.events({
  'click #validar':function(event){
    event.preventDefault();
    var num=$("#voucher").val();
    num=parseInt(num)
    var tmp=Voucher.findOne({numero:num});
    if(tmp!=null){

      if(tmp.validar==false){
        var re=$('#g-recaptcha-response').val();
        console.log(re)
        Meteor.call('captcha',re,function(e,r){
          if(e){
            console.log(e.reason)
          }else{
            console.log(r)
            Session.setPersistent('voucher',tmp);
            Router.go('/formulario');
          }
        });

      }else{
        alert('Voucher já utilizado')
      }
    }else{
      alert('Voucher não cadastrado')
    }
  },
  'click #entrar':function(event){
    event.preventDefault();
    console.log("entrar")
    email=$("#email").val();
    senha=$("#psw").val();
    Meteor.loginWithPassword(email,senha, function(e,r){
      if(e){
        console.log(e);
        aler("Usuário ou senha não conferem")
      }else{
        console.log(r);
        console.log('teste')
        Router.go('/')
      }
    })

  }
})
