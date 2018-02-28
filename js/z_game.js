window.onload = () => {
    
    'use strict';
    
    // first load the audio
    $w.loading.load({
            alert:'audio/alert.mp3',
            boom:'audio/boom.mp3',
            boom2:'audio/boom2.mp3',
            engine:'audio/engine.mp3',
            engineidle:'audio/engineidle.mp3',
            radar_beep:'audio/radar_beep.mp3',
            shoot:'audio/shoot.mp3'
    },function(){
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
            document.getElementById('dev-window').style.height = (H-30)+'px';
        }
        
        // initialize the GUI
        GUI.init();
        
        // create the hosrizon as a seperate static layer
        Horizon.init();
        Horizon.draw();
        
        Player.init();
        
        // map non-game keyboard elements
        $w.game.bindkeys({
            KeyS:helperSound
        },"keyup");
        // map non-game keyboard elements
        $w.game.bindkeys({
            Enter:helperStartGame
        },"keyup");
        // add a game canvas and add the camera object to it 
        let i = $w.add_object_single(
            1,
            Camera,{},
            document.getElementById('game'),
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
                x:STAGESIZE+100,
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
                x:STAGESIZE+100,
                y:STAGESIZE+100,
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
                y:STAGESIZE+100,
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
                x:(STAGESIZE/2),
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
                x:(STAGESIZE/2),
                y:(STAGESIZE+300),
                zz:0,
                d:0
            },
            i,
            W,H
        );
        $w.loop(true,i);
    });
}