//var index = "http://192.168.1.48:8081/pages/backend.php";
var index = "http://localhost:8080/pages/backend.php";
var self, next, last, prev, page, json, totalPages, idModifica;

$(document).ready(function () 
{

  $("body").ready(function () 
  {
    GET(index + "?start=0&length=20");
  });

 

  function GET(link)   //prende i dati e stampa i dipendeti
  {
    $(document).ready(function() {
      $('#example').DataTable( {
          "processing": true,
          "serverSide": true,
          "ajax": {
              "url": index,
              "type": "POST"
          },
          "columns": [
              { "data": "id" },
              { "data": "birth_date" },
              { "data": "first_name" },
              { "data": "last_name" },
              { "data": "gender" },
              { "data": "hire_date" }
          ]
      } );
  } );
  };
});
