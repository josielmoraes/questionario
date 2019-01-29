import './imprimirVoucher.html';



function convertToPdf(svgArray, callback) {




};



Template.tableVoucher.onCreated(function() {
  setTimeout(function() {
    // Get the Object by ID

  }, 8000);
  Session.set("tipoAvaliacao", 0);
  Session.set('tipoAluno', 0);
  Session.set('processoSelecionado', "")
  Session.set('cursoSelecionado', "");
  Session.set('disciplinaSelecionada', "");
  Session.set('imprimirVoucher', "");
  var self = this;

  self.autorun(function() {
    self.subscribe("buscaProcesso");
    self.subscribe("buscaSemestre");
    //self.subscribe("buscaCurso");
    self.subscribe("buscaVoucher");
  })
  Meteor.subscribe("buscaCurso");
})

Template.tableVoucher.helpers({
  tmp() {

  },
  buscaProcesso() {
    return Processo.find({})
  },
  imprimirProcesso(val) {
    var tmp = Semestre.findOne({});
    if (tmp != null) {
      return tmp.anoLetivo + "/" + tmp.periodoLetivo
    }
  },
  buscaCurso() {
    return Curso.find({});
  },
  tipoAluno() {
    var tmp = Session.get("tipoAvaliacao");
    if (tmp == 2) {
      return true;
    } else {
      return false;
    }
  },
  disciplina() {
    var tmp = Session.get("tipoAvaliacao");
    if (tmp == 1) {
      return true;
    } else {
      return false;
    }
  },
  semestreSelecionado() {
    var valor = Session.get("processoSelecionado");
    if (valor != "") {
      return true;
    } else {
      return false;
    }
  },
  cursoSelecionado() {
    var valor = Session.get("cursoSelecionado");
    if (valor != "") {
      return true;
    } else {
      return false;
    }
  },
  qtde() {
    var tmp = Session.get('disciplinaSelecionada');
    if (tmp != "") {
      return true;
    } else {
      return false;
    }
  },
  qtde2() {
    var tmp = Session.get('tipoAluno');
    if (tmp != 0) {
      return true;
    } else {
      return false;
    }
  },
  valorInput() {
    var processo = Session.get('processoSelecionado');
    var tipoAvaliacao = Session.get('tipoAvaliacao');
    tipoAvaliacao = parseInt(tipoAvaliacao);
    if (tipoAvaliacao == 1) {
      var disciplina = Session.get('disciplinaSelecionada');
      var tmp = Voucher.find({
        processo: processo,
        tipoAvaliacao: tipoAvaliacao,
        disciplina: disciplina,
        validar: false
      }).fetch();
      Session.set('imprimirVoucher', tmp);
      return tmp.length;
    } else if (tipoAvaliacao == 2) {
      var tipoAluno = Session.get('tipoAluno');
      tipoAluno = parseInt(tipoAluno)
      //console.log("processo: ",processo,"tipoAvaliacao: ",tipoAvaliacao,"tipoAluno:",tipoAluno)
      var tmp = Voucher.find({
        processo: processo,
        tipoAvaliacao: tipoAvaliacao,
        tipoAluno: tipoAluno,
        validar: false
      }).fetch();
      Session.set('imprimirVoucher', tmp);
      return tmp.length;
    }

  },
  validar(currentUser) {
    if (currentUser == null) {
      return false
    } else {
      return true;
    }
  },
  routerGO() {
    Router.go('home')
  }

})
Template.tableVoucher.events({
  'change .avalicao': function(event) {
    event.preventDefault();
    var id = event.target.id;
    Session.set("tipoAvaliacao", event.target.value);

  },
  'change #curso': function(event) {
    event.preventDefault();
    var valor = $('#curso').val();
    if (valor != "") {
      var tmp = Curso.findOne({
        _id: valor
      })
      Session.set('cursoSelecionado', valor)
    } else {
      Session.set('cursoSelecionado', "")
    }
  },
  'change #processo': function() {
    event.preventDefault();
    var valor = $('#processo').val();
    if (valor != "") {
      Session.set('processoSelecionado', valor)
    } else {
      Session.set('processoSelecionado', "")
    }
  },
  'change .aluno': function(event) {
    event.preventDefault();
    Session.set('tipoAluno', event.target.value);
  },
  'click #imprimir': function(event) {
    event.preventDefault();
    var num = Session.get('imprimirVoucher');
    var cont = $("#qtdeVoucher").val();
    var tipo = Session.get('tipoAvaliacao');
    var curso = Session.get('cursoSelecionado');
    var cursoNome;
   if(curso!=""){
     cursoNome=Curso.findOne({_id:curso});

   }
    if (cont > 0) {
      var svgArray = []
      for (x = 0; x < cont; x++) {
        svgArray.push(num[x].numero)
      }
      var promises = []
      for (x = 0; x < svgArray.length; x++) {


        promises.push(new Promise(
          function(resolve, reject) {
            var svg = document.querySelector("svg");
            var bBox = svg.getBBox();
            var w = 340, //bBox.width*10,
              h = 189 //bBox.height*10
            $("#tspan1246").text(svgArray[x])
            if(cursoNome="Engenharia de Computação"){
              $("#rect1328").attr("style","fill:#FF041D")
            }

            var svgData = new XMLSerializer().serializeToString(svg);
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = w;
            canvas.height = h
            var img = document.createElement("img");
            img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
            img.onload = function() {
              ctx.drawImage(img, 0, 0, w, h);
              var canvasdata = canvas.toDataURL("image/png", 1);
              resolve(canvasdata)
            }
          }
        ))
      }
      Promise.all(promises).then(function(values) {
        var doc = new jsPDF('portrait', 'pt');
        pageHeight = doc.internal.pageSize.height;
        var i = 0,
          j = 0,
          contador = 0;
        for (x = 0; x < values.length; x++) {


          if (x % 2 == 0) {
            doc.addImage(values[x], "PNG", i, j);
            i += 290;
          } else {
            doc.addImage(values[x], "PNG", i, j);
            j += 200;
            i = 0;
          }
          if (contador >= 7) {
            contador = 0;
            doc.addPage();
            j = 0;
            i = 0;
          } else {
            contador++;
          }
        }
        doc.save("voucher.pdf")
      })
    } else {
      alert("Selecione uma quantidade maior que zero")
    }

  }
})
