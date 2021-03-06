Meteor.methods({
  'cadastrarVoucher': function(qtde, processo, curso, disciplina, tipoAluno, tipoAvaliacao) {
    console.log(qtde)
    var qtdeCadastrado = 0;
    var x;
    for (var x = 1; x <= qtde; x++) {
      sair = true;
      cont = 0;
      while (sair && cont != 5) {
        //num=Math.floor((Math.random() * 5) + 1);
        num = numero();
        tmp = Voucher.findOne({
          numero: num,
          validar: false
        });

        console.log('qtde: ', x, " contador: ", cont, ", numero: ", num, ' achado: ', tmp)
        if (tmp == null) {
          Voucher.insert({
            numero: num,
            processo: processo,
            curso: curso,
            tipoAluno: tipoAluno,
            tipoAvaliacao: tipoAvaliacao,
            disciplina: disciplina,
            dados:"",
            validar: false
          })
          qtdeCadastrado++;
          sair = false
        } else {
          sair = true;
        }
        cont++;
      }
    }
    return qtdeCadastrado;
  },
  'captcha': function(recaptcha) {
    var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, recaptcha);
    if (verifyCaptchaResponse.data.success == false) {
      //return false;
      //return verifyCaptchaResponse.data;

      throw new Meteor.Error(400, "Você precisar preencher o CAPTCHA");
    } else {
      //return true;
    }
    return true;
  },
  cadastrarRespostas(tmp, array) {
        Voucher.update({
          _id: tmp._id
        }, {
          $set: {
            validar: true,
            dados:array
          }
        },function(e,r){
          if(e){
            return "Erro ao inserir"
          }else{
            r
          }
        })
    },
    cadastrarLegendas(array){
      for(x in array){
        var tmp=Legenda.findOne({id:array[x].id})
        console.log(tmp);
        if(tmp==null){
          console.log("cadastrar", array[x]);
          Legenda.insert({
            id:array[x].id,
            pergunta:array[x].pergunta,
            respota:array[x].resposta,
          })
        }
      }
    }

})

function numero() {
  var max = 9;
  var min = 1;
  //var num =;
  var array = [];
  var acm = 0
  for (x = 0; x < 5; x++) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min
    array.push(num);
    acm += num
    //console.log(num)
  }
  array.push(acm % 10);
  array.push(acm % 7) //Math.trunc(acm/3));
  var valor = array[0] * 1000000 + array[1] * 100000 + array[2] * 10000 + array[3] * 1000 + array[4] * 100 + array[5] * 10 + array[6] * 1
  return valor;
}
