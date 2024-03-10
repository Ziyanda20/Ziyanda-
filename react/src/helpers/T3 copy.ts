import * as T3 from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { PointerLockControls } from "three/examples/jsm/Addons.js";

import { SERVERURL } from "./URL";
import {
  getPedestalsByRoom,
  updateArtworkScale,
  updatePedestalModel,
} from "./artwork";

export default class T3Helper {
  public scene = new T3.Scene();
  public renderer = new T3.WebGLRenderer({ antialias: false });
  public camera: T3.PerspectiveCamera;
  public controls: PointerLockControls;
  // public artStations: Array<any> = [];
  public nextModelPosition: T3.Vector3 | null = null;
  public targetModel: T3.Object3D | null = null;

  private pedestals: any = null;
  private closestPedestal: any = null;

  public loader = new GLTFLoader();
  private keys: any = {};

  private frames: Array<any> = [];
  private loadedFrames: Array<any> = []

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

  render() {
    this.findClosestFrame()

    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.updateMovement();

    this.render();
  }

  setCameraPosition() {
    this.camera.position.set(0.2, 1.4, 0);
    // this.camera.rotation. = this.degToRad(180);
    // this.camera.lookAt(new T3.Vector3(-5, 0, 0))
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

  loadModel(work: any) {
    if (!this.nextModelPosition) return;

    this.loader.load(
      `${SERVERURL}/assets/uploads/artwork/models/${work.model.folder}/scene.gltf`,
      (gltf) => {
        gltf.scene.children[0].scale.set(0.01, 0.01, 0.01);

        const x = this.nextModelPosition?.x || 0,
          y = 0.55,
          z = this.nextModelPosition?.z || 0;

        gltf.scene.children[0].position.set(x, y, z);

        this.targetModel = gltf.scene.children[0];

        updatePedestalModel(this.closestPedestal._id, work._id);
        updateArtworkScale(work._id, 0.01);

        this.pedestals.forEach((pedestal: any) => {
          if (pedestal._id == this.closestPedestal._id) {
            pedestal.hasModel = true;

            return;
          }
        });

        this.scene.add(gltf.scene);
      }
    );
  }

  adjustScale(scale: number) {
    if (!this.targetModel) return;

    this.targetModel?.scale.set(scale, scale, scale);

    const artworkId = this.targetModel.userData["id"];

    if (!artworkId) return;

    updateArtworkScale(artworkId, scale);
  }

  loadPedestals() {
    (async () => {
      this.pedestals = (await getPedestalsByRoom()).pedestals;

      this.pedestals.forEach((pedestal: any) => {
        const pos = pedestal.position;

        this.loader.load(
          `${SERVERURL}/assets/3D/pedestal/scene.gltf`,
          (gltf) => {
            gltf.scene.children[0].position.set(pos.x, pos.y, pos.z);
            gltf.scene.children[0].scale.set(0.05, 0.05, 0.05);

            this.scene.add(gltf.scene);

            if (pedestal.hasModel) {
              this.loader.load(
                `${SERVERURL}/assets/uploads/artwork/models/${pedestal.model.model.folder}/scene.gltf`,
                (gltf) => {
                  const scale = pedestal.model.model.scale;

                  gltf.scene.children[0].scale.set(scale, scale, scale);

                  const x = pos.x || 0,
                    y = 0.57,
                    z = pos.z || 0;

                  gltf.scene.children[0].position.set(x, y, z);

                  this.scene.add(gltf.scene);
                }
              );
            }
          }
        );
      });
    })();

    this.render();
  }

  showcaseModel() {
    let shortestDist;

    for (let i = 0; i < this.pedestals.length; i++) {
      let pedestal = this.pedestals[i];

      const position = pedestal.position;

      const distance = this.camera.position.distanceTo(
        new T3.Vector3(position.x, position.y, position.z)
      );

      if (
        (!shortestDist || (shortestDist && shortestDist > distance)) &&
        !pedestal.hasModel
      ) {
        shortestDist = distance;

        this.closestPedestal = pedestal;
      }
    }

    if (!shortestDist)
      // create in a different room
      throw "Functionality missing.";

    let pos = this.closestPedestal.position;
    this.nextModelPosition = pos;

    this.camera.position.set(pos.x, 1, pos.z + (pos.z < 0 ? +2 : -2));
    // this.camera.lookAt(new T3.Vector3(pos.x, pos.y, pos.z));
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
        gltf.scene.children[0].position.set(
          frame.pos.x,
          frame.pos.y,
          frame.pos.z
        );

        if (frame.rotation) {
          frame.rotation.forEach((rotation: Array<string | number>) => {
            let method = rotation[0] as string;
            let deg = this.degToRad(rotation[1] as number);

            if (method == "rotateX") gltf.scene.children[0].rotateX(deg);
            else if (method == "rotateY") gltf.scene.children[0].rotateY(deg);
            else if (method == "rotateZ") gltf.scene.children[0].rotateZ(deg);
          });
        }

        gltf.scene.children[0].scale.set(1.6, 0.7, 1);

        this.loadedFrames.push(gltf.scene.children[0])

        this.scene.add(gltf.scene);

        this.loadImage(frame.picture, frame.pos, frame.rotation);
      });
    });
  }

  findClosestFrame () {
    this.loadedFrames.forEach(object => {
      // console.log(object.children[0].material);

      
      
      // object.material.color.set(Math.random() * 0xffffff);

    });
  }
}
