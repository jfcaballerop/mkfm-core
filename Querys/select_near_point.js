db.roads.find({location: {
     $near: {
       $geometry: {
          type: "Point" ,
          coordinates: [  
                -61.459637, 
                15.553452, 
                27.6
            ]
       },
       $maxDistance: 10
     }
   }
})