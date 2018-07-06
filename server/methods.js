Meteor.methods({
  'cadastrarVoucher':function(qtde,processo,curso,disciplina,tipoAluno,tipoAvaliacao){
    console.log(qtde)
    var qtdeCadastrado=0;
    for(x=1;x<=qtde;x++){
      sair=true;
      cont=0;
      while(sair && cont!=5){
        num=Math.floor((Math.random() * 5) + 1);
        tmp=Voucher.findOne({numero:num});
        console.log(num,tmp)
        if(tmp==null){
          Voucher.insert({
            numero:num,
            processo:processo,
            curso:curso,
            tipoAluno:tipoAluno,
            tipoAvaliacao,
            disciplina:disciplina
          })
          qtdeCadastrado++;
          sair=false
        }else{
          sair=true;
        }
        cont++;
      }
    }
    return qtdeCadastrado;
  }
})
