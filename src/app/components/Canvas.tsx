// import * as React from 'react'
// import * as redux from 'redux';
// import { connect } from 'react-redux';
// import Matter from 'matter-js';

// import myFace from 'app/images/profile_clipped-60.png';

// import * as actions from 'app/actions/actions';

// export const Canvas = () => {
//         // this.animate.bind(this);
//         // this.handleWindowResize = this.handleWindowResize.bind(this);
//         // this.playPause = this.playPause.bind(this);
//         // this.addBody = this.addBody.bind(this);
//         // this.reset = this.reset.bind(this);
//         // this.drawTemporaryConstraint = this.drawTemporaryConstraint.bind(this);
//         const selectedBodyForConstraint = React.useRef()
//         const offscreenCanvas = React.useRef()
//         const myFaceRef = React.useRef()
//         const canvasRef = React.useRef()
//         const ctx = React.useRef()
//         const constraints = React.useRef([])
//         const bodies = React.useRef([])
//         const world = React.useRef()
//         const myFacePixelData = React.useRef()
//         const mouseConstraint = React.useRef()
//         const engine = React.useRef()
//         const walls = React.useRef()

//         const [isPlaying, setIsPlaying] = React.useState(true);
//         const [selected, setSelected] = React.useState('');

//         const mouse = React.useRef()
//         React.useEffect(()=> {
//           if (!mouse.current && canvasRef.current) {
//             mouse.current = Matter.Mouse.create(canvasRef.current)
//           }
//         })

//     const addConstraint = (bodyA, bodyB) => {
//         const c = Matter.Constraint.create({
//             bodyA,
//             bodyB,
//             stiffness: 0.5
//         });

//         constraints.current.push(c);
//         Matter.World.add(world.current, c);
//     }

//     const addBody = () => {
//         let b;
//         switch (selected) {
//             case 'rect':
//                 b = Matter.Bodies.rectangle(mouse.current.position.x, mouse.current.position.y, 25, 25, { restitution: 1 });
//                 break;
//             case 'circle':
//                 b = Matter.Bodies.circle(mouse.current.position.x, mouse.current.position.y, 25, { restitution: 1 });
//                 break;
//             default:
//                 break;
//         }
//         bodies.current.push(b);
//         Matter.World.add(world.current, b);
//     }

//     const pointillism = ()=> {
//         const data = myFacePixelData.current.data;

//         let start = performance.now();

//         function componentToHex(c) {
//             var hex = c.toString(16);
//             return hex.length == 1 ? "0" + hex : hex;
//         }

//         function rgbToHex(r, g, b) {
//             return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
//         }

//         let step = 9;
//         let counter = 0;
//         let offsetX = 100;
//         let offsetY = 40;
//         let w = myFaceRef.current.width;
//         let h = myFaceRef.current.height;
//         for (let i = 0; i < data.length; i += step * 4) {
//             const r = data[i];
//             const g = data[i + 1];
//             const b = data[i + 2];
//             const a = data[i + 3];
//             if (r !== 0 || g !== 0 || b !== 0) {
//                 // Create a Matter body, give it the color
//                 let x = (i / 4) % w;
//                 let y = Math.floor(i / 4 / w);
//                 let body = Matter.Bodies.circle(x + offsetX, y + offsetY, 1, {
//                     enableSleeping: true,
//                     restitution: 0.7,
//                     frictionAir: 0.3,
//                     // inertia: 100
//                 });
//                 // Matter.Body.setVelocity(body, Matter.Vector.create(3, 0));
//                 let color = rgbToHex(r,g,b);
//                 body.render.fillStyle = color;
//                 body.render.strokeStyle = color;
//                 Matter.World.add(world.current, body);
//                 bodies.current.push(body);
//             }
//         }
//     }
//         React.useEffect(()=> {

//         // this.initializeEventListeners = this.initializeEventListeners.bind(this);
//         if (myFaceRef.current) {

//         myFaceRef.current.addEventListener('load', () => {
//             const width = myFaceRef.current.width;
//             const height = myFaceRef.current.height;
//             offscreenCanvas.current.width = width;
//             offscreenCanvas.current.height = height;

//             offscreenCanvas.current.getContext('2d').drawImage(myFaceRef.current, 0, 0, width, height);
//             myFacePixelData.current = offscreenCanvas.current.getContext('2d').getImageData(0, 0, width, height);
//             pointillism();
//         });
//         }

//         var w = window.innerWidth - 300;
//         var h = window.innerHeight - 50;
//         canvasRef.current.width = w;
//         canvasRef.current.height = h;
//         ctx.current = canvasRef.current.getContext('2d');

//         // FIXME: Mouse and canvas are not in sync.  Mousedown position is one
//         // click behind where it should be.  bizarre

//         engine.current = Matter.Engine.create(),
//         world.current = engine.current.world;

//         bodies.current = [];
//         constraints.current = [];

//         mouse.current = Matter.Mouse.create(canvasRef.current);
//         mouseConstraint.current = Matter.MouseConstraint.create(engine.current, {
//             mouse: mouse.current,
//             constraint: {
//                 stiffness: 0.2
//             }
//         });

//         initializeEventListeners();

//         Matter.World.add(world.current, mouseConstraint.current);

//         // this.myFacePhysics = Matter.Bodies.circle(500, 20, 25, {restitution: 1});
//         walls.current = {
//             left: {
//                 physics: Matter.Bodies.rectangle(0, canvasRef.current.height / 2, 10, canvasRef.current.height, {isStatic: true})
//             },
//             right: {
//                 physics: Matter.Bodies.rectangle(canvasRef.current.width, canvasRef.current.height / 2, 10, canvasRef.current.height, {isStatic: true}),
//             },
//             bottom: {
//                 physics: Matter.Bodies.rectangle(canvasRef.current.width / 2, canvasRef.current.height, canvasRef.current.width, 10, {isStatic: true})
//             },
//             top: {
//                 physics: Matter.Bodies.rectangle(canvasRef.current.width / 2, 0, canvasRefcurrent.width, 10, {isStatic: true})
//             }
//         };

//         bodies.current = bodies.current.concat([walls.current.left.physics, walls.current.right.physics, walls.current.bottom.physics, walls.current.top.physics]);

//         Matter.World.add(world.current, [this.walls.left.physics, this.walls.right.physics, this.walls.bottom.physics, this.walls.top.physics]);

//         this.animate(16.666);
//       })

//     componentDidMount() {
//         var { dispatch } = this.props;

//     }

//     initializeEventListeners() {
//         this._canvas.addEventListener('mousedown', (e) => {
//             let selected = this.state.selected;
//             if (selected === 'rect' || selected === 'circle') {
//                 this.addBody(selected);
//             } else if (selected === 'spring') {
//                 const bodies = Matter.Query.point(this.bodies, this.mouse.mousedownPosition);
//                 if (bodies.length > 0) {
//                     const b = bodies[0];
//                     if (this.selectedBodyForConstraint) {
//                         // Second body selected, add constraint, clear out
//                         // selected body
//                         if (b !== this.selectedBodyForConstraint) {
//                             this.addConstraint(
//                                 this.selectedBodyForConstraint,
//                                 b
//                             );
//                             // Matter.World.add(this.engine.world, c);
//                             this.selectedBodyForConstraint = null;
//                         }
//                     } else {
//                         this.selectedBodyForConstraint = b;
//                     }
//                 }
//             }
//         });
//     }

//     componentWillUnmount() {
//         window.cancelAnimationFrame(this.frame);
//         this.frame = null;
//     }

//     // Pixi.js animation loop
//     animate(time) {
//         this.frame = requestAnimationFrame(this.animate);
//         // Matter.Engine.update(this.engine);
//         this.renderMatter();
//     }

//     drawSelectedObject() {
//         const { selected } = this.state;
//         ctx.current.beginPath();
//         ctx.current.strokeStyle = 'red';
//         switch (selected) {
//             case 'rect':
//                 ctx.current.rect(this.mouse.position.x - 25, this.mouse.position.y - 25, 25, 25);
//                 ctx.current.stroke();
//                 break;
//             case 'circle':
//                 ctx.current.arc(this.mouse.position.x, this.mouse.position.y, 25, 0, Math.PI * 2);
//                 ctx.current.stroke();
//                 break;
//             default:
//                 break;
//         }
//     }

//     drawTemporaryConstraint() {
//         if (this.selectedBodyForConstraint) {
//             ctx.current.beginPath();
//             ctx.current.moveTo(this.selectedBodyForConstraint.position.x, this.selectedBodyForConstraint.position.y);
//             ctx.current.lineTo(this.mouse.position.x, this.mouse.position.y);
//             ctx.current.strokeStyle = 'red';
//             ctx.current.stroke();
//         }
//     }

//     renderMatter() {
//         // const { isPlaying, primativesPanelSelection, selectedObject } = this.props;
//         const { isPlaying, selected } = this.state;

//         // clear the canvas with a transparent fill, to allow the canvas background to show
//         // const worldX = this.world.bounds.min.x;
//         // const worldY = this.activeState.world.bounds.min.y;
//         // const worldWidth = this.activeState.world.bounds.max.x - worldX;
//         // const worldHeight = this.activeState.world.bounds.max.y - worldY;

//         ctx.current.globalCompositeOperation = 'source-in';
//         ctx.current.fillStyle = 'transparent';
//         ctx.current.fillRect(0, 0, this._canvas.width, this._canvas.height);
//         ctx.current.globalCompositeOperation = 'source-over';

//         ctx.current.fillStyle = '#fff';
//         ctx.current.fillRect(0, 0, this._canvas.width, this._canvas.height);

//         if (isPlaying) {
//             Matter.Engine.update(engine.current, 16.666);
//         }

//         for (let i = 0; i < this.bodies.length; i++) {
//             ctx.current.beginPath();
//             const body = this.bodies[i];
//             ctx.current.strokeStyle = body.render.strokeStyle;
//             ctx.current.fillStyle = body.render.fillStyle;
//             ctx.current.lineWidth = 1;
//             // if (body.id === selectedObject) {
//                 // this.ctx.strokeStyle = 'green';
//                 // this.ctx.lineWidth = 3;
//             // }

//             const vertices = body.vertices;

//             ctx.current.moveTo(vertices[0].x, vertices[0].y);

//             for (let j = 1; j < vertices.length; j += 1) {
//                 ctx.current.lineTo(vertices[j].x, vertices[j].y);
//             }

//             ctx.current.lineTo(vertices[0].x, vertices[0].y);

//             ctx.current.stroke();
//             ctx.current.fill();
//         }

//         for (let i = 0; i < this.constraints.length; i++) {
//             const c = this.constraints[i];
//             if (c.type !== 'mouseConstraint') {
//                 ctx.current.beginPath();
//                 ctx.current.moveTo(c.bodyA.position.x, c.bodyA.position.y);
//                 ctx.current.lineTo(c.bodyB.position.x, c.bodyB.position.y);
//                 ctx.current.strokeStyle = 'red';
//                 ctx.current.lineWidth = 1;
//                 // if (c.id === selectedObject) {
//                 //     this.ctx.strokeStyle = 'green';
//                 //     this.ctx.lineWidth = 3;
//                 // }
//                 ctx.current.stroke();
//             }
//         }

//         ctx.current.strokeStyle = '#333';

//         if (selected !== '') {
//             this.drawSelectedObject();
//         }

//         if (this.selectedBodyForConstraint) {
//             this.drawTemporaryConstraint();
//         }

//         // this.pan();
//         // window.requestAnimationFrame(this.renderCanvas);
//     }

//     handleWindowResize(e) {
//         // let { currentPage } = this.props;
//         // if (currentPage === 'home') {
//         //     this.me.homePage();
//         // }
//         // this._canvas.view.width = window.innerWidth;
//         // this._canvas.view.height = window.innerHeight;
//         // this._canvas.resize(window.innerWidth, window.innerHeight);
//     }

//     playPause() {
//         this.setState({
//             isPlaying: !this.state.isPlaying
//         });
//     }

//     selectItem(itemName) {
//         this.setState({
//             selected: itemName
//         });
//     }

//     reset() {
//         this.bodies = [];
//         this.constraints = [];
//         this.selectedBodyForConstraint = null;
//         Matter.World.clear(world.current);
//         Matter.World.add(world.current, [this.walls.left.physics, this.walls.right.physics, this.walls.bottom.physics, this.walls.top.physics]);
//         this.bodies = this.bodies.concat([this.walls.left.physics, this.walls.right.physics, this.walls.bottom.physics, this.walls.top.physics]);
//     }

//     render() {
//         const { isPlaying, selected } = this.state;
//         return (
//             <div className='bg-cvs' ref={(c) => {this._elt=c;}}>
//                 <div className='buttons'>
//                     <img className={selected === 'cursor' ? 'selected' : ''} src='/images/Cursor-48.png' onClick={() => {this.selectItem('cursor');}} />
//                     <img className={selected === 'rect' ? 'selected' : ''} src='/images/Rectangle.png' onClick={() => {this.selectItem('rect');}} />
//                     <img className={selected === 'circle' ? 'selected' : ''} src='/images/Circle.png' onClick={() => {this.selectItem('circle');}} />
//                     <img className={selected === 'spring' ? 'selected' : ''} src='/images/Spring.png' onClick={() => {this.selectItem('spring');}} />
//                     <img src={isPlaying ? '/images/Pause-48-black.png' : '/images/Play-48-black.png'} onClick={this.playPause} />
//                     <img src='/images/Restart-48-black.png' onClick={this.reset} />
//                 </div>
//                 <canvas id='canvas' ref={canvasRef} />
//                 <canvas className='hide' id='offscreen-canvas' ref={offscreenCanvas} />
//                 <img src={myFace} className='hide' ref={myFaceRef} />
//             </div>
//         );
//     }
// }
