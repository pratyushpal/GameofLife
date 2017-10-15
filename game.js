var container;
var camera,scene,renderer,particles,geometry,materials=[],parameters,i,h,color,size;
var mouseX=0,mouseY=0;
var windowHalfX=window.innerWidth/2;
var windowHalfY=window.innerHeight/2;
init();
animate();
function init(){
container= document.createElement("div");
document.body.appendChild(container);
container.style.position="absolute";
container.style.top="0";
container.style.zIndex="-1";
camera=new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,1,3000);
camera.position.z=1000;scene=new THREE.Scene();
scene.fog=new THREE.FogExp2(0,0.0007);
geometry=new THREE.Geometry();
for(i=0;i<250;i++){
  var a=new THREE.Vector3();
  a.x=Math.random()*2000-1000;
  a.y=Math.random()*2000-1000;
  a.z=Math.random()*2000-1000;
  geometry.vertices.push(a)
}
parameters=[[[1,1,0.5],5],[[0.95,1,0.5],4],[[0.9,1,0.5],3],[[0.85,1,0.5],2],[[0.8,1,0.5],1]];
for(i=0;i<parameters.length;i++){
  color=parameters[i][0];
  size=parameters[i][1];
  materials[i]=new THREE.PointsMaterial({size:size});
  particles=new THREE.Points(geometry,materials[i]);
  particles.rotation.x=Math.random()*6;
  particles.rotation.y=Math.random()*6;
  particles.rotation.z=Math.random()*6;
  scene.add(particles)
}
renderer=new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
container.appendChild(renderer.domElement);
document.addEventListener("mousemove",onDocumentMouseMove,false);
document.addEventListener("touchstart",onDocumentTouchStart,false);
document.addEventListener("touchmove",onDocumentTouchMove,false);
window.addEventListener("resize",onWindowResize,false)}
function onWindowResize(){
  windowHalfX=window.innerWidth/2;
  windowHalfY=window.innerHeight/2;
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight)
}
function onDocumentMouseMove(a){
  mouseX=a.clientX-windowHalfX;
  mouseY=a.clientY-windowHalfY
}
function onDocumentTouchStart(a){
  if(a.touches.length===1){
    a.preventDefault();
    mouseX=a.touches[0].pageX-windowHalfX;
    mouseY=a.touches[0].pageY-windowHalfY
  }
}
function onDocumentTouchMove(a){
  if(a.touches.length===1){a.preventDefault();mouseX=a.touches[0].pageX-windowHalfX;
    mouseY=a.touches[0].pageY-windowHalfY
  }
}
function animate(){
  requestAnimationFrame(animate);
  render()
}
function render(){
  var b=Date.now()*0.00005;
  camera.position.x+=(mouseX-camera.position.x)*0.05;
  camera.position.y+=(-mouseY-camera.position.y)*0.05;
  camera.lookAt(scene.position);
  for(i=0;i<scene.children.length;i++){
    var a=scene.children[i];
    if(a instanceof THREE.Points){
      a.rotation.y=b*(i<4?i+1:-(i+1))
    }
  }
  for(i=0;i<materials.length;i++){
    color=parameters[i][0];
    h=(360*(color[0]+b)%360)/360;
    materials[i].color.setHSL(h,color[1],color[2])
  }
  renderer.render(scene,camera)
};

// adding code for the Game of Life simulation

function neighbours(cell, distance=1){
  // Return the neighbours of the cell
  var arrNeighbours = [];
  var x,y,z = cell;
  r = range(0-distance, 1+distance);
  for(i=0-distance; i < 1+distance; ++i ){
    for(j=0-distance; j < 1+distance; ++j){
      for(k=0-distance; k < 1+distance; ++k){ //iterate over range in 2d
        if (i != 0 && j != 0 && k != 0){  // exclude the center cell
         arrNeighbours.push([x + i, y + j, z + k]); // new cell offset from center
        }
      }
    }
  }
  return arrNeighbours;
}


// the board refers to the current state of the object
function advance(board){
  // Advance the board one step and return it!!
  var new_board = [];
  for each (var cell in board){
    var cell_neighbors = neighbours(cell);
    // test if cell a live cell dies
    if ((len(board) === 2 || len(board) === 3) && (len(cell_neighbours) === 2 || len(cell_neighbours) === 3)){
      new_board.push(cell);
    }
    //  # test dead neighbors to see if alive
    for each(var n in cell_neighbours){
      if ((len(board) === 3) && len(cell_neighbours) === 3)) {
        new_board.push(n);
      }
      return new_board;
    }
  }
}

/*

Next step:  correctly render and print the objects on the canvas
function print_board(board, size=None){
  var sizex, sizey, sizez = size;
  for each (var x in board){
    for each(var y in board){
      for each(var z in board){
        sizex = (x > sizex) ? x : sizex;
        sizey = (y > sizey) ? y : sizey;
        sizez = (z > sizez) ? z : sizez;
      }
    }
  }

  for(var i = 0; i <= sizex; ++i){
    for(var j = 0; j <= sizey; ++j{
      for(var k = 0; k <= sizez; ++k){
        console.log('hey');
      }
    }
  }
}


function constrain(board, size){
  var correctBoard = [];
  for each (var cell in board){
    if (cell[0] <= size && cell[1] <= size && cell[2] <= size){
      correctBoard.push(cell);
    }
  }
  return correctBoard;
}


def constrain(board, size):
    return set(cell for cell in board if cell[0] <= size and cell[1] <= size)

def main(board, steps=75, size=20):
    for i in xrange(1, steps + 1):
        sys.stdout.write('\033[H')  # move to the top
        sys.stdout.write('\033[J')  # clear the screen
        print 'step:', i, '/', steps
        print_board(board, size)
        time.sleep(0.1)
        board = constrain(advance(board), size)
*/
