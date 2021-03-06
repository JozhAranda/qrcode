$(function() {
  $('#submitSesion').on('click touch', function(event) {
  
    event.preventDefault();       
    
    var dataLogin = $('#formLogin').serialize();
    var usuario = $('#usuario').val();
    var contrasena = $('#contrasena').val();

    $.ajax({
      method: 'POST',
      url: 'http://soporte.policiatijuana.gob.mx:98/api/Login/',
      dataType: 'json',
      async: true,
      crossDomain: true,
      cache: false,
      data: dataLogin,
      beforeSend: function(){ $("#submitSesion").val('Iniciando...'); },
      success: function(data) {           
        var token = "?user=" + encodeURIComponent(usuario) + "&pass=" + encodeURIComponent(contrasena);
        $("body").load("home.html").hide().fadeIn(1500).delay(6000);
        window.location.href = "home.html" + token;
      },
      error : function(xhr, textStatus, errorThrown ) {
        if (textStatus === 'timeout') {
          this.tryCount++;
          if (this.tryCount <= 2) {
            $.ajax(this);
            return;
          }            
          return;
        }  
        $("#submitSesion").val('Iniciar sesión');       
        if (xhr.status == 500) {
          $.snackbar({
            content: "Ocurrió un error, no desistas e inténtalo nuevamente", 
            timeout: 5000
          }); 
        } else {
          $.snackbar({
            content: "Usuario y/o contraseña son invalidas, inténtalo nuevamente", 
            timeout: 5000
          }); 
        }
      }
    });

    return false; 
  });
});