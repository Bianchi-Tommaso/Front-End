//var index = "http://192.168.1.48:8081/pages/backend.php";
var index = "http://localhost:8080/pages/backend.php";
var self, next, last, prev, page, json, totalPages, idModifica, editor;

  $("body").ready(function () 
  {
    GET(index + "?start=0&length=20");
  });

  
  function GET(link)
  {

      editor = new $.fn.dataTable.Editor( {
          ajax: link,
          table: "#example",
          fields: [ {
            
                    label: "Id:",
                    name: "id",
                    type: "select"
              }, {
                  label: "First name:",
                  name: "first_name"
              }, {
                  label: "Last name:",
                  name: "last_name"
              }, {
                  label: "Gender:",
                  name: "gender"
              }
          ]
      } );
   
      var table = $('#example').DataTable( {
          dom: "Bfrtip",
          "processing": true,
          "serverSide": true,
          ajax: {
              url: link,
              type: 'POST'
          },
          columns: [
              { data: "id" },
              { data: "first_name" },
              { data: "last_name" },
              { data: "gender" }
          ],
          select: true,
          buttons: [
              { extend: "create", editor: editor },
              { extend: "edit",   editor: editor },
              {
                  extend: "selected",
                  text: 'Delete',
                  action: function ( e, dt, node, config ) {
                      var rows = table.rows( {selected: true} ).indexes();
   
                      editor
                          .hide( editor.fields() )
                          .one( 'close', function () {
                              setTimeout( function () { // Wait for animation
                                  editor.show( editor.fields() );
                              }, 500 );
                          } )
                          .edit( rows, {
                              title: 'Delete',
                              message: rows.length === 1 ?
                                  'Are you sure you wish to delete this row?' :
                                  'Are you sure you wish to delete these '+rows.length+' rows',
                              buttons: 'Delete'
                          } )
                          .val( 'users.removed_date', (new Date()).toISOString().split('T')[0] );
                  }
              }
          ]
      } );
}
