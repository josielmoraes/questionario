import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
import './formAutoAvalicao'
import './formAvalicaoInstituicao'
import './formAlunoIngressante'
import './formAlunoFormando'
import './formDisciplina'

Template.formEnviar.onCreated(function(){
  $(document).ready(function(){
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
  })
})
Template.formEnviar.events({
  'click #enviar':function(event){
    event.preventDefault();
    var t=98;
    for(x=1;x<=t;x++){
      id="[name=pergunta"+x+"]";
      type=$(id).attr("type");
      if(type=="radio"){
        radio="input[name=pergunta"+x+"]:checked";
        val=$(radio).val();
        console.log(val)
      }else{
        val=$(id).val();
        console.log(id, val)
      }

    }
  }
})
