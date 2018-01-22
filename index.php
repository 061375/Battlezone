<?php
// if in dev mode the files will be fresh loads
$dev = '';
if(isset($_GET['dev']))$dev = strtotime('now');
?>
<!DOCTYPE html>

<html>
<head>
    <title>Battlezone Remake Built in Javascript By Jeremy Heminger</title>
    <meta name="description" content="Remake of the 1980 original tank game from Atari built in Javascript using the Wes Mantooth Game Engine" />
    <meta name="keywords" content="battlezone,classic,arcade,game,tank,battle,3d,war,alien,atari,jeremy,aaron,heminger,wes mantooth,javascript,programming,free" />
    <link href="css/style.css?<?php echo $dev; ?>" rel="stylesheet" />
</head>
<body>
<div id="gui"></div>
<div id="game"></div>
<script src="js/wes.mantooth.js?<?php echo $dev; ?>"></script>
<?php
    // load pre-rendered 3D models
    $dir = 'js/models/';
    $models = scandir('js/models/');
    foreach($models as $model) {
        if($model === '.' || $model === '..') {continue;}
        echo '<script src="'.$dir.$model.'?'.$dev.'"></script>'."\n";
    }
?>
<script src="js/config.js?<?php echo $dev; ?>"></script>
<script src="js/player.js?<?php echo $dev; ?>"></script>
<script src="js/enemytank.js?<?php echo $dev; ?>"></script>
<script src="js/ufo.js?<?php echo $dev; ?>"></script>
<script src="js/missle.js?<?php echo $dev; ?>"></script>
<script src="js/mapitems.js?<?php echo $dev; ?>"></script>
<script src="js/volcano.js?<?php echo $dev; ?>"></script>
<script src="js/gui.js?<?php echo $dev; ?>"></script>
<script src="js/game.js?<?php echo $dev; ?>"></script>
</body>
</html>