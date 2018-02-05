<?php
// CLI only
if (php_sapi_name() != "cli") die();

require_once('php/an8.2.0.1.class.php');
$an8 = new An8();
define("MAX_BYTES",1000000);
define("CMD",true);

$an8dir = 'an8/';
$models = 'js/models/';

if(!is_dir($an8dir))
    if(! @mkdir($an8dir))
        die("an8 directory could not be create\n");

if(!is_dir($models))
    if(! @mkdir($models))
        die("models directory could not be create\n");

print "backing up previous files\n";

if(file_exists('models.bk.zip'))
    @unlink('models.bk.zip');

$shell = 'zip -r models.bk.zip '.$models;

exec ($shell);

$shell = 'rm -Rf '.$models.'/*';

exec ($shell);

$files = scandir($an8dir);

foreach($files as $file) {
    
    if(strpos($file,'.an8') === false)continue;
    
    $name = str_replace('.an8','',$file);
    $filepath = $an8dir.$file;
    
    $data = $an8->openAn8($filepath,false);
		if (false === $data)
			$an8->display_errors();
			$result = $an8->prepareAn8($data);
			if (false === $result)
				$an8->display_errors();
				$points = $an8->get3Dpoints($result);
				if(false === $points)
					$an8->display_errors();
					$points = $an8->make3Dpoints($points);
					if(false === $points)
						$an8->display_errors();
						$faces = $an8->get3Dfaces($result);
						$faces = $an8->make3Dfaces($faces);
                        
                        $out = 'var '.$name.'Model = {'.str_replace('this.makeA3DPoint','$w.threed.makeA3DPoint',str_replace('this.pointsArray =','pointsArray:',str_replace(';','',$points))).','.str_replace('this.facesArray = ','facesArray:',str_replace(';','',$faces)).'}';

                        $newfile = $models.str_replace('.an8','Model.js',$file);
                        
                        print "creating model ".$newfile."\n";
                        
                        if(! @file_put_contents($newfile,$out)) {
                            print "error creating file ".$newfile."\n";
                        }
}

print "operation complete \n\n";
