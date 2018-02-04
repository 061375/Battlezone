function stayinsidegame(i,x,y) {
    var re = {x:x,y:y}
    switch($w.collision.insideCanvas(i,x,y)) {
        case 1:
            re.x = $w.canvas.get(i,'canvas').width - 2;
            break;
        case 2:
            re.y = $w.canvas.get(i,'canvas').height - 2;
            break;
        case 3:
            re.x = 0;
            break;
        case 4:
            re.y = 0;
            break;
    }
    return re;
}