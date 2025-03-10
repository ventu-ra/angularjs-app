userModule.controller("UsuarioController", function ($scope, $http) {
  $scope.usuario = {};
  $scope.mensagem = "";

  // Função para cadastrar o usuário
  $scope.cadastrar = function () {
    var token = localStorage.getItem("jwtToken"); // Obtém o token do localStorage


    $http.post("http://localhost:5130/api/User/create", $scope.usuario, {
      headers: {
        "Authorization": "Bearer " + token // Adiciona o token no cabeçalho
      }
    })
      .then(function (response) {

        if (response.status == 201) {
          $scope.mensagem = "Usuario cadastrado com sucesso.";
          $scope.usuario = {}; // Limpa o formulário após o cadastro
        }
      })
      .catch(function (error) {
        $scope.mensagem = "Erro ao cadastrar usuário!";
      });
  };

  // Função para listar os usuários
  $scope.listarUsuarios = function () {
    var token = localStorage.getItem("jwtToken");

    $http.get("http://localhost:5198/api/Usuario/listar", {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(function (response) {
        $scope.usuarios = response.data;
      })
      .catch(function (error) {
        console.error("Erro ao listar usuários:", error);
      });
  };
});

