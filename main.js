import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';

import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

import { CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer'

let container;
let camera, scene, renderer, controls;
let composer, effectFXAA, outlinePass, outlinePassBlack;
let mixer, openPokedex, pressButton;
let cima,baixo,esq,dir,sl1,sl2,b12,b13,b22,b23,b32,b33,b42,b43,b52,b53,bbe,bbd,vm1,vm2,se1,se2;
let pokedex;
let ab, on = false;
let arrowDown;
let state, link = '';
let page, tutorialPage = 1;
let info = 'ls';
let fun = 0;
let material1, tela, telaM;
let mesh01, mesh02, mesh03, mesh04, mesh05;
let mesh11, mesh12, mesh13, mesh14, mesh15;
let lsMesh, pjMesh, contactMesh, linkedinMesh;
let lang = 'br';
let theme;
let sound = true;


let selectedObjects, selectedObjectsBlack = [];

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const clock = new THREE.Clock();
const listener = new THREE.AudioListener();
const labelRenderer = new CSS3DRenderer();
const delay = ms => new Promise(res => setTimeout(res, ms));
const loadingManager = new THREE.LoadingManager();
const loaderG = new GLTFLoader(loadingManager);

loadingManager.onStart = function(url, item, total){

}

loadingManager.onProgress = function(url, loaded, total){
}

loadingManager.onError = function(url){
    console.error('erro' + url)
}

document.addEventListener("keydown", onDocumentKeyDown, false);

init();
animate();

function init() {
    loadingManager.onLoad = function(){
        document.getElementById("buttonPlay").style.visibility = "visible";
    }

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    const width = window.innerWidth;
    const height = window.innerHeight;

    window.addEventListener('resize', onWindowResize);

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;

    // todo - support pixelRatio in this demo
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    //scene.add(grid)

    camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 100 );
    camera.position.set( 0, 0, 8 );

    controls = new OrbitControls( camera, renderer.domElement );
    controls.enablePan = false;
    camera.add(listener)

    controls.maxDistance = 9;
    controls.minDistance = 6;
    controls.maxPolarAngle = Math.PI/1.5;
    controls.minPolarAngle = Math.PI/4;
    
    //Luz e sombra - inicio
    scene.add( new THREE.AmbientLight( 0xaaaaaa, 0.65 ) );

    const light = new THREE.DirectionalLight( 0xddffdd, 2 );
    light.position.set( 1, 1, 1 );
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    const d = 10;
    light.shadow.camera.left = - d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = - d;
    light.shadow.camera.far = 1000;

    scene.add( light );

    labelRenderer.setSize(window.innerWidth,window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild( labelRenderer.domElement);

    //Click Sound Effect and Music Theme
    const clickSound = new THREE.Audio(listener);
    const onSound = new THREE.Audio(listener);
    const offSound = new THREE.Audio(listener);
    theme = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( '/src/sounds/clickSound.ogg', function( buffer ) {
	    clickSound.setBuffer( buffer );
	    clickSound.setLoop( false );
	    clickSound.setVolume( 0.25 );
    });
    audioLoader.load('/src/sounds/onSound.ogg' , function( buffer ){
        onSound.setBuffer( buffer );
	    onSound.setLoop( false );
	    onSound.setVolume( 0.25 );
    })
    audioLoader.load('/src/sounds/offSound.ogg' , function( buffer ){
        offSound.setBuffer( buffer );
	    offSound.setLoop( false );
	    offSound.setVolume( 0.25 );
    })
    audioLoader.load('/src/sounds/abertura.ogg' , function( buffer ){
        theme.setBuffer( buffer );
	    theme.setLoop( true );
	    theme.setVolume( 0.05 );
    })
    

    //IMG - Ls(0) Pg(1)    
    const html = new THREE.TextureLoader().load('/src/img/icons/html.png'                    );
    const css = new THREE.TextureLoader().load('/src/img/icons/css.png'                      );
    const js = new THREE.TextureLoader().load('/src/img/icons/js.png'                        );
    const node = new THREE.TextureLoader().load('/src/img/icons/node.png'                    );
    const react = new THREE.TextureLoader().load('/src/img/icons/react.png'                  );
    //IMG - Ls(1) Pg(1)    
    const ls111 = new THREE.TextureLoader().load('/src/img/icons/python.png'                 );
    const ls121 = new THREE.TextureLoader().load('/src/img/icons/java.png'                   );
    const ls131 = new THREE.TextureLoader().load('/src/img/icons/adobe.png'                  );
    const ls141 = new THREE.TextureLoader().load('/src/img/icons/sap.png'                    );
    const ls151 = new THREE.TextureLoader().load('/src/img/icons/blender.png'                );
    //IMG - Ls(0) Pg(2)    
    const ls012 = new THREE.TextureLoader().load('/src/img/icons/');
    const ls022 = new THREE.TextureLoader().load('/src/img/icons/');
    const ls032 = new THREE.TextureLoader().load('/src/img/icons/');
    const ls042 = new THREE.TextureLoader().load('/src/img/icons/');
    const ls052 = new THREE.TextureLoader().load('/src/img/icons/');
    //IMG - Ls(1) Pg(2)    
    const ls112 = new THREE.TextureLoader().load('/src/img/icons/');
    const ls122 = new THREE.TextureLoader().load('/src/img/icons/');
    const ls132 = new THREE.TextureLoader().load('/src/img/icons/');
    const ls142 = new THREE.TextureLoader().load('/src/img/icons/');
    const ls152 = new THREE.TextureLoader().load('/src/img/icons/');
    
    //IMG - Pj(0) Pg(1)    
    const pj011 = new THREE.TextureLoader().load('/src/img/icons/shop.png'       );
    const pj021 = new THREE.TextureLoader().load('/src/img/icons/report.png'     );
    const pj031 = new THREE.TextureLoader().load('/src/img/icons/calculadora.png');
    const pj041 = new THREE.TextureLoader().load('/src/img/icons/robot.png'      );
    const pj051 = new THREE.TextureLoader().load('/src/img/icons/'               );
    //IMG - Pj(1) Pg(1)    
    const pj111 = new THREE.TextureLoader().load('/src/img/icons/');
    const pj121 = new THREE.TextureLoader().load('/src/img/icons/');
    const pj131 = new THREE.TextureLoader().load('/src/img/icons/');
    const pj141 = new THREE.TextureLoader().load('/src/img/icons/');
    const pj151 = new THREE.TextureLoader().load('/src/img/icons/');
    //IMG - Pj(0) Pg(2)    
    const pj012 = new THREE.TextureLoader().load('/src/img/icons/');
    const pj022 = new THREE.TextureLoader().load('/src/img/icons/');
    const pj032 = new THREE.TextureLoader().load('/src/img/icons/');
    const pj042 = new THREE.TextureLoader().load('/src/img/icons/');
    const pj052 = new THREE.TextureLoader().load('/src/img/icons/');
    //IMG - Pj(1) Pg(2)    
    const pj112 = new THREE.TextureLoader().load('/src/img/icons/');
    const pj122 = new THREE.TextureLoader().load('/src/img/icons/');
    const pj132 = new THREE.TextureLoader().load('/src/img/icons/');
    const pj142 = new THREE.TextureLoader().load('/src/img/icons/');
    const pj152 = new THREE.TextureLoader().load('/src/img/icons/');        
    //white Buttons
    const lsButton = new THREE.TextureLoader().load('/src/img/icons/learning.png'           );
    const pjButton = new THREE.TextureLoader().load('/src/img/icons/portfolio.png'          );

    const contactButton = new THREE.TextureLoader().load('/src/img/icons/zap.png'           );
    const linkedinButton = new THREE.TextureLoader().load('/src/img/icons/linkedin.png'     );

    const planeGeometry = new THREE.PlaneGeometry();
    //Stickers Linha 1
    const htmlMaterial = new THREE.MeshBasicMaterial({ map: html, transparent: true });
    mesh01 = new THREE.Mesh(planeGeometry, htmlMaterial);
    scene.add(mesh01);
    mesh01.position.set(0.595,-0.255,0.001);
    mesh01.scale.set(0.38,0.38,1)
    mesh01.rotation.y = -0.085;

    const cssMaterial = new THREE.MeshBasicMaterial({ map: css, transparent: true });
    mesh02 = new THREE.Mesh(planeGeometry, cssMaterial);
    scene.add(mesh02);
    mesh02.position.set(1.095,-0.255,0.050);
    mesh02.scale.set(0.38,0.38,1)
    mesh02.rotation.y = -0.085;

    const jsMaterial = new THREE.MeshBasicMaterial({ map: js, transparent: true });
    mesh03 = new THREE.Mesh(planeGeometry, jsMaterial);
    scene.add(mesh03);
    mesh03.position.set(1.595,-0.255,0.100);
    mesh03.scale.set(0.38,0.38,1)
    mesh03.rotation.y = -0.085;

    const nodeMaterial = new THREE.MeshBasicMaterial({ map: node, transparent: true });
    mesh04 = new THREE.Mesh(planeGeometry, nodeMaterial);
    scene.add(mesh04);
    mesh04.position.set(2.095,-0.255,0.150);
    mesh04.scale.set(0.38,0.38,1);
    mesh04.rotation.y = -0.085;

    const reactMaterial = new THREE.MeshBasicMaterial({ map: react, transparent: true });
    mesh05 = new THREE.Mesh(planeGeometry, reactMaterial);
    scene.add(mesh05);
    mesh05.position.set(2.595,-0.255,0.200);
    mesh05.scale.set(0.38,0.38,1);
    mesh05.rotation.y = -0.085;

    mesh01.name = 'mesh01';
    mesh02.name = 'mesh02';
    mesh03.name = 'mesh03';
    mesh04.name = 'mesh04';
    mesh05.name = 'mesh05';

    //Stickers Linha 2
    const Material11 = new THREE.MeshBasicMaterial({ map: ls111, transparent: true });
    mesh11 = new THREE.Mesh(planeGeometry, Material11);
    scene.add(mesh11);
    mesh11.position.set(0.595,-0.605,0.001);
    mesh11.scale.set(0.3,0.3,1)
    mesh11.rotation.y = -0.085;

    const Material12 = new THREE.MeshBasicMaterial({ map: ls121, transparent: true });
    mesh12 = new THREE.Mesh(planeGeometry, Material12);
    scene.add(mesh12);
    mesh12.position.set(1.095,-0.605,0.050);
    mesh12.scale.set(0.38,0.38,1);
    mesh12.rotation.y = -0.085;

    const Material13 = new THREE.MeshBasicMaterial({ map: ls131, transparent: true });
    mesh13 = new THREE.Mesh(planeGeometry, Material13);
    scene.add(mesh13);
    mesh13.position.set(1.595,-0.605,0.100);
    mesh13.scale.set(0.38,0.38,1);
    mesh13.rotation.y = -0.085;

    const Material14 = new THREE.MeshBasicMaterial({ map: ls141, transparent: true });
    mesh14 = new THREE.Mesh(planeGeometry, Material14);
    scene.add(mesh14);
    mesh14.position.set(2.095,-0.605,0.150);
    mesh14.scale.set(0.38,0.38,1);
    mesh14.rotation.y = -0.085;

    const Material15 = new THREE.MeshBasicMaterial({ map: ls151, transparent: true });
    mesh15 = new THREE.Mesh(planeGeometry, Material15);
    scene.add(mesh15);
    mesh15.position.set(2.595,-0.605,0.200);
    mesh15.scale.set(0.3,0.3,1);
    mesh15.rotation.y = -0.085;

    mesh11.name = 'mesh11';
    mesh12.name = 'mesh12';
    mesh13.name = 'mesh13';
    mesh14.name = 'mesh14';
    mesh15.name = 'mesh15';

    const lsMaterial = new THREE.MeshBasicMaterial({ map: lsButton, transparent: true });
    lsMesh = new THREE.Mesh(planeGeometry, lsMaterial);
    scene.add(lsMesh);
    lsMesh.position.set(0.605,-1.192,0.003);
    lsMesh.scale.set(0.3,0.3,1)
    lsMesh.rotation.y = -0.085;

    const pjMaterial = new THREE.MeshBasicMaterial({ map: pjButton, transparent: true });
    pjMesh = new THREE.Mesh(planeGeometry, pjMaterial);
    scene.add(pjMesh);
    pjMesh.position.set(1.12,-1.189,0.055);
    pjMesh.scale.set(0.3,0.3,1)
    pjMesh.rotation.y = -0.085;

    const contactMaterial = new THREE.MeshBasicMaterial({ map: contactButton, transparent: true });
    contactMesh = new THREE.Mesh(planeGeometry, contactMaterial);
    scene.add(contactMesh);
    contactMesh.position.set(0.85,-1.76,0.0233);
    contactMesh.scale.set(0.3,0.3,1)
    contactMesh.rotation.y = -0.085;

    const linkedinMaterial = new THREE.MeshBasicMaterial({ map: linkedinButton, transparent: true });
    linkedinMesh = new THREE.Mesh(planeGeometry, linkedinMaterial);
    scene.add(linkedinMesh);
    linkedinMesh.position.set(2.295,-1.76,0.163);
    linkedinMesh.scale.set(0.3,0.3,1);
    linkedinMesh.rotation.y = -0.085;

    lsMesh.name = 'lsMesh';
    pjMesh.name = 'pjMesh';

    contactMesh.name = 'contactMesh';
    linkedinMesh.name = 'linkedinMesh';

    function callButtons(info,page) {
        if (info == 'ls') {
            if (page == 1) {
                mesh01.material.map = html;
                mesh02.material.map = css;
                mesh03.material.map = js;
                mesh04.material.map = node;
                mesh05.material.map = react;
                mesh01.scale.set(0.38,0.38,1);
                mesh02.scale.set(0.38,0.38,1);
                mesh03.scale.set(0.38,0.38,1);
                mesh04.scale.set(0.38,0.38,1);
                mesh05.scale.set(0.38,0.38,1);

                mesh11.material.map = ls111;
                mesh12.material.map = ls121;
                mesh13.material.map = ls131;
                mesh14.material.map = ls141;
                mesh15.material.map = ls151;
                mesh12.scale.set(0.38,0.38,1);
                mesh13.scale.set(0.38,0.38,1);
                mesh14.scale.set(0.38,0.38,1);
            }else if(page == 2){
                mesh01.material.map = ls012;
                mesh02.material.map = ls022;
                mesh03.material.map = ls032;
                mesh04.material.map = ls042;
                mesh05.material.map = ls052;
                mesh01.scale.set(0.3,0.3,1);
                mesh02.scale.set(0.3,0.3,1);
                mesh03.scale.set(0.3,0.3,1);
                mesh04.scale.set(0.3,0.3,1);
                mesh05.scale.set(0.3,0.3,1);

                mesh11.material.map = ls112;
                mesh12.material.map = ls122;
                mesh13.material.map = ls132;
                mesh14.material.map = ls142;
                mesh15.material.map = ls152;
                mesh12.scale.set(0.3,0.3,1);
                mesh13.scale.set(0.3,0.3,1);
                mesh14.scale.set(0.3,0.3,1);
            }
        }else if(info == 'pj'){
            if (page == 1) {
                mesh01.material.map = pj011;
                mesh02.material.map = pj021;
                mesh03.material.map = pj031;
                mesh04.material.map = pj041;
                mesh05.material.map = pj051;
                mesh01.scale.set(0.3,0.3,1);
                mesh02.scale.set(0.3,0.3,1);
                mesh03.scale.set(0.3,0.3,1);
                mesh04.scale.set(0.3,0.3,1);
                mesh05.scale.set(0.3,0.3,1);

                mesh11.material.map = pj111;
                mesh12.material.map = pj121;
                mesh13.material.map = pj131;
                mesh14.material.map = pj141;
                mesh15.material.map = pj151;
                mesh12.scale.set(0.3,0.3,1);
                mesh13.scale.set(0.3,0.3,1);
                mesh14.scale.set(0.3,0.3,1);
            }else if(page == 2){
                mesh01.material.map = pj012;
                mesh02.material.map = pj022;
                mesh03.material.map = pj032;
                mesh04.material.map = pj042;
                mesh05.material.map = pj052;
                mesh01.scale.set(0.3,0.3,1);
                mesh02.scale.set(0.3,0.3,1);
                mesh03.scale.set(0.3,0.3,1);
                mesh04.scale.set(0.3,0.3,1);
                mesh05.scale.set(0.3,0.3,1);

                mesh11.material.map = pj112;
                mesh12.material.map = pj122;
                mesh13.material.map = pj132;
                mesh14.material.map = pj142;
                mesh15.material.map = pj152;
                mesh12.scale.set(0.3,0.3,1);
                mesh13.scale.set(0.3,0.3,1);
                mesh14.scale.set(0.3,0.3,1);
            }
        }
    }callButtons();

    function iconsHideShow(on) {
        if (on == false) {
            mesh01.visible = false;
            mesh02.visible = false;
            mesh03.visible = false;
            mesh04.visible = false;
            mesh05.visible = false;
            
            mesh11.visible = false;
            mesh12.visible = false;
            mesh13.visible = false;
            mesh14.visible = false;
            mesh15.visible = false;

            lsMesh.visible = false;
            pjMesh.visible = false;

            contactMesh.visible = false;
            linkedinMesh.visible = false;
        }
        else{
            mesh01.visible = true;
            mesh02.visible = true;
            mesh03.visible = true;
            mesh04.visible = true;
            mesh05.visible = true;
            mesh11.visible = true;
            mesh12.visible = true;
            mesh13.visible = true;
            mesh14.visible = true;
            mesh15.visible = true;

            lsMesh.visible = true;
            pjMesh.visible = true;

            contactMesh.visible = true;
            linkedinMesh.visible = true;
        }
    }iconsHideShow(on);

    document.getElementById("language").onclick = function() {language()};
    function language(){
        if (lang != 'br') {
            lang = 'br';
            document.getElementById("language").src = '/src/img/icons/brasil.png'
            state = 'redo'
            if(on == true){
                state = 'redo'
                textFrameContinue(state)
                state = 'firstText'
            }else{
                textFrameContinue('none')
            }
        }else{
            lang = 'en';
            document.getElementById("language").src = '/src/img/icons/usa.png'
            if(on == true){
                state = 'redo'
                textFrameContinue(state)
                state = 'firstText'
            }else{
                textFrameContinue('none')
            }
        }
    }

    document.getElementById("tutorial").onclick = function() {openTutorial()};
    function openTutorial(){
        document.getElementById("tutorialDiv").style.visibility = "visible";
    }

    document.getElementById("closeButton").onclick = function() {closeTutorial()};
    function closeTutorial(){
        document.getElementById("tutorialDiv").style.visibility = "hidden";
    }

    document.getElementById("nextButton").onclick = function() {nextTutorial()};
    function nextTutorial(){
        if (tutorialPage < 9) {
            tutorialPage += 1;
            updateTutorial();
        }
    }

    document.getElementById("backButton").onclick = function() {backTutorial()};
    function backTutorial(){
        if (tutorialPage > 1) {
            tutorialPage -= 1;
            updateTutorial();
        }
    }

    function updateTutorial(){
        //document.getElementById("tutorialFigCaption")
        if (tutorialPage == 1) {
            document.getElementById("ptTitle").textContent = 'Como Abrir'
            document.getElementById("enTitle").textContent = 'How to open'

            document.getElementById("tutorialImg").src = '/src/img/tutorial/1.png'

            document.getElementById("tutorialFigCaption").textContent = 
            '\r\nAperte a tecla espaço ou clique no botão amarelo para abrir a pokedex.\r\n\r\n'
            document.getElementById("tutorialFigCaption").textContent += 
            'Press the space key or click on the yellow button to open the pokedex.'
        }else if (tutorialPage == 2) {
            document.getElementById("ptTitle").textContent = 'Controles'
            document.getElementById("enTitle").textContent = 'Controls'
            document.getElementById("tutorialImg").src = '/src/img/tutorial/3.png'
            document.getElementById("tutorialFigCaption").textContent = 
            '\r\n1 - Botão de Ligar / Desligar.\r\n\r\n'
            document.getElementById("tutorialFigCaption").textContent += 
            '1 - Power On / Off Button.'
        }else if (tutorialPage == 3) {
            document.getElementById("ptTitle").textContent = 'Controles'
            document.getElementById("enTitle").textContent = 'Controls'
            document.getElementById("tutorialImg").src = '/src/img/tutorial/3.png'
            document.getElementById("tutorialFigCaption").textContent = 
            '\r\n2 - D-Pad: Seta para baixo avança para próximo texto.\r\n\r\n'
            document.getElementById("tutorialFigCaption").textContent += 
            '2 - D-Pad: Down arrow advances to next text.'
        }else if (tutorialPage == 4) {
            document.getElementById("ptTitle").textContent = 'Controles'
            document.getElementById("enTitle").textContent = 'Controls'
            document.getElementById("tutorialImg").src = '/src/img/tutorial/3.png'
            document.getElementById("tutorialFigCaption").textContent = 
            '\r\n3 - Select (Vermelho) Retorna para inicio, Pause (Azul) Abre link do projeto.\r\n\r\n'
            document.getElementById("tutorialFigCaption").textContent += 
            '3 - Select (Red) Returns to beginning, Pause (Blue) Opens project link.'
        }else if (tutorialPage == 5) {
            document.getElementById("ptTitle").textContent = 'Controles'
            document.getElementById("enTitle").textContent = 'Controls'
            document.getElementById("tutorialImg").src = '/src/img/tutorial/4.png'
            document.getElementById("tutorialFigCaption").textContent = 
            '\r\n4 - Tela onde o texto é exibido.\r\n\r\n'
            document.getElementById("tutorialFigCaption").textContent += 
            '4 - Screen where the text is displayed.'
        }else if (tutorialPage == 6) {
            document.getElementById("ptTitle").textContent = 'Controles'
            document.getElementById("enTitle").textContent = 'Controls'
            document.getElementById("tutorialImg").src = '/src/img/tutorial/5.png'
            document.getElementById("tutorialFigCaption").textContent = 
            '\r\n5 - Teclado azul para exibir o conteúdo desejado.\r\n\r\n'
            document.getElementById("tutorialFigCaption").textContent += 
            '5 - Blue keyboard to display the desired content.'
        }else if (tutorialPage == 7) {
            document.getElementById("ptTitle").textContent = 'Controles'
            document.getElementById("enTitle").textContent = 'Controls'
            document.getElementById("tutorialImg").src = '/src/img/tutorial/6.png'
            document.getElementById("tutorialFigCaption").textContent = 
            '\r\n6 - Alterna entre as páginas 1 e 2 do teclado.\r\n\r\n'
            document.getElementById("tutorialFigCaption").textContent += 
            '6 - Toggles between page 1 and 2 of the keyboard.'
        }else if (tutorialPage == 8) {
            document.getElementById("ptTitle").textContent = 'Controles'
            document.getElementById("enTitle").textContent = 'Controls'
            document.getElementById("tutorialImg").src = '/src/img/tutorial/6.png'
            document.getElementById("tutorialFigCaption").textContent = 
            '\r\n7 - Alterna entre as páginas de projetos e conhecimentos do teclado.\r\n\r\n'
            document.getElementById("tutorialFigCaption").textContent += 
            '7 - Toggles between project and knowledge pages of the keyboard.'
        }else if (tutorialPage == 9) {
            document.getElementById("ptTitle").textContent = 'Controles'
            document.getElementById("enTitle").textContent = 'Controls'
            document.getElementById("tutorialImg").src = '/src/img/tutorial/7.png'
            document.getElementById("tutorialFigCaption").textContent = 
            '\r\n8 - Links de contato.\r\n\r\n'
            document.getElementById("tutorialFigCaption").textContent += 
            '8 - Contact links.'
        }
    } 
    
    document.getElementById("sound").onclick = function() {soundMute()};
    function soundMute(){
        if (sound == true) {
            document.getElementById("sound").src = '/src/img/icons/off.png'
            theme.stop();
            sound = false;
        }else{
            document.getElementById("sound").src = '/src/img/icons/on.png'
            theme.play();
            sound = true;
        }
        
    }

    document.getElementById("buttonPlay").onclick = function() {buttonPlay()};
    function buttonPlay(){
        document.getElementById("mainScreen").style.visibility = "hidden";
        document.getElementById("frente1").style.visibility = "visible";
        document.getElementById("frente2").style.visibility = "visible";
        document.getElementById("frente3").style.visibility = "visible";
        document.getElementById("buttonPlay").style.visibility = "hidden";
        theme.play();
        pokedex.scene.visible = true;
    }

    //Modelo
    
    const loaderT = new THREE.TextureLoader();
    loaderG.load('/src/models/Pokedex3DModel.gltf', function (gltf) {
        pokedex = gltf
        //Transformações no modelo
        pokedex.scene.rotation.x = Math.PI / 2;
        pokedex.scene.scale.x = 0.2;
        pokedex.scene.scale.y = 0.2;
        pokedex.scene.scale.z = 0.2; //pokedex.scene.getObjectByName('Joystick_Cima001').scale.x = 2;
        //Adiciona modelo na cena
        scene.add(pokedex.scene);
        pokedex.scene.visible = false;

        tela = pokedex.scene.getObjectByName('Tela003');
        telaM = tela.material

        //Animação do modelo
        mixer = new THREE.AnimationMixer(pokedex.scene);
        mixer.addEventListener('finished', animationFinished);
        const clips = pokedex.animations;
        
        loadAnimations(clips);

        selectToOutline();
    })

    const colorM = new THREE.Color('#1E90FF')
    const colorE = new THREE.Color('#1E90FF')
    material1 = new THREE.MeshLambertMaterial({color: colorM, emissive: colorE});
    
    //#458b00 #006400

    function loadAnimations(clips){
        //Abre Pokedex
        const clip = THREE.AnimationClip.findByName(clips, 'EmptyAction');
        openPokedex = mixer.clipAction(clip);
        openPokedex.clampWhenFinished = true;
        openPokedex.loop = THREE.LoopOnce;

        //PressButton
        let pressClip = THREE.AnimationClip.findByName(clips, 'Press_On/Off');
        pressButton = mixer.clipAction(pressClip)
        pressButton.loop = THREE.LoopOnce;

        //PressCima
        pressClip = THREE.AnimationClip.findByName(clips, 'Joystick_Cima.001Action');
        cima = mixer.clipAction(pressClip)
        cima.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, 'Joystick_Baixo.001Action');
        baixo = mixer.clipAction(pressClip)
        baixo.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, 'Joystick_Esquedo.001Action');
        esq = mixer.clipAction(pressClip)
        esq.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, 'Joystick_Direita.001Action');
        dir = mixer.clipAction(pressClip)
        dir.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, 'Select/Pause_Button.006Action.002');
        sl1 = mixer.clipAction(pressClip)
        sl1.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, 'Select/Pause_Button.007Action');
        sl2 = mixer.clipAction(pressClip)
        sl2.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, '1.002Action');
        b12 = mixer.clipAction(pressClip)
        b12.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, '1.003Action');
        b13 = mixer.clipAction(pressClip)
        b13.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, '2.002Action');
        b22 = mixer.clipAction(pressClip)
        b22.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, '2.003Action');
        b23 = mixer.clipAction(pressClip)
        b23.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, '3.002Action');
        b32 = mixer.clipAction(pressClip)
        b32.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, '3.003Action');
        b33 = mixer.clipAction(pressClip)
        b33.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, '4.002Action');
        b42 = mixer.clipAction(pressClip)
        b42.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, '4.003Action');
        b43 = mixer.clipAction(pressClip)
        b43.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, '5.002Action');
        b52 = mixer.clipAction(pressClip)
        b52.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, '5.003Action');
        b53 = mixer.clipAction(pressClip)
        b53.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, 'Botão_BrancoEsquerdo.001Action');
        bbe = mixer.clipAction(pressClip)
        bbe.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, 'Botão_BrancBotão_BrancoDireito.001Action');
        bbd = mixer.clipAction(pressClip)
        bbd.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, 'VisorMenor1.001Action');
        vm1 = mixer.clipAction(pressClip)
        vm1.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, 'VisorMenor2.001Action');
        vm2 = mixer.clipAction(pressClip)
        vm2.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, 'SelectEsquerdo.001Action');
        se1 = mixer.clipAction(pressClip)
        se1.loop = THREE.LoopOnce;

        //PressButton
        pressClip = THREE.AnimationClip.findByName(clips, 'StartEsquerdo.001Action');
        se2 = mixer.clipAction(pressClip)
        se2.loop = THREE.LoopOnce;
    }
    
    //Background
    var backgroundTexture = loaderT.load("/src/img/plainsbackground.jpg");
    scene.background = backgroundTexture

    // PostProcessing and OutlineEffect -- Inicio
    composer = new EffectComposer( renderer );

    const renderPass = new RenderPass( scene, camera );
    composer.addPass( renderPass );

    outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
    composer.addPass( outlinePass );

    outlinePassBlack = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
    
    function selectToOutline() {
        selectedObjectsBlack.push(pokedex.scene);
    }
    outlinePassBlack.overlayMaterial.blending = THREE.SubtractiveBlending
    outlinePassBlack.selectedObjects = selectedObjectsBlack;

    const outputPass = new OutputPass();
    composer.addPass( outlinePassBlack );
    composer.addPass( outputPass );

    effectFXAA = new ShaderPass( FXAAShader );
    effectFXAA.uniforms[ 'resolution' ].value.set( 0.5 / window.innerWidth, 0.5 / window.innerHeight );
    composer.addPass( effectFXAA );

    var params = {
        edgeStrength: 50,
        edgeGlow: 0,
        edgeThickness: 0.25,
        pulsePeriod: 0,
        usePatternTexture: false
    }

    outlinePassBlack.edgeStrength = params.edgeStrength;
    outlinePassBlack.edgeGlow = params.edgeGlow;
    outlinePassBlack.visibleEdgeColor.set(0xffffff);
    outlinePassBlack.hiddenEdgeColor.set(0xffffff);

    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.addEventListener( 'pointermove', onPointerMove );
    renderer.domElement.addEventListener('click', onClick, false);

    let imgElement = document.createElement('img');
    imgElement.src = '/src/img/euimgzap.jpg'
    imgElement.className = 'screenImage'
    const screenFrame = new CSS3DObject(imgElement);
    scene.add(screenFrame);
    screenFrame.position.x = -1.32;
    screenFrame.position.y = 0.1289; 
    screenFrame.visible = false;

    let screenElement = document.createElement('p');
    screenElement.className = 'screenText'
    screenElement.id = 'screenText'
    screenElement.setAttribute('style', 'white-space: pre;');
    textFrameContinue('none');
                              
    const textFrame = new CSS3DObject(screenElement);
    textFrame.scale.set(0.008,0.008,1);
    textFrame.position.set(1.61,-7.45,0.1); 
    textFrame.rotation.y = -0.085;
    scene.add(textFrame)
    textFrame.visible = false;

    let arrowElement = document.createElement('p');
    arrowElement.className = 'arrow left'
    arrowElement.textContent = '';
    arrowDown = new CSS3DObject(arrowElement);
    arrowDown.scale.set(0.008,0.008,1);
    arrowDown.position.set(1.61,-7.85,0.1);
    arrowDown.rotation.z = 5.5;
    scene.add(arrowDown)
    arrowDown.visible = false;

    async function textFrameContinue(state){
        if (lang == 'br') {
            if (state == 'firstText') {
                textFrame.visible = false;
                arrowDown.visible = false;
                screenElement.textContent = '-------------- Formaçao --------------\r\n\r\n'
                screenElement.textContent += 'UNICSUL - Universidade Cruzeiro do Sul\r\n\r\n'
                screenElement.textContent += 'Bacharelado, Ciencias da computaçao\r\n'
                screenElement.textContent += '          fev de 2021 - dez de 2024\r\n\r\n'
                screenElement.textContent += 'Competências: Resoluçao de problemas,\r\n'
                screenElement.textContent += ' Gestao de projetos,Trabalho em equipe\r\n'
                screenElement.textContent += ' Inglês,Capacidade de organizaçao.\r\n'
                await delay(50);
                textFrame.visible = true;
                await delay(5000);
                arrowDown.visible = true;
            }else if (state == 'none') {
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Nome: Gabriel Dias\r\n\r\n'
                screenElement.textContent += 'Idade: 20 Anos\r\n\r\n'
                screenElement.textContent += 'Traços: Criativo, Proativo, Sociavel\r\n\r\n'
                screenElement.textContent += 'Sobre: Gosta muito de conhecer novas\r\n tecnologias,soluciona facilmente\r\n problemas, gosta de bolinho de chuva.'
            }else if(state == 'html'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Linguagem: HTML\r\n\r\n'
                screenElement.textContent += 'Nível: Avançado \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: HTML semântico. \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'omg'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/nevergona.gif'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Rick Rolled'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'css'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''//sla
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Linguagem: CSS\r\n\r\n'
                screenElement.textContent += 'Nível: Avançado \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: CSS pratico.'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'js'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Linguagem: JavaScript\r\n\r\n'
                screenElement.textContent += 'Nível: Avançado\r\n\r\n'
                screenElement.textContent += 'Conhecimentos: Tipos de dados,Opera-\r\n'
                screenElement.textContent += ' dores,Estruturas de controle,Funçoes,\r\n'
                screenElement.textContent += ' Objetos,Exceçoes.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'node'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: Node.js\r\n\r\n'
                screenElement.textContent += 'Nível: Estudando \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: Instalaçao,NPM,Biblio-\r\n'
                screenElement.textContent += ' tecas,API.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'react'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Biblioteca: React\r\n\r\n'
                screenElement.textContent += 'Nível: Estudando \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: API,Componentes,Contex-\r\n'
                screenElement.textContent += ' to,Hooks,Rotas.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'secondText'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = '------------ Experiencia ------------\r\n\r\n'
                screenElement.textContent += 'Fortesec - Estagiario\r\n\r\n'
                screenElement.textContent += ' Funçao: Analista de Dados - BI\r\n'
                screenElement.textContent += ' Fev de 2024 / o momento - 6 meses\r\n'
                screenElement.textContent += ' Sao Paulo, Brasil\r\n\r\n'
                screenElement.textContent += 'Competências: Dashboards,Inglês\r\n'
                screenElement.textContent += ' Python, SQL-Server, Oracle.\r\n'
                screenElement.textContent += ' Comunicaçao,Trabalho em equipe.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'ls111'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Linguagem: Python\r\n\r\n'
                screenElement.textContent += 'Nível: Básico \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: Tipos de dados,Opera-\r\n'
                screenElement.textContent += ' dores,Estruturas de controle,Funçoes.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'ls121'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Linguagem: Java\r\n\r\n'
                screenElement.textContent += 'Nível: Intermediário \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: Tipos de dados,Opera-\r\n'
                screenElement.textContent += ' dores,Estruturas de controle,Funçoes,\r\n'
                screenElement.textContent += ' Exceçoes,POO.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'ls131'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: Pacote Adobe\r\n\r\n'
                screenElement.textContent += 'Nível: Intermediário \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: Photoshop,Illustrator,\r\n'
                screenElement.textContent += ' Premiere Pro,After Effects,Substance.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'ls141'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: SAP\r\n\r\n'
                screenElement.textContent += 'Nível: Básico \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: Sistema SAP,Dados,\r\n'
                screenElement.textContent += ' Plano de manutençao,Gerenciamento,\r\n'
                screenElement.textContent += ' Controle de Qualidade,Planejamento\r\n'
                screenElement.textContent += ' de produçao e vendas,Contabilidade,\r\n'
                screenElement.textContent += ' Custos e Orçamentos. \r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'ls151'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: Blender\r\n\r\n'
                screenElement.textContent += 'Nível: Básico \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: Modelagem,Transforma-\r\n'
                screenElement.textContent += ' çoes,Materiais,Texturas,Animaçoes.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls012
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls012 \r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls022
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls022\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls032
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls032\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls042
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls042\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls052
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls052\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls112
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls112\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls122
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls122\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls132
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls132\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls142
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls142\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls152
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls152\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'pj011'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/loja.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: Loja HouseTec\r\n\r\n'
                screenElement.textContent += 'Tecnologias: HTML,CSS,JavaScript,JSON \r\n\r\n'
                screenElement.textContent += 'Sobre: Portfólio interativo simulando \r\n'
                screenElement.textContent += '      uma loja na web,com catálogo, \r\n'
                screenElement.textContent += '      biblioteca, pagina do produto, \r\n'
                screenElement.textContent += '      e no futuro com funçoes de car- \r\n'
                screenElement.textContent += '      rinho e checkout. \r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'pj021'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/tabelafii.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: Tabela de Investimentos\r\n\r\n'
                screenElement.textContent += 'Tecnologias: HTML,CSS,JavaScript,JSON \r\n\r\n'
                screenElement.textContent += 'Sobre: Tabela de investimentos que\r\n'
                screenElement.textContent += ' busca informaçoes em uma API e exibe\r\n'
                screenElement.textContent += ' determinados ativos, destacando com\r\n'
                screenElement.textContent += ' com retorno positivo ou negativo.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'pj031'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/calculadora.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: Calculadora Web\r\n\r\n'
                screenElement.textContent += 'Tecnologias: HTML, CSS, JavaScript \r\n\r\n'
                screenElement.textContent += 'Sobre: Calculadora online e interativa\r\n'
                screenElement.textContent += '      feita para ser hospedada na web\r\n'
                screenElement.textContent += '      com seu design feito por CSS\r\n'
                screenElement.textContent += '      e funcionalidade por JavaScript\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'pj041'){ //pj041
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/telemed.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: Telemedicina Contra o Cancêr\r\n\r\n'
                screenElement.textContent += 'Tecnologias: React-Native, TensorFlow, \r\n'
                screenElement.textContent += '             Python, Banco de dados \r\n\r\n'
                screenElement.textContent += 'Sobre: Aplicativo Android/IOS com IA \r\n'
                screenElement.textContent += '       Treinada para detectar labios,\r\n'
                screenElement.textContent += '       identificar fontes de cancêr,\r\n'
                screenElement.textContent += '       e marcar consultas medicas no\r\n'
                screenElement.textContent += '       local mais proximo\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj051
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj051\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj111
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj111\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj121
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj121\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj131
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj131\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj141
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj141\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj151
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj151\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj012
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj012\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj022
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj022\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj032
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj032\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj042
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj042\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj052
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj052\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj112
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj112\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj122
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj122\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj132
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/'
                screenElement.textContent = 'Projeto: pj132\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj142
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj142\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj152
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj152\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if (state == 'redo') {
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Nome: Gabriel Dias\r\n\r\n'
                screenElement.textContent += 'Idade: 20 Anos\r\n\r\n'
                screenElement.textContent += 'Traços: Criativo, Proativo, Sociavel\r\n\r\n'
                screenElement.textContent += 'Sobre: Gosta muito de conhecer novas\r\n tecnologias,soluciona facilmente\r\n problemas, gosta de bolinho de chuva,\r\n a procura de um estagio.'
                await delay(50);
                textFrame.visible = true;
                await delay(5000);
                arrowDown.visible = true;
            }
        }else{
            if (state == 'firstText') {
                textFrame.visible = false;
                arrowDown.visible = false;
                screenElement.textContent = '-------- Academic Background --------\r\n\r\n'
                screenElement.textContent += 'UNICSUL - Universidade Cruzeiro do Sul\r\n\r\n'
                screenElement.textContent += 'Bachelor degree, Computer science\r\n'
                screenElement.textContent += '          Feb 2021 - Dec 2024\r\n\r\n'
                screenElement.textContent += 'Skills: Problem solving,\r\n'
                screenElement.textContent += ' Project management,Team work\r\n'
                screenElement.textContent += ' English,Organization capacity.\r\n'
                await delay(50);
                textFrame.visible = true;
                await delay(5000);
                arrowDown.visible = true;
            }else if (state == 'none') {
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Name: Gabriel Dias\r\n\r\n'
                screenElement.textContent += 'Age: 20 years\r\n\r\n'
                screenElement.textContent += 'Traits: Creative, Proactive, Sociable\r\n\r\n'
                screenElement.textContent += 'About: Like explore new technologies,\r\n'
                screenElement.textContent += ' Easily solve problems, Likes funnel\r\n'
                screenElement.textContent += '  cake, Looking for an internship.'
            }else if(state == 'html'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Language: HTML\r\n\r\n'
                screenElement.textContent += 'Level: Advanced \r\n\r\n'
                screenElement.textContent += 'Knowledge: Semantic HTML. \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'omg'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/nevergona.gif'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Rick Rolled'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'css'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Language: CSS\r\n\r\n'
                screenElement.textContent += 'Level: Advanced \r\n\r\n'
                screenElement.textContent += 'Knowledge: Practical CSS. \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'js'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Language: JavaScript\r\n\r\n'
                screenElement.textContent += 'Level: Advanced\r\n\r\n'
                screenElement.textContent += 'Knowledge: Data types, Operators\r\n'
                screenElement.textContent += ' Control Structures, Functions,\r\n'
                screenElement.textContent += ' Objects, Exceptions.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'node'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: Node.js\r\n\r\n'
                screenElement.textContent += 'Level: Studying \r\n\r\n'
                screenElement.textContent += 'Knowledge: Installation, NPM,\r\n'
                screenElement.textContent += ' Libraries, API.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'react'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Library: React\r\n\r\n'
                screenElement.textContent += 'Level: Studying \r\n\r\n'
                screenElement.textContent += 'Knowledge: API, Components, Context\r\n'
                screenElement.textContent += ' Hooks, Routes.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'secondText'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = '------------ Experience -------------\r\n\r\n'
                screenElement.textContent += 'Fortesec - Internship\r\n\r\n'
                screenElement.textContent += ' Funçao: Data Analyst - BI\r\n'
                screenElement.textContent += ' Feb, 2024 / the moment - 6 months\r\n'
                screenElement.textContent += ' Sao Paulo, Brazil\r\n\r\n'
                screenElement.textContent += 'Skills: Dashboards, English\r\n'
                screenElement.textContent += ' Python, SQL-Server, Oracle.\r\n'
                screenElement.textContent += ' Communication,Team work.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'ls111'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Language: Python\r\n\r\n'
                screenElement.textContent += 'Level: Basic \r\n\r\n'
                screenElement.textContent += 'Knowledge: Data types, Operators\r\n'
                screenElement.textContent += ' Control Structures, Functions.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'ls121'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Language: Java\r\n\r\n'
                screenElement.textContent += 'Level: Intermediary \r\n\r\n'
                screenElement.textContent += 'Knowledge: Data types, Operators\r\n'
                screenElement.textContent += ' Control Structures, Functions.\r\n'
                screenElement.textContent += ' Exceptions, OOP.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'ls131'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: Adobe package\r\n\r\n'
                screenElement.textContent += 'Nível: Intermediary \r\n\r\n'
                screenElement.textContent += 'Knowledge: Photoshop,Illustrator,\r\n'
                screenElement.textContent += ' Premiere Pro,After Effects,Substance.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'ls141'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: SAP\r\n\r\n'
                screenElement.textContent += 'Level: Basic \r\n\r\n'
                screenElement.textContent += 'Knowledge: SAP System, Data,\r\n'
                screenElement.textContent += ' Maintenance plan, Management,\r\n'
                screenElement.textContent += ' Quality control, Production and sales\r\n'
                screenElement.textContent += '  planning, Accounting, Costs\r\n'
                screenElement.textContent += '  and Budgets. \r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'ls151'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: Blender\r\n\r\n'
                screenElement.textContent += 'Level: Basic \r\n\r\n'
                screenElement.textContent += 'Knowledge: Modeling, Transformations,\r\n'
                screenElement.textContent += ' Materials, Textures, Animations.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls012
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls012 \r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls022
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls022\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls032
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls032\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls042
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls042\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls052
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls052\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls112
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls112\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls122
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls122\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls132
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls132\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls142
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls142\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //ls152
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Software: ls152\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'pj011'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/loja.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Project: HouseTec Store\r\n\r\n'
                screenElement.textContent += 'Technologies: HTML,CSS,JavaScript,JSON \r\n\r\n'
                screenElement.textContent += 'About: Interactive portfolio simula-\r\n'
                screenElement.textContent += ' ting a web store, with catalog,\r\n'
                screenElement.textContent += ' library product page, and in the\r\n'
                screenElement.textContent += ' future with cart and checkout\r\n'
                screenElement.textContent += ' functions.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'pj021'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/tabelafii.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Project: Tabela de Investimentos\r\n\r\n'
                screenElement.textContent += 'Technologies: HTML,CSS,JavaScript,JSON \r\n\r\n'
                screenElement.textContent += 'About: Investment table that searches\r\n'
                screenElement.textContent += ' for information in an API and\r\n'
                screenElement.textContent += ' displays certain assets,highlighting\r\n'
                screenElement.textContent += ' whether they have a positive or\r\n'
                screenElement.textContent += ' negative return.\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'pj031'){
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/calculadora.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Project: Calculadora Web\r\n\r\n'
                screenElement.textContent += 'Technologies: HTML, CSS, JavaScript \r\n\r\n'
                screenElement.textContent += 'About: Online and interactive\r\n'
                screenElement.textContent += ' calculator made to be hosted on\r\n'
                screenElement.textContent += ' the web with its design made by CSS\r\n'
                screenElement.textContent += ' and functionality by JavaScript\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'pj041'){ //pj041
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/telemed.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Project: Telemedicine Against Cancer\r\n\r\n'
                screenElement.textContent += 'Technologies: React-Native, TensorFlow, \r\n'
                screenElement.textContent += '              Python, Database \r\n\r\n'
                screenElement.textContent += 'About: Android/IOS app with an AI \r\n'
                screenElement.textContent += '       Trained to detect lips,\r\n'
                screenElement.textContent += '       identify sources of cancer,\r\n'
                screenElement.textContent += '       and schedule medical\r\n'
                screenElement.textContent += '       appointments\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj051
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj051\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj111
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj111\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj121
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj121\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj131
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj131\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj141
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj141\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj151
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj151\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj012
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj012\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj022
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj022\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj032
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj032\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj042
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj042\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj052
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj052\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj112
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj112\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj122
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj122\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj132
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/'
                screenElement.textContent = 'Projeto: pj132\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj142
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj142\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if(state == 'null'){ //pj152
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/screen/w.i.p.jpg'
                screenFrame.scale.set(1.62,1.22,1)
                screenElement.textContent = 'Projeto: pj152\r\n\r\n'
                screenElement.textContent += 'Nível: TEMPLATE \r\n\r\n'
                screenElement.textContent += 'Conhecimentos: LOUREN IPSON \r\n\r\n'
                await delay(50);
                textFrame.visible = true;
            }else if (state == 'redo') {
                textFrame.visible = false;
                arrowDown.visible = false;
                imgElement.src = ''
                imgElement.src = '/src/img/euimgzap.jpg'
                screenFrame.scale.set(1,1,1)
                screenElement.textContent = 'Name: Gabriel Dias\r\n\r\n'
                screenElement.textContent += 'Age: 20 years\r\n\r\n'
                screenElement.textContent += 'Traits: Creative, Proactive, Sociable\r\n\r\n'
                screenElement.textContent += 'About: Like explore new technologies,\r\n'
                screenElement.textContent += ' Easily solve problems, Likes funnel\r\n'
                screenElement.textContent += '  cake, Looking for an internship.'
                await delay(50);
                textFrame.visible = true;
                await delay(5000);
                arrowDown.visible = true;
            }
        }
    }

    function onPointerMove( event ) {

        if ( event.isPrimary === false ) return;

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        checkIntersection();

    }

    function addSelectedObject( object ) {

        selectedObjects = [];
        selectedObjects.push( object );

    }

    function checkIntersection() {

        raycaster.setFromCamera( mouse, camera );

        const intersects = raycaster.intersectObject( scene, true );

        if ( intersects.length > 0 ) {
            const selectedObject = intersects[ 0 ].object;
            if( selectedObject.name !== 'Base_esquerda003' //BlackList
                && selectedObject.name != 'Cube070'
                && selectedObject.name != 'Cube070_1'
                && selectedObject.name != 'Plate_movel003'
                && selectedObject.name != 'Cube080'
                && selectedObject.name != 'Cube080_1'
                && selectedObject.name != 'Fechadura_meio002'
                && selectedObject.name != 'Led_Principal003'
                && selectedObject.name != 'Anel_Led'
                && selectedObject.name != 'led_vermelho'
                && selectedObject.name != 'led_amarelo'
                && selectedObject.name != 'led_verde'
                && selectedObject.name != 'Botão003'
                && selectedObject.name != 'Joystick_Meio001'
                && selectedObject.name != 'mesh01'
                && selectedObject.name != 'mesh02'
                && selectedObject.name != 'mesh03'
                && selectedObject.name != 'mesh04'
                && selectedObject.name != 'mesh05'
                && selectedObject.name != 'mesh11'
                && selectedObject.name != 'mesh12'
                && selectedObject.name != 'mesh13'
                && selectedObject.name != 'mesh14'
                && selectedObject.name != 'mesh15'
                && selectedObject.name != 'lsMesh'
                && selectedObject.name != 'pjMesh'
                && selectedObject.name != 'contactMesh'
                && selectedObject.name != 'linkedinMesh'
                && selectedObject.name != 'som'
            ){
                addSelectedObject( selectedObject );
                outlinePass.selectedObjects = selectedObjects;
            }  

        } else {

            //outlinePass.selectedObjects = [];

        }

    }

    function onClick(event) {
        event.preventDefault();
      
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
        raycaster.setFromCamera(mouse, camera);
      
        var intersectsC = raycaster.intersectObjects(scene.children, true);
        
        async function onClickButon(x){
            if (x == 'OnOff_Button003') {
                pressButton.reset();
                pressButton.play();
                if(screenFrame.visible == false){
                    onSound.stop();
                    onSound.play();
                    controls.enableRotate  = false;
                    camera.rotation.set( 0, 0, 0 );
                    camera.position.set( 0, 0, 6 );
                    tela.material = material1;
                    screenFrame.visible = true;
                    await delay(500);             
                    state = 'firstText';
                    textFrame.visible = true;
                    on = true;
                    page = 1;
                    iconsHideShow(on);
                    await delay(5000);
                    const element = document.getElementById('screenText');
                    element.addEventListener("animationend", arrowVisible(state));
                    
                }else{
                    offSound.stop();
                    offSound.play();
                    await delay(500);
                    screenFrame.visible = false;
                    tela.material = telaM;
                    textFrame.visible = false;
                    controls.enableRotate = true;
                    arrowDown.visible = false;
                    link = '';
                    page = 1;
                    info = 'ls';
                    on = false;
                    iconsHideShow(on) 
                    textFrameContinue('none');
                    callButtons(info,page);
                }
            }

            if(x == 'fechadura001'){
                dexOpen();
            }
            
            if(on == true){
                if(x == 'Joystick_Cima001'){
                    pressSound()
                    cima.reset();
                    cima.play();
                    if (state == 'secondText') {
                        state = 'redo';
                        textFrameContinue(state);
                        state = 'firstText';
                    }else if (state == 'end') {
                        state = 'firstText';
                        textFrameContinue(state);
                        state = 'secondText';
                    }
                    if(fun == 0 || fun == 1){
                        fun++
                    }else{
                        fun = 0;
                    }
                }else if(x == 'Joystick_Baixo001'){
                    pressSound();
                    baixo.reset();
                    baixo.play();
                    if (state == 'firstText') {
                        textFrameContinue(state);
                        state = 'secondText';
                    }else if (state == 'secondText') {
                        textFrameContinue(state);
                        state = 'end';
                    }
                    if(fun == 2 || fun == 3){
                        fun++
                    }else{
                        fun = 0;
                    }
                }else if(x == 'Joystick_Esquedo001'){
                    pressSound();
                    esq.reset();
                    esq.play();
                    if(fun == 4 || fun == 6){
                        fun++
                    }else{
                        fun = 0;
                    }
                }else if(x == 'Joystick_Direita001'){
                    pressSound()
                    dir.reset();
                    dir.play();
                    if(fun == 5 || fun == 7){
                        fun++
                    }else{
                        fun = 0;
                    }
                }else if(x == 'SelectPause_Button011'){
                    pressSound()
                    sl1.reset();
                    sl1.play();
                    link = '';
                    if(state != 'none' && state != 'redo'){
                        state = 'redo';
                        textFrameContinue(state);
                        state = 'firstText';
                    }
                }else if(x == 'SelectPause_Button007'){
                    pressSound()
                    sl2.reset();
                    sl2.play();
                    if(fun == 8){
                        if (state != 'omg'){
                            state = 'omg'
                            link = '';
                            textFrameContinue(state);
                        }
                    }else{
                        fun = 0;
                        if(link != ''){
                            window.open(link);
                        }
                    }
                
                }else if(x == '1002' || x == 'mesh01'){//10 = coluna & 02 = fileira cima & 03 = fileira baixo
                    pressSound()
                    b12.reset();
                    b12.play();
                    if(page == 1){
                        if(info == 'ls'){
                            if (state != 'html'){
                                state = 'html'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj011'){
                                state = 'pj011'
                                link = "https://lojahousetec.netlify.app/index.html"
                                textFrameContinue(state);
                            }
                        }
                    }else if(page == 2){
                        if(info == 'ls'){
                            if (state != 'ls012'){
                                state = 'ls012'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj012'){
                                state = 'pj012'
                                link = '';
                                textFrameContinue(state);
                            }
                        }
                    }
                    
                }else if(x == '1003' || x == 'mesh11'){
                    pressSound()
                    b13.reset();
                    b13.play();
                    if(page == 1){
                        if(info == 'ls'){
                            if (state != 'ls111'){
                                state = 'ls111'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj111'){
                                state = 'pj111'
                                link = '';
                                textFrameContinue(state);
                            }
                        }
                    }else if(page == 2){
                        if(info == 'ls'){
                            if (state != 'ls112'){
                                state = 'ls112'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj112'){
                                state = 'pj112'
                                link = '';
                                textFrameContinue(state);
                            }
                        }
                    }
                }else if(x == '2002' || x == 'mesh02'){
                    pressSound()
                    b22.reset();
                    b22.play();
                    if(page == 1){
                        if(info == 'ls'){
                            if (state != 'css'){
                                state = 'css'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj021'){
                                state = 'pj021'
                                link = 'https://lojahousetec.netlify.app/tabeladeinvestimentos';
                                textFrameContinue(state);
                            }
                        }
                    }else if(page == 2){
                        if(info == 'ls'){
                            if (state != 'ls022'){
                                state = 'ls022'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj022'){
                                state = 'pj022'
                                link = '';
                                textFrameContinue(state);
                            }
                        }
                    }
                }else if(x == '2003' || x == 'mesh12'){
                    pressSound()
                    b23.reset();
                    b23.play();
                    if(page == 1){
                        if(info == 'ls'){
                            if (state != 'ls121'){
                                state = 'ls121'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj121'){
                                state = 'pj121'
                                link = '';
                                textFrameContinue(state);
                            }
                        }
                    }else if(page == 2){
                        if(info == 'ls'){
                            if (state != 'ls122'){
                                state = 'ls122'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj122'){
                                state = 'pj122'
                                link = '';
                                textFrameContinue(state);
                            }
                        }
                    }
                }else if(x == '3002' || x == 'mesh03'){
                    pressSound()
                    b32.reset();
                    b32.play();
                    if(page == 1){
                        if(info == 'ls'){
                            if (state != 'js'){
                                state = 'js'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj031'){
                                state = 'pj031'
                                link = 'https://lojahousetec.netlify.app/calculadora.html';
                                textFrameContinue(state);
                            }
                        }
                    }else if(page == 2){
                        if(info == 'ls'){
                            if (state != 'ls032'){
                                state = 'ls032'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj032'){
                                state = 'pj032'
                                link = '';
                                textFrameContinue(state);
                            }
                        }
                    }
                }else if(x == '3003' || x == 'mesh13'){
                    pressSound()
                    b33.reset();
                    b33.play();
                    if(page == 1){
                        if(info == 'ls'){
                            if (state != 'ls131'){
                                state = 'ls131'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj131'){
                                state = 'pj131'
                                link = '';
                                textFrameContinue(state);
                            }
                        }
                    }else if(page == 2){
                        if(info == 'ls'){
                            if (state != 'ls132'){
                                state = 'ls132'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj132'){
                                state = 'pj132'
                                link = '';
                                textFrameContinue(state);
                            }
                        }
                    }
                }else if(x == '4002' || x == 'mesh04'){
                    pressSound()
                    b42.reset();
                    b42.play();
                    if(page == 1){
                        if(info == 'ls'){
                            if (state != 'node'){
                                state = 'node'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj041'){
                                state = 'pj041'
                                link = '';
                                textFrameContinue(state);
                            }
                        }
                    }else if(page == 2){
                        if(info == 'ls'){
                            if (state != 'ls042'){
                                state = 'ls042'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj042'){
                                state = 'pj042'
                                link = '';
                                textFrameContinue(state);
                            }
                        }
                    }
                }else if(x == '4003' || x == 'mesh14'){
                    pressSound()
                    b43.reset();
                    b43.play();
                    if(page == 1){
                        if(info == 'ls'){
                            if (state != 'ls141'){
                                state = 'ls141'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj141'){
                                state = 'pj141'
                                link = '';
                                textFrameContinue(state);
                            }
                        }
                    }else if(page == 2){
                        if(info == 'ls'){
                            if (state != 'ls142'){
                                state = 'ls142'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj142'){
                                state = 'pj142'
                                link = '';
                                textFrameContinue(state);
                            }
                        }
                    }
                }else if(x == '5002' || x == 'mesh05'){
                    pressSound()
                    b52.reset();
                    b52.play();
                    if(page == 1){
                        if(info == 'ls'){
                            if (state != 'react'){
                                state = 'react'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj051'){
                                state = 'pj051'
                                link = '';
                                textFrameContinue(state);
                            }
                        }
                    }else if(page == 2){
                        if(info == 'ls'){
                            if (state != 'ls052'){
                                state = 'ls052'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj052'){
                                state = 'pj052'
                                link = '';
                                textFrameContinue(state);
                            }
                        }
                    }
                }else if(x == '5003' || x == 'mesh15'){
                    pressSound()
                    b53.reset();
                    b53.play();
                    if(page == 1){
                        if(info == 'ls'){
                            if (state != 'ls151'){
                                state = 'ls151'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj151'){
                                state = 'pj151'
                                link = '';
                                textFrameContinue(state);
                            }
                        }
                    }else if(page == 2){
                        if(info == 'ls'){
                            if (state != 'ls152'){
                                state = 'ls152'
                                link = '';
                                textFrameContinue(state);
                            }
                        }else if(info == 'pj'){
                            if (state != 'pj152'){
                                state = 'pj152'
                                link = '';
                                textFrameContinue(state);
                            }
                        }
                    }
                }else if(x == 'Botão_BrancoEsquerdo001' || x == 'lsMesh'){
                    pressSound()
                    bbe.reset();
                    bbe.play();
                    if (info != 'ls') {
                        info = 'ls';
                        page = 1;
                        callButtons(info,page);
                    }
                }else if(x == 'Botão_BrancBotão_BrancoDireito001' || x == 'pjMesh'){
                    pressSound()
                    bbd.reset();
                    bbd.play();
                    if (info != 'pj') {
                        info = 'pj';
                        page = 1;
                        callButtons(info,page);
                    }
                }else if(x == 'VisorMenor1001' || x == 'contactMesh'){
                    pressSound()
                    vm1.reset();
                    vm1.play();
                    window.open("https://wa.me/5511951078177");
                }else if(x == 'VisorMenor2001' || x == 'linkedinMesh'){
                    pressSound()
                    vm2.reset();
                    vm2.play();
                    window.open("https://www.linkedin.com/in/gabrieldiasdavid/");
                }else if(x == 'SelectEsquerdo001'){
                    pressSound()
                    se1.reset();
                    se1.play();
                    if (page != 1) {
                        page = 1
                        callButtons(info,page);
                    }
                }else if(x == 'StartEsquerdo001'){
                    pressSound()
                    se2.reset();
                    se2.play();
                    if (page != 2) {
                        page = 2
                        callButtons(info,page);
                    }
                }
            }
        }

        function pressSound(){
            clickSound.stop();
            clickSound.play();
        }

        if (intersectsC.length > 0) {
            var x = intersectsC[0].object.name;
            onClickButon(x);
        }
      
      }

}


function onWindowResize() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );
    composer.setSize( width, height );
    labelRenderer.setSize(width, height);

    effectFXAA.uniforms[ 'resolution' ].value.set( 0.7 / window.innerWidth, 0.7 / window.innerHeight );

}

function animationFinished(){
}

function onDocumentKeyDown(event){
    var keyCode = event.which;
    
    if(keyCode == 32){
        dexOpen();
    }
    
}

function dexOpen(){
    ab = true;
    openPokedex.play()
    pokedex.scene.rotation.set(Math.PI / 2, 0, 0);
    pokedex.scene.position.set( -1.25, -0.15, 0);
    camera.rotation.set( 0, 0, 0 );
    camera.position.set( 0, 0, 6 );
    controls.maxDistance = 7;
    controls.minDistance = 5;
    controls.maxAzimuthAngle = Math.PI/4;
    controls.minAzimuthAngle = Math.PI/-4;
}

function update () {
	mixer.update(clock.getDelta());
}

function arrowVisible(state) {
    if (state == 'firstText' || state == 'secondText') {
        arrowDown.visible = true;
    }
}

function animate() {
    requestAnimationFrame( animate );
    if(mixer && ab == true){
        update();
    }else if(mixer && ab == false){

    }
    controls.update();
    composer.render();
    labelRenderer.render(scene, camera);
}

