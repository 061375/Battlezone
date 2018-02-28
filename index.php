<?php
/*********************************************
 *
 *
 *  Battlezone - Javascript Remake
 *  @author Jeremy Heminger <contact@jeremyheminger.com>
 *
 *
 *
 *  */

// if in dev mode the files will be fresh loads
$dev = isset($_GET['dev']) ? strtotime('now') : false;
?>
<!DOCTYPE html>

<html>
    <head>
        <title>Battlezone Remake Built in Javascript By Jeremy Heminger</title>
        <meta name="description" property="og:description" content="Remake of the 1980 original tank game from Atari built in Javascript using the Wes Mantooth Game Engine" />
        <meta name="keywords" content="battlezone,classic,arcade,game,tank,battle,3d,war,alien,atari,jeremy,aaron,heminger,wes mantooth,javascript,programming,free" />
        <meta property="og:title" content="Classic Battlezone in Javascript | Jeremy Aaron Heminger" />
        <meta property="og:image" content="http://demo.jeremyheminger.com/Battlezone/images/og-screen.jpg" />
        <link href="css/style.css?<?php echo $dev; ?>" rel="stylesheet" />
        <?php
        if(false !== $dev) {$devmode = 'true';}else{$devmode='false';}
        ?>
        <script>const DEVMODE = <?php echo $devmode; ?></script>
    </head>
    <body>
        <?php if(false !== $dev) { ?><pre id="dev-window"></pre><?php } ?>
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
                echo '<script src="'.$dir.$file.'?'.$dev.'&v=1.1.3"></script>'."\n";
            }   
        }
    ?>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-97910559-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'UA-97910559-1');
    </script>

    </body>
</html>