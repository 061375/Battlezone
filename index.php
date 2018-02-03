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
    <div class="game-containers">
        <div id="dev"></div>
        <div id="gui"></div>
        <div id="game"></div>
        <div id="horizon"></div>
    </div>
<script src="js/wes.mantooth.js?<?php echo $dev; ?>"></script>
<?php
    loadsscripts('js/models/');
    loadsscripts('js/');
    function loadsscripts($dir) {
        global $dev;
        // load files
        $files = scandir($dir);
        foreach($files as $file) {
            if($file == 'wes.mantooth.js' || (strpos($file,'.js') === false)) {continue;}
            echo '<script src="'.$dir.$file.'?'.$dev.'"></script>'."\n";
        }   
    }
?>
</body>
</html>