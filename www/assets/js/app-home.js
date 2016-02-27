$(function() {
  $('button.btnQr').on('click touch', function(event) {
  
    event.preventDefault();       
      

    $.ajax({
      method: 'POST',
      url: 'http://soporte.policiatijuana.gob.mx:98/api/Verificador/',
      dataType: 'json',
      data: {
        'iDevolucion': $(this).val(),
        'usuario': $('#user').val(),
        'contrasena': $('#pass').val()
      },
      async: true,
      crossDomain: true,
      cache: false,
      beforeSend: function(){ $(".loader").fadeOut("200").css("display", "block"); },
      success: function(data) {           
        $(".loader").fadeOut("200").css("display", "none"); 
        $.snackbar({
          content: "Verificado", 
          timeout: 5000
        }); 
        alert(data);
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
            content: "Ocurrió un error, no desistas e inténtalo nuevamente", 
            timeout: 5000
          }); 
        } else {
          $.snackbar({
            content: "No se encontró un resultado, inténtalo nuevamente", 
            timeout: 5000
          }); 
        }
      }
    });

    return false; 
  });
});

$(function () {
  var queryString = new Array();
  if (queryString.length == 0) {
    if (window.location.search.split('?').length > 1) {
      var params = window.location.search.split('?')[1].split('&');
      for (var i = 0; i < params.length; i++) {
        var key = params[i].split('=')[0];
        var value = decodeURIComponent(params[i].split('=')[1]);
        queryString[key] = value;
      }
    }
  }
  if (queryString["user"] != null && queryString["pass"] != null) {
    $('#user').val(queryString["user"]);
    $('#pass').val(queryString["pass"]);
  }
});