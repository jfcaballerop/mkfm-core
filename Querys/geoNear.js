db.runCommand(
    {
        geoNear: 'roads',
        near: {type: "Point", coordinates: [-61.3430515,15.26878962]},
             spherical: true,
        maxDistance: 100,
        num: 1
    }
    )