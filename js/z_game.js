window.onload = () => {
    
    'use strict';
    
    // Development
    if (DEVMODE) {
        let j = $w.add_object_single(
            17,
            Dev,{
                
            },
            document.getElementById('dev'),
            W,H
        );
        $w.loop(true,j);
    }
    
    // initialize the GUI
    GUI.init();
    
    // create the hosrizon as a seperate static layer
    Horizon.init();
    Horizon.draw();
    
    Player.init();
    // add a game canvas and add the camera object to it 
    let i = $w.add_object_single(
        1,
        Camera,{},
        document.getElementById('game'),
        W,H
    );
    
    $w.add_object_single(
        1,
        Mountains,{
            m:1,
            x:-100,
            y:-100,
            zz:0,
            d:0
        },
        i,
        W,H
    );
    $w.add_object_single(
        1,
        Mountains,{
            m:2,
            x:W+100,
            y:-100,
            zz:0,
            d:0
        },
        i,
        W,H
    );
    $w.add_object_single(
        1,
        Mountains,{
            m:3,
            x:W+100,
            y:H+100,
            zz:0,
            d:0
        },
        i,
        W,H
    );
    $w.add_object_single(
        1,
        Mountains,{
            m:3,
            x:-100,
            y:H+100,
            zz:0,
            d:0
        },
        i,
        W,H
    );
    $w.add_object_single(
        1,
        Mountains,{
            m:3,
            x:(W/2),
            y:-300,
            zz:0,
            d:0
        },
        i,
        W,H
    );
    $w.add_object_single(
        1,
        Mountains,{
            m:3,
            x:(W/2),
            y:(H+300),
            zz:0,
            d:0
        },
        i,
        W,H
    );
    $w.add_object_single(
        1,
        Tank,{
            x:100,
            y:300
        },
        i,
        W,H
    );
    $w.add_object_single(
        5,
        Tetra,{},
        i,
        W,H
    );
    $w.add_object_single(
        5,
        Cube,{},
        i,
        W,H
    );
    $w.add_object_single(
        3,
        Platform,{},
        i,
        W,H
    );
    $w.loop(true,i);
}