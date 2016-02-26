$(function() {
  $('#submitSesion').on('click touch', function(event) {
  
    event.preventDefault();       
    
    var dataLogin = JSON.parse($('#formLogin').serialize());
    var usuario = $('#usuario').val();
    var contrasena = $('#contrasena').val();

    $.ajax({
      method: 'POST',
      url: 'http://soporte.policiatijuana.gob.mx:98/api/Login/',
      async: true,
      crossDomain: true,
      data: dataLogin,
      cache: false,
      beforeSend: function(){ $("#submitSesion").val('Iniciando...'); },
      success: function(data) {           
        var token = "?user=" + encodeURIComponent(usuario) + "&pass=" + encodeURIComponent(contrasena);
        $("body").load("home.html").hide().fadeIn(1500).delay(6000);
        window.location.href = "home.html" + token;
      },
      error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
          this.tryCount++;
          if (this.tryCount <= this.retryLimit) {
            $.ajax(this);
            return;
          }            
          return;
        }  
        $("#submitSesion").val('Iniciar sesión');       
        if (xhr.status == 500) {
          $.snackbar({
            content: "Ocurrio un error, no desistas e intentalo nuevamente", 
            timeout: 5000
          }); 
        } else {
          $.snackbar({
            content: "Usuario y/o contraseña son invalidas, intentalo nuevamente", 
            timeout: 5000
          }); 
        }
      }
    });

    return false; 
  });
});