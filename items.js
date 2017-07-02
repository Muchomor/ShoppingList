var express = require('express');
var router = express.Router();
var items = [
   {id: 101, name: "Bread", quantity: 1},
   {id: 102, name: "Milk", quantity: 2},
   {id: 103, name: "Fresh juice", quantity: 2},
   {id: 104, name: "Coke", quantity: 69}
];

module.exports = router;

router.get('/', function(req, res){
   res.json(items);
});


router.get('/:id([0-9]{3,})', function(req, res){
   var currentItem = items.filter(function(item){
      if(item.id == req.params.id){
         return true;
      }
   });
   if(currentItem.length == 1){
      res.json(currentItem[0])
   } else {
      res.status(404);
      res.json({message: "Not Found"});
   }
});

router.post('/', function(req, res){
   if(!req.body.name || !req.body.quantity){
      res.status(400);
      res.json({message: "Bad Request"});
   } else {
      var newId = items[items.length-1].id+1;
      items.push({
         id: newId,
         name: req.body.name,
         quantity: req.body.quantity
      });
      res.json({message: "New item added"});
   }
});

router.delete('/:id', function(req, res){
   
    var tempList = items.map(function(item) {
        return String(item.id);
    });

    var removeIndex = tempList.indexOf(req.params.id);
   
   if(removeIndex === -1){
      res.json({message: "Not found"});
   } else {
      items.splice(removeIndex, 1);
      res.send({message: "Item id " + req.params.id + " removed."});
   }
});