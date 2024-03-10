import * as T3 from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { PointerLockControls } from "three/examples/jsm/Addons.js";
import { SERVERURL } from "./URL";

interface IVec {
  x: number,
  y: number,
  z: number
}

export default class T3Helper {
  public scene = new T3.Scene();
  public renderer = new T3.WebGLRenderer({ antialias: false });
  public camera: T3.PerspectiveCamera;
  public controls: PointerLockControls;
  public stats = new Stats()

  public loader = new GLTFLoader();
  private keys: any = {};

  private frames: Array<any> = [];
  private loadedFrames: Array<any> = []
  private frameMeshes = new Map();
  private lastClosestFrame: any;

  constructor(width: number, height: number) {
    this.camera = new T3.PerspectiveCamera(40, width / height, 0.1, 1800);

    this.renderer.setSize(width, height);

    this.renderer.setPixelRatio(window.devicePixelRatio * 1);

    this.scene.background = new T3.Color(0xdddddd);

    this.scene.add(new T3.GridHelper(9, 9));

    this.controls = new PointerLockControls(
      this.camera,
      this.renderer.domElement
    );

    document.addEventListener("keydown", this.registerKey.bind(this), false);
    document.addEventListener("keyup", this.registerKey.bind(this), false);

    this.scene.add(new T3.AmbientLight(0xfcfcfc, 1));

    const dlight = new T3.DirectionalLight(0xfff9d8, 0.3);
    dlight.position.set(0, 1, 0);
    dlight.castShadow = true;
    this.scene.add(dlight);
  }

  lock(menu: HTMLElement) {
    this.controls.lock();

    this.controls.addEventListener("lock", () => (menu.style.display = "none"));
    this.controls.addEventListener(
      "unlock",
      () => (menu.style.display = "block")
    );
  }

  registerKey(e: any) {
    this.keys[e.code] = e.type == "keydown";
  }

  updateMovement() {
    if (this.keys["KeyW"] || this.keys["ArrowUp"]) {
      this.controls.moveForward(0.05);
    }
    if (this.keys["KeyS"] || this.keys["ArrowDown"]) {
      this.controls.moveForward(-0.05);
    }
    if (this.keys["KeyA"] || this.keys["ArrowLeft"]) {
      this.controls.moveRight(-0.05);
    }
    if (this.keys["KeyD"] || this.keys["ArrowRight"]) {
      this.controls.moveRight(0.05);
    }
  }

  degToRad(deg: number) {
    return (deg * Math.PI) / 180;
  }

  arrayNotEmpty(arr: Array<any>) {
    return arr && Array.isArray(arr) && arr.length > 0;
  }

  setCameraPosition() {
    this.camera.position.set(0.2, 1.4, 0);
  }

  isZOffset (rotation: Array<Array<any>>) {
    return !this.arrayNotEmpty(rotation)
  }

  isXOffset(rotation: Array<Array<any>>) {
    return this.arrayNotEmpty(rotation)
  }

  getXOffset(angle: number, offset: number = 0.01) {
    let sign = angle < 0 ? -1 : 1;

    return offset * sign;
  }

  setObjectPosition (obj: T3.Object3D, pos: IVec) {
    obj.position.set(
      pos.x,
      pos.y,
      pos.z
    );
  }

  setRotation(obj: T3.Object3D, angle: number, rotation: string = 'rotateY') {
    if (rotation == 'rotateY') return obj.rotateY(this.degToRad(angle))

    obj.rotateZ(this.degToRad(angle))
  }

  loadImage(image: string, pos: any, rotation?: any) {
    let loader = new T3.TextureLoader();

    var material = new T3.MeshLambertMaterial({
      map: loader.load(
        `${SERVERURL}/assets/uploads/artwork/portraits/${image}`
      ),
    });

    // create a plane geometry for the image with a width of 10
    // and a height that preserves the image's aspect ratio
    var geometry = new T3.PlaneGeometry(0.41, 0.44 * 0.75);

    // combine our image geometry and material into a mesh
    var mesh = new T3.Mesh(geometry, material);

    // set the pos of the image mesh in the x,y,z dimensions
    if (pos) mesh.position.set(pos.x, pos.y + 0.45, pos.z + 0.01);

    if (rotation) {
      rotation.forEach((rotation: Array<string | number>) => {
        let method = rotation[2] as string;

        let deg = this.degToRad(rotation[1] as number);

        if (method == "rotateX") mesh.rotateX(deg);
        else if (method == "rotateY") {
          mesh.rotateY(deg);

          if (deg > 0) mesh.position.setX(pos.x + 0.01)
          else mesh.position.setX(pos.x - 0.01)
        }
      });
    }

    // add the image to the scene
    this.scene.add(mesh);
  }

  // demo displays
  displayPaintings() {
    this.frames = [
      {
        folder: "picture_frame_slim",
        picture: "woman-1.jpg",
        pos: {
          x: 2,
          y: 1,
          z: -8,
        },
      },

      {
        folder: "picture_frame_slim",
        picture: "woman-2.jpg",
        pos: {
          x: 0,
          y: 1,
          z: -8,
        },
      },

      {
        folder: "picture_frame_slim",
        picture: "woman-3.jpg",
        pos: {
          x: -2,
          y: 1,
          z: -8,
        },
      },

      {
        folder: "picture_frame_slim",
        picture: "woman-3.jpg",
        rotation: [["rotateZ", 90, "rotateY"]],
        pos: {
          x: -4,
          y: 1,
          z: -6,
        },
      },

      {
        folder: "picture_frame_slim",
        picture: "woman-3.jpg",
        rotation: [["rotateZ", 90, "rotateY"]],
        pos: {
          x: -4,
          y: 1,
          z: -2,
        },
      },

      {
        folder: "picture_frame_slim",
        picture: "woman-3.jpg",
        rotation: [["rotateZ", 90, "rotateY"]],
        pos: {
          x: -4,
          y: 1,
          z: 2,
        },
      },

      {
        folder: "picture_frame_slim",
        picture: "woman-3.jpg",
        rotation: [["rotateZ", 90, "rotateY"]],
        pos: {
          x: -4,
          y: 1,
          z: 6,
        },
      },

      {
        folder: "picture_frame_slim",
        picture: "woman-3.jpg",
        rotation: [["rotateZ", -90, "rotateY"]],
        pos: {
          x: 4,
          y: 1,
          z: -6,
        },
      },

      {
        folder: "picture_frame_slim",
        picture: "woman-3.jpg",
        rotation: [["rotateZ", -90, "rotateY"]],
        pos: {
          x: 4,
          y: 1,
          z: -2,
        },
      },

      {
        folder: "picture_frame_slim",
        picture: "woman-3.jpg",
        rotation: [["rotateZ", -90, "rotateY"]],
        pos: {
          x: 4,
          y: 1,
          z: 2,
        },
      },

      {
        folder: "picture_frame_slim",
        picture: "woman-3.jpg",
        rotation: [["rotateZ", -90, "rotateY"]],
        pos: {
          x: 4,
          y: 1,
          z: 6,
        },
      },
    ];

    this.frames.forEach((frame: any) => {
      this.loader.load(`/3D/${frame.folder}/scene.gltf`, (gltf) => {
        this.setObjectPosition(gltf.scene.children[0], frame.pos)

        const textMesh = this.makeText('Test this')

        if (textMesh)
          this.setObjectPosition(textMesh, {
            x: frame.pos.x + (this.isXOffset(frame.rotation) ? this.getXOffset(frame.rotation[0][1]) : 0),
            y: .7,
            z: frame.pos.z + (this.isZOffset(frame.rotation) ? 0.01 : 0 )
          })

        if (frame.rotation) {
          frame.rotation.forEach((rotation: Array<string | number>) => {
            this.setRotation(gltf.scene.children[0], rotation[1] as number, 'rotateZ')

            if (textMesh) this.setRotation(textMesh, rotation[1] as number)
          });
        }

        gltf.scene.children[0].scale.set(1.6, 0.7, 1);

        gltf.scene.children[0].userData.frameId = Math.random()

        this.loadedFrames.push(gltf.scene.children[0])

        if (textMesh) this.scene.add(textMesh)

        this.scene.add(gltf.scene);

        this.loadImage(frame.picture, frame.pos, frame.rotation);
      });
    });
  }

  makeText(txt: string) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) return null;

    ctx.fillStyle = 'green'
    ctx.font = '30px sans-serif'
    ctx.fillText(txt, 0, 30)

    const texture = new T3.Texture(canvas)
    texture.needsUpdate = true

    var material = new T3.MeshBasicMaterial({
      map: texture,
      side: T3.DoubleSide,
    })

    return new T3.Mesh(new T3.PlaneGeometry(0.41, 0.44 * 0.75), material)
  }

  traverseGroup (object: any, meshes: Array<any> = []) {
    if (object.isMesh) return [...meshes, object]

    object.children.forEach((child: any) => {
      meshes = [...meshes, ...this.traverseGroup(child, meshes)]
    });

    return meshes;
  }

  findClosestFrame () {
    let closestPosition: number,
      closestFrame: any

    this.loadedFrames.forEach(object => {
      const position = object.position;

      const distance = this.camera.position.distanceTo(
        new T3.Vector3(position.x, position.y, position.z)
      );

      if (!closestPosition || closestPosition && closestPosition > distance) {
        closestFrame = object;
        closestPosition = distance;
      }
    });

    if (!(this.lastClosestFrame && this.lastClosestFrame.userData.frameId == closestFrame.userData.frameId)) {
      let meshes = this.frameMeshes.get(closestFrame.userData.frameId);

      if (!meshes) {
        meshes = this.traverseGroup(closestFrame);

        this.frameMeshes.set(closestFrame.userData.frameId, meshes)
      }

      meshes.forEach((mesh: any) => {
        mesh.material.emissive = new T3.Color('darkgray')
      });

      // unset the gray color from previous frame
      if (this.lastClosestFrame){
        let lastFrameMeshes = this.frameMeshes.get(this.lastClosestFrame.userData.frameId);

        if (!lastFrameMeshes) {
          lastFrameMeshes = this.traverseGroup(this.lastClosestFrame);

          this.frameMeshes.set(this.lastClosestFrame.userData.frameId, lastFrameMeshes)
        }

        lastFrameMeshes.forEach((mesh: any) => {
          mesh.material.emissive = new T3.Color(0x000000)
        });
      }
    }

    this.lastClosestFrame = closestFrame.clone();
  }

  render() {
    this.findClosestFrame()

    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.updateMovement();

    this.render();

    this.stats.update()
  }
}
