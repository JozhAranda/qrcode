
$(document).ready(function () {
    var maxFields = 10;
    var wrapper = $(".divUnidad");
    var addButton = $(".addUnidad");

    var x = 1;
    $(addButton).click(function (e) { 
        e.preventDefault();
        if (x < maxFields) { 
            x++;
            $(wrapper).append('<div style="margin: 5px 0;"><input type="text" name="numeroUnidad" id="numeroUnidad" class="form-control inputShadow" placeholder="Número de Unidad" maxlength="25" /><a href="#" class="btn btn-danger btn-sm removeUnidad" style="float:right;margin-top: -33px;"> - </a></div>');
        }
    });

    $(wrapper).on("click", ".removeUnidad", function(e) { 
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    });
});

$(document).ready(function () {
    var maxFields = 10;
    var wrapper = $(".divOficial");
    var addButton = $(".addOficial");

    var x = 1;
    $(addButton).click(function (e) {
        e.preventDefault();
        if (x < maxFields) {
            x++;
            $(wrapper).append('<div style="margin: 5px 0;"><input type="text" name="matriculaOficial" id="matriculaOficial" class="form-control inputShadow" placeholder="Matrícula de Oficial" maxlength="25" /><a href="#" class="btn btn-danger btn-sm removeOficial" style="float:right;margin-top: -33px;"> - </a></div>');
        }
    });

    $(wrapper).on("click", ".removeOficial", function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    });
});
