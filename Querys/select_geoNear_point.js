db.runCommand(
   {
     geoNear: "roads",
     near: { type: "Point", coordinates:           [ 
                -61.462384, 
                15.485219, 
                -2.3
            ]
             },
     spherical: true,
     maxDistance: 100
   }
)