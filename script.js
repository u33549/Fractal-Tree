var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerHeight;
ctx.canvas.height = window.innerHeight;

function random(min,max){
  return Math.random()*(max-min)+min
}

function drawTree(startX, startY, length, angle, branchWidth,hue,sat,light) {
  ctx.lineWidth = branchWidth;
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle=`hsl(${random(hue-10,hue+10)},${sat}%,${light}%)`;
  ctx.fillStyle=`${hue},${sat}%,${light}%)`;
  ctx.translate(startX, startY);
  ctx.rotate((angle*Math.PI)/180);
  ctx.moveTo(0,0);
  ctx.lineTo(0,-length);
  ctx.stroke();
  if(length<10){
    ctx.restore();
    return;
  }
  drawTree(0,-length,length*0.85,angle-12.5,branchWidth*0.8,(hue+=2),100,(light+=1));
  drawTree(0,-length,length*0.85,angle+12.5,branchWidth*0.8,(hue+=2),100,(light+=1));
  ctx.restore();
}
drawTree(startX=canvas.width/2,
  startY=canvas.height,
  length=110,
  angle=0,
  branchWidth=25,
  hue=0,
  sat=244,
  light=26)
