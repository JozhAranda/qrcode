$(function() {
  $('.btnQr').on('click touch', function(event) {
  
    event.preventDefault();       
    
    $.ajax({
      method: 'GET',
      url: $(this).attr('href') + "?user=" + $('#user').val() + "&pass=" + $('#pass').val(),
      async: true,
      crossDomain: true,
      cache: false,
      beforeSend: function(){ $(".loader").fadeOut("200").css("display", "block");  },
      success: function(data) {           
        $(".loader").fadeOut("200").css("display", "none"); 
      },
      error: function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
          this.tryCount++;
          if (this.tryCount <= this.retryLimit) {
            $.ajax(this);
            return;
          }            
          return;
        }  
        $(".loader").fadeOut("200").css("display", "none");        
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