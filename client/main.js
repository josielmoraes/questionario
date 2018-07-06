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
//MONGO_URL=mongodb://localhost:27017/projeto meteor run

Template.formEnviar.onCreated(function(){
  //console.log(this.view.name);
  /*
  $( window ).on( "load", function() {
  //setTimeout(function(){
      var inicio=1950;
      var final=2020;
      elemento = document.getElementById("pergunta64");
      option = document.createElement( 'option' );
      option.value = option.text = "";
      elemento.add(option)
      for(x=inicio;x<final;x++){
        option = document.createElement( 'option' );
        option.value = option.text = x;
        elemento.add(option)
      }

      elemento = document.getElementById("pergunta67");
      option = document.createElement( 'option' );
      option.value = option.text = "";
      elemento.add(option)
      for(x=inicio;x<final;x++){
        option = document.createElement( 'option' );
        option.value = option.text = x;
        elemento.add(option)
      }


      inicio=2017;
      final=2025;
      elemento = document.getElementById("pergunta79");
      option = document.createElement( 'option' );
      option.value = option.text = "";
      elemento.add(option)
      for(x=inicio;x<final;x++){
        option = document.createElement( 'option' );
        option.value = option.text = x;
        elemento.add(option)
      }
    //},200)
    })
    */
})
Template.formEnviar.events({
  'click #enviar':function(event){
    event.preventDefault();
    var t=98;
    for(x=1;x<=t;x++){
      id="[name=pergunta"+x+"]";

      tag=$(id).prop("tagName");
      console.log(tag);
      if(tag=="INPUT"){
        type=$(id).attr("type");
        if(type=="radio"){
          radio="input[name=pergunta"+x+"]:checked";
          val=$(radio).val();
          //console.log(val)
        }else if(type=="text") {
          val=$(id).val();
          //console.log(id, val)
        }
      }else if(tag=="SELECT"){
        a=$(id).attr("id");
        console.log(a);
      }else if(tag=="TEXTAREA"){
        a=$(id).attr("id");
        //console.log(a);
      }

    }
  }
})
Template.validarForm.onCreated(function(){
  var self=this;
  Session.set('voucher',"");
  self.autorun(function(){
    self.subscribe("buscaVoucher");
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
