angular.module('sislegisapp').controller('ModalBuscarProposicaoController', function($scope, $http, $routeParams, $location, $modalInstance, ProposicaoResource, dataReuniao, listaProposicaoSelecao) {
    var self = this;
    $scope.disabled = false;
    $scope.showDetalhamentoProposicao =false;
    $scope.$location = $location;
    
    $scope.comissao = new Object();
    $scope.dataReuniao = dataReuniao;
//    $scope.selected = {
//      item: $scope.items[0]
//    };
    
    $scope.listaProposicaoSelecao = [];
    $scope.listaProposicaoPesquisa = {};
    
    $scope.pesquisar = function () {
      $modalInstance.close($scope.listaProposicaoSelecao);
    };

    $scope.ok = function () {
      $modalInstance.close($scope.listaProposicaoSelecao);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    

    $scope.buscarProposicao = function() {
    	var curr_date = ('0' + ($scope.campoData.getDate())).slice(-2);
        var curr_month = ('0' + ($scope.campoData.getMonth()+1)).slice(-2); // Adicionando o 0 manualmente quando o mes tem apenas 1 digito
        var curr_year = $scope.campoData.getFullYear();
        var formattedDate = curr_year + "" + curr_month + "" + curr_date
        
    	$http({
    		  method:'GET',
    		  url : ($scope.origem.value == 'C') ? "rest/proposicaos/proposicoesPautaCamara" : "rest/proposicaos/proposicoesPautaSenado",
	      	  params: {
	      		  'idComissao' : $scope.comissao.id, // usado para a camara
	      		  'siglaComissao' : $scope.comissao.sigla, // usado para o senado
	    	      'data':formattedDate
	    	  }
    		}).success(function (data) {
    			$scope.proposicoes = data;
    			$scope.comissaoProposicao = $scope.comissao.sigla;
	    });
    };
    

    
    $scope.detalharProposicao = function(idProposicao){
    	$http({
  		  method:'GET',
  		  url : ($scope.origem.value == 'C') ? "rest/proposicaos/detalharProposicaoCamaraWS" : "rest/proposicaos/detalharProposicaoSenadoWS",
	      	  params: {
	      		  'id' : idProposicao // id proposicao
	    	  }
  		}).success(function (data) {
  			console.log(data);
  			$scope.detalheProposicao = data;
  			$scope.showDetalhamentoProposicao =true;
	    });
    };
  
    $scope.adicionarProposicao = function(proposicao){
    	$scope.listaProposicaoSelecao.push(proposicao);
    };    

    $scope.removerProposicao = function(proposicao){
    	var index = $scope.listaProposicaoSelecao.indexOf(proposicao)
    	$scope.listaProposicaoSelecao.splice(index, 1);
    }; 
    
    
    $scope.salvar = function() {
    	ProposicaoResource.save($scope.listaProposicaoSelecao);
    	alert('Registros salvos com sucesso');
    	$modalInstance.close($scope.listaProposicaoSelecao);
    };
    
    $scope.origens = [
        {value: 'C', displayName: 'Câmara'},
        {value: 'S', displayName: 'Senado'}
     ];  
    
    $scope.selectOrigemComissoes = function() {
    	var origemSelecionada = $scope.origem.value;
        if(origemSelecionada=='S'){
            $http.get('rest/comissaos/comissoesSenado').
            success(function(data) {
                $scope.comissoes = data;
            });
        }else if(origemSelecionada=='C'){
            $http.get('rest/comissaos/comissoesCamara').
            success(function(data) {
                $scope.comissoes = data;});        	
        }
        		
    }; 
    

    // CALENDARIO
    $scope.setCalendar = function() {
		$scope.openCalendar = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
	
			$scope.opened = true;
		};

		$scope.dateOptions = {
			formatYear : 'yy',
			startingDay : 1
		};

		$scope.format = 'dd/MM/yyyy';
    }
    
    $scope.setCalendar();   
    
    
});