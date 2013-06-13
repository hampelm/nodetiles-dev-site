$(function(){
  var map = L.map('map').setView([42.42, -83.02 ], 13);

  var baseLayer = L.tileLayer('http://a.tiles.mapbox.com/v3/matth.map-zmpggdzn/{z}/{x}/{y}.png');
  map.addLayer(baseLayer);



  function addTileLayer(tilejson) {
    // Tiles
    var tileLayer = new L.TileJSON.createTileLayer(tilejson);
    map.addLayer(tileLayer);
    tileLayer.bringToFront();

    // Grid
    var gridLayer = new L.UtfGrid(tilejson.grids[0], {
      resolution: 1
    });
    map.addLayer(gridLayer);
    this.gridLayer.bringToFront();

    gridLayer.on('click', function (e) {
      var layer = new L.GeoJSON(e.data.geometry);
      console.log(layer);
      map.addLayer(layer);
      console.log('hover: ', e.data);
    }.bind(this));
  }

  var request = $.ajax({
    //'http://matth-nt.herokuapp.com/' + this.survey.get('id') + '/tile.json',
    url: 'http://localhost:3001/dbcb3590-0f59-11e2-81e6-bffd22dee0ec/tile.json',

    //url: 'http://localhost:3001/' + this.survey.get('id') + '/filter/condition/tile.json',
    type: "GET",
    dataType: "jsonp"
  });

  request.done(addTileLayer);
  request.fail(function(error){
    console.log(error);
  });


});
