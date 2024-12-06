import"./modulepreload-polyfill-B5Qt9EMX.js";import{L as kt,F as Xe,S as Re,a as at,B as ot,b as Ke,C as Q,c as rt,D as Bt,H as ne,d as Oe,e as be,f as je,O as At,M as Ft,g as Je,h as oe,U as He,V as q,W as _e,N as Ht,i as Ut,j as i,A as zt,k as lt,l as Ne,m,n as Nt,P as Wt,o as Gt,p as Vt,q as Qt,r as qt,s as Yt,t as $t,u as Xt,G as Kt,T as jt,v as Jt,w as Zt,E as ei,Q as ti}from"./TransformControls-DY6YtNii.js";import ii from"https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm";var ve=function(){var n=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(g){g.preventDefault(),a(++n%e.children.length)},!1);function t(g){return e.appendChild(g.dom),g}function a(g){for(var w=0;w<e.children.length;w++)e.children[w].style.display=w===g?"block":"none";n=g}var r=(performance||Date).now(),o=r,s=0,c=t(new ve.Panel("FPS","#0ff","#002")),d=t(new ve.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var M=t(new ve.Panel("MB","#f08","#201"));return a(0),{REVISION:16,dom:e,addPanel:t,showPanel:a,begin:function(){r=(performance||Date).now()},end:function(){s++;var g=(performance||Date).now();if(d.update(g-r,200),g>=o+1e3&&(c.update(s*1e3/(g-o),100),o=g,s=0,M)){var w=performance.memory;M.update(w.usedJSHeapSize/1048576,w.jsHeapSizeLimit/1048576)}return g},update:function(){r=this.end()},domElement:e,setMode:a}};ve.Panel=function(n,e,t){var a=1/0,r=0,o=Math.round,s=o(window.devicePixelRatio||1),c=80*s,d=48*s,M=3*s,g=2*s,w=3*s,v=15*s,b=74*s,O=30*s,B=document.createElement("canvas");B.width=c,B.height=d,B.style.cssText="width:80px;height:48px";var S=B.getContext("2d");return S.font="bold "+9*s+"px Helvetica,Arial,sans-serif",S.textBaseline="top",S.fillStyle=t,S.fillRect(0,0,c,d),S.fillStyle=e,S.fillText(n,M,g),S.fillRect(w,v,b,O),S.fillStyle=t,S.globalAlpha=.9,S.fillRect(w,v,b,O),{dom:B,update:function(F,K){a=Math.min(a,F),r=Math.max(r,F),S.fillStyle=t,S.globalAlpha=1,S.fillRect(0,0,c,v),S.fillStyle=e,S.fillText(o(F)+" "+n+" ("+o(a)+"-"+o(r)+")",M,g),S.drawImage(B,w+s,v,b-s,O,w,v,b-s,O),S.fillRect(w+b-s,v,s,O),S.fillStyle=t,S.globalAlpha=.9,S.fillRect(w+b-s,v,s,o((1-F/K)*O))}}};const ke=new WeakMap;class ni extends kt{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,a,r){const o=new Xe(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,s=>{this.parse(s,t,r)},a,r)}parse(e,t,a=()=>{}){this.decodeDracoFile(e,t,null,null,Re,a).catch(a)}decodeDracoFile(e,t,a,r,o=at,s=()=>{}){const c={attributeIDs:a||this.defaultAttributeIDs,attributeTypes:r||this.defaultAttributeTypes,useUniqueIDs:!!a,vertexColorSpace:o};return this.decodeGeometry(e,c).then(t).catch(s)}decodeGeometry(e,t){const a=JSON.stringify(t);if(ke.has(e)){const d=ke.get(e);if(d.key===a)return d.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let r;const o=this.workerNextTaskID++,s=e.byteLength,c=this._getWorker(o,s).then(d=>(r=d,new Promise((M,g)=>{r._callbacks[o]={resolve:M,reject:g},r.postMessage({type:"decode",id:o,taskConfig:t,buffer:e},[e])}))).then(d=>this._createGeometry(d.geometry));return c.catch(()=>!0).then(()=>{r&&o&&this._releaseTask(r,o)}),ke.set(e,{key:a,promise:c}),c}_createGeometry(e){const t=new ot;e.index&&t.setIndex(new Ke(e.index.array,1));for(let a=0;a<e.attributes.length;a++){const r=e.attributes[a],o=r.name,s=r.array,c=r.itemSize,d=new Ke(s,c);o==="color"&&(this._assignVertexColorSpace(d,r.vertexColorSpace),d.normalized=!(s instanceof Float32Array)),t.setAttribute(o,d)}return t}_assignVertexColorSpace(e,t){if(t!==Re)return;const a=new Q;for(let r=0,o=e.count;r<o;r++)a.fromBufferAttribute(e,r),rt.toWorkingColorSpace(a,Re),e.setXYZ(r,a.r,a.g,a.b)}_loadLibrary(e,t){const a=new Xe(this.manager);return a.setPath(this.decoderPath),a.setResponseType(t),a.setWithCredentials(this.withCredentials),new Promise((r,o)=>{a.load(e,r,void 0,o)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(a=>{const r=a[0];e||(this.decoderConfig.wasmBinary=a[1]);const o=si.toString(),s=["/* draco decoder */",r,"","/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([s]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const r=new Worker(this.workerSourceURL);r._callbacks={},r._taskCosts={},r._taskLoad=0,r.postMessage({type:"init",decoderConfig:this.decoderConfig}),r.onmessage=function(o){const s=o.data;switch(s.type){case"decode":r._callbacks[s.id].resolve(s);break;case"error":r._callbacks[s.id].reject(s);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+s.type+'"')}},this.workerPool.push(r)}else this.workerPool.sort(function(r,o){return r._taskLoad>o._taskLoad?-1:1});const a=this.workerPool[this.workerPool.length-1];return a._taskCosts[e]=t,a._taskLoad+=t,a})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function si(){let n,e;onmessage=function(s){const c=s.data;switch(c.type){case"init":n=c.decoderConfig,e=new Promise(function(g){n.onModuleLoaded=function(w){g({draco:w})},DracoDecoderModule(n)});break;case"decode":const d=c.buffer,M=c.taskConfig;e.then(g=>{const w=g.draco,v=new w.Decoder;try{const b=t(w,v,new Int8Array(d),M),O=b.attributes.map(B=>B.array.buffer);b.index&&O.push(b.index.array.buffer),self.postMessage({type:"decode",id:c.id,geometry:b},O)}catch(b){console.error(b),self.postMessage({type:"error",id:c.id,error:b.message})}finally{w.destroy(v)}});break}};function t(s,c,d,M){const g=M.attributeIDs,w=M.attributeTypes;let v,b;const O=c.GetEncodedGeometryType(d);if(O===s.TRIANGULAR_MESH)v=new s.Mesh,b=c.DecodeArrayToMesh(d,d.byteLength,v);else if(O===s.POINT_CLOUD)v=new s.PointCloud,b=c.DecodeArrayToPointCloud(d,d.byteLength,v);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!b.ok()||v.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+b.error_msg());const B={index:null,attributes:[]};for(const S in g){const F=self[w[S]];let K,ie;if(M.useUniqueIDs)ie=g[S],K=c.GetAttributeByUniqueId(v,ie);else{if(ie=c.GetAttributeId(v,s[g[S]]),ie===-1)continue;K=c.GetAttribute(v,ie)}const se=r(s,c,v,S,F,K);S==="color"&&(se.vertexColorSpace=M.vertexColorSpace),B.attributes.push(se)}return O===s.TRIANGULAR_MESH&&(B.index=a(s,c,v)),s.destroy(v),B}function a(s,c,d){const g=d.num_faces()*3,w=g*4,v=s._malloc(w);c.GetTrianglesUInt32Array(d,w,v);const b=new Uint32Array(s.HEAPF32.buffer,v,g).slice();return s._free(v),{array:b,itemSize:1}}function r(s,c,d,M,g,w){const v=w.num_components(),O=d.num_points()*v,B=O*g.BYTES_PER_ELEMENT,S=o(s,g),F=s._malloc(B);c.GetAttributeDataArrayForAllPoints(d,w,S,B,F);const K=new g(s.HEAPF32.buffer,F,O).slice();return s._free(F),{name:M,array:K,itemSize:v}}function o(s,c){switch(c){case Float32Array:return s.DT_FLOAT32;case Int8Array:return s.DT_INT8;case Int16Array:return s.DT_INT16;case Int32Array:return s.DT_INT32;case Uint8Array:return s.DT_UINT8;case Uint16Array:return s.DT_UINT16;case Uint32Array:return s.DT_UINT32}}}class ai extends Bt{constructor(e){super(e),this.type=ne}parse(e){const s=function(p,x){switch(p){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(x||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(x||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(x||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(x||""))}},g=`
`,w=function(p,x,P){x=x||1024;let I=p.pos,L=-1,y=0,R="",_=String.fromCharCode.apply(null,new Uint16Array(p.subarray(I,I+128)));for(;0>(L=_.indexOf(g))&&y<x&&I<p.byteLength;)R+=_,y+=_.length,I+=128,_+=String.fromCharCode.apply(null,new Uint16Array(p.subarray(I,I+128)));return-1<L?(p.pos+=y+L+1,R+_.slice(0,L)):!1},v=function(p){const x=/^#\?(\S+)/,P=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,C=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,I=/^\s*FORMAT=(\S+)\s*$/,L=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,y={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let R,_;for((p.pos>=p.byteLength||!(R=w(p)))&&s(1,"no header found"),(_=R.match(x))||s(3,"bad initial token"),y.valid|=1,y.programtype=_[1],y.string+=R+`
`;R=w(p),R!==!1;){if(y.string+=R+`
`,R.charAt(0)==="#"){y.comments+=R+`
`;continue}if((_=R.match(P))&&(y.gamma=parseFloat(_[1])),(_=R.match(C))&&(y.exposure=parseFloat(_[1])),(_=R.match(I))&&(y.valid|=2,y.format=_[1]),(_=R.match(L))&&(y.valid|=4,y.height=parseInt(_[1],10),y.width=parseInt(_[2],10)),y.valid&2&&y.valid&4)break}return y.valid&2||s(3,"missing format specifier"),y.valid&4||s(3,"missing image size specifier"),y},b=function(p,x,P){const C=x;if(C<8||C>32767||p[0]!==2||p[1]!==2||p[2]&128)return new Uint8Array(p);C!==(p[2]<<8|p[3])&&s(3,"wrong scanline width");const I=new Uint8Array(4*x*P);I.length||s(4,"unable to allocate buffer space");let L=0,y=0;const R=4*C,_=new Uint8Array(4),he=new Uint8Array(R);let Ye=P;for(;Ye>0&&y<p.byteLength;){y+4>p.byteLength&&s(1),_[0]=p[y++],_[1]=p[y++],_[2]=p[y++],_[3]=p[y++],(_[0]!=2||_[1]!=2||(_[2]<<8|_[3])!=C)&&s(3,"bad rgbe scanline format");let ge=0,Z;for(;ge<R&&y<p.byteLength;){Z=p[y++];const ee=Z>128;if(ee&&(Z-=128),(Z===0||ge+Z>R)&&s(3,"bad scanline data"),ee){const te=p[y++];for(let $e=0;$e<Z;$e++)he[ge++]=te}else he.set(p.subarray(y,y+Z),ge),ge+=Z,y+=Z}const Ot=C;for(let ee=0;ee<Ot;ee++){let te=0;I[L]=he[ee+te],te+=C,I[L+1]=he[ee+te],te+=C,I[L+2]=he[ee+te],te+=C,I[L+3]=he[ee+te],L+=4}Ye--}return I},O=function(p,x,P,C){const I=p[x+3],L=Math.pow(2,I-128)/255;P[C+0]=p[x+0]*L,P[C+1]=p[x+1]*L,P[C+2]=p[x+2]*L,P[C+3]=1},B=function(p,x,P,C){const I=p[x+3],L=Math.pow(2,I-128)/255;P[C+0]=be.toHalfFloat(Math.min(p[x+0]*L,65504)),P[C+1]=be.toHalfFloat(Math.min(p[x+1]*L,65504)),P[C+2]=be.toHalfFloat(Math.min(p[x+2]*L,65504)),P[C+3]=be.toHalfFloat(1)},S=new Uint8Array(e);S.pos=0;const F=v(S),K=F.width,ie=F.height,se=b(S.subarray(S.pos),K,ie);let Le,Ie,ce;switch(this.type){case Oe:ce=se.length/4;const p=new Float32Array(ce*4);for(let P=0;P<ce;P++)O(se,P*4,p,P*4);Le=p,Ie=Oe;break;case ne:ce=se.length/4;const x=new Uint16Array(ce*4);for(let P=0;P<ce;P++)B(se,P*4,x,P*4);Le=x,Ie=ne;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:K,height:ie,data:Le,header:F.string,gamma:F.gamma,exposure:F.exposure,type:Ie}}setDataType(e){return this.type=e,this}load(e,t,a,r){function o(s,c){switch(s.type){case Oe:case ne:s.colorSpace=at,s.minFilter=je,s.magFilter=je,s.generateMipmaps=!1,s.flipY=!0;break}t&&t(s,c)}return super.load(e,o,a,r)}}const ct={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Se{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const oi=new At(-1,1,1,-1,0,1);class ri extends ot{constructor(){super(),this.setAttribute("position",new Je([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Je([0,2,0,0,2,0],2))}}const li=new ri;class ht{constructor(e){this._mesh=new Ft(li,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,oi)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class We extends Se{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof oe?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=He.clone(e.uniforms),this.material=new oe({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new ht(this.material)}render(e,t,a){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=a.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Ze extends Se{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,a){const r=e.getContext(),o=e.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0);let s,c;this.inverse?(s=0,c=1):(s=1,c=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),o.buffers.stencil.setFunc(r.ALWAYS,s,4294967295),o.buffers.stencil.setClear(c),o.buffers.stencil.setLocked(!0),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(r.EQUAL,1,4294967295),o.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),o.buffers.stencil.setLocked(!0)}}class ci extends Se{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class dt{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const a=e.getSize(new q);this._width=a.width,this._height=a.height,t=new _e(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ne}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new We(ct),this.copyPass.material.blending=Ht,this.clock=new Ut}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let a=!1;for(let r=0,o=this.passes.length;r<o;r++){const s=this.passes[r];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),s.render(this.renderer,this.writeBuffer,this.readBuffer,e,a),s.needsSwap){if(a){const c=this.renderer.getContext(),d=this.renderer.state.buffers.stencil;d.setFunc(c.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),d.setFunc(c.EQUAL,1,4294967295)}this.swapBuffers()}Ze!==void 0&&(s instanceof Ze?a=!0:s instanceof ci&&(a=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new q);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const a=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(a,r),this.renderTarget2.setSize(a,r);for(let o=0;o<this.passes.length;o++)this.passes[o].setSize(a,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class hi extends Se{constructor(e,t,a=null,r=null,o=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=a,this.clearColor=r,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Q}render(e,t,a){const r=e.autoClear;e.autoClear=!1;let o,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(o=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(o),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),e.autoClear=r}}const di={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Q(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class fe extends Se{constructor(e,t,a,r){super(),this.strength=t!==void 0?t:1,this.radius=a,this.threshold=r,this.resolution=e!==void 0?new q(e.x,e.y):new q(256,256),this.clearColor=new Q(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let o=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new _e(o,s,{type:ne}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let w=0;w<this.nMips;w++){const v=new _e(o,s,{type:ne});v.texture.name="UnrealBloomPass.h"+w,v.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(v);const b=new _e(o,s,{type:ne});b.texture.name="UnrealBloomPass.v"+w,b.texture.generateMipmaps=!1,this.renderTargetsVertical.push(b),o=Math.round(o/2),s=Math.round(s/2)}const c=di;this.highPassUniforms=He.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new oe({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];const d=[3,5,7,9,11];o=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let w=0;w<this.nMips;w++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(d[w])),this.separableBlurMaterials[w].uniforms.invSize.value=new q(1/o,1/s),o=Math.round(o/2),s=Math.round(s/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const M=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=M,this.bloomTintColors=[new i(1,1,1),new i(1,1,1),new i(1,1,1),new i(1,1,1),new i(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const g=ct;this.copyUniforms=He.clone(g.uniforms),this.blendMaterial=new oe({uniforms:this.copyUniforms,vertexShader:g.vertexShader,fragmentShader:g.fragmentShader,blending:zt,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Q,this.oldClearAlpha=1,this.basic=new lt,this.fsQuad=new ht(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let a=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(a,r);for(let o=0;o<this.nMips;o++)this.renderTargetsHorizontal[o].setSize(a,r),this.renderTargetsVertical[o].setSize(a,r),this.separableBlurMaterials[o].uniforms.invSize.value=new q(1/a,1/r),a=Math.round(a/2),r=Math.round(r/2)}render(e,t,a,r,o){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),o&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=a.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=a.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let c=this.renderTargetBright;for(let d=0;d<this.nMips;d++)this.fsQuad.material=this.separableBlurMaterials[d],this.separableBlurMaterials[d].uniforms.colorTexture.value=c.texture,this.separableBlurMaterials[d].uniforms.direction.value=fe.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[d]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[d].uniforms.colorTexture.value=this.renderTargetsHorizontal[d].texture,this.separableBlurMaterials[d].uniforms.direction.value=fe.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[d]),e.clear(),this.fsQuad.render(e),c=this.renderTargetsVertical[d];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,o&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(a),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=s}getSeperableBlurMaterial(e){const t=[];for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(e*e))/e);return new oe({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new q(.5,.5)},direction:{value:new q(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new oe({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}fe.BlurDirectionX=new q(1,0);fe.BlurDirectionY=new q(0,1);const ui={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new q(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		// FXAA algorithm from NVIDIA, C# implementation by Jasper Flick, GLSL port by Dave Hoskins
		// http://developer.download.nvidia.com/assets/gamedev/files/sdk/11/FXAA_WhitePaper.pdf
		// https://catlikecoding.com/unity/tutorials/advanced-rendering/fxaa/

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 1.0;

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;
			
			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {
				
				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );
			
		}`},fi="/portfolio/web-projects/hwaran/models/scene.glb",mi="/portfolio/web-projects/hwaran/images/studio_small_09_1k.hdr",W=new ii;W.show(!1);const Ue=window.innerHeight/2;let A;const xe=15;rt.enabled=!0;let ut=!1,h,ue,Ge,ft,mt,pt;const V=new Q("rgb(198,85,68)"),de=new Q(8388608).convertLinearToSRGB();mt=new Ne({transparent:!0,emissive:new Q(16757102),emissiveIntensity:1,opacity:.01,color:new Q(16757102),visible:!1});ue=new Ne({transparent:!0,emissive:new Q(16777215),emissiveIntensity:.1,opacity:0,color:new Q(16777215)});Ge=new Ne({transparent:!0,emissive:new Q(16777215),emissiveIntensity:.1,opacity:0,color:new Q(16777215)});const J={totalProgress:0,currentSection:0,sectionProgress:0,currentSectionStart:0,currentSectionEnd:0,nextSectionStart:0,lerpTotalProgress:0,lerpSectionProgress:0,animate:function(){this.lerpTotalProgress=st(this.lerpTotalProgress,this.totalProgress),this.lerpSectionProgress=st(this.lerpSectionProgress,this.sectionProgress)},update:function(){this.updateScrollProgress(),this.updateCurrentSection(),this.updateSectionProgress()},updateScrollProgress:function(){var n=document.body.scrollHeight-window.innerHeight,e=window.scrollY;this.totalProgress=e/n},updateCurrentSection:function(){for(let n=0;n<G.length;n++)if(this.currentSection==G.length-1){if(G[n].offsetTop<=window.scrollY+A&&window.scrollY+A<G[n].offsetTop+G[n].offsetHeight){this.currentSection=n;break}}else if(G[n].offsetTop<=window.scrollY+A&&window.scrollY+A<G[n].offsetTop+G[n].offsetHeight){this.currentSection=n;break}},updateSectionProgress:function(){let n;this.currentSection>=G.length-1?n=G[this.currentSection].offsetTop+G[this.currentSection].offsetHeight-window.innerHeight:n=G[this.currentSection+1].offsetTop;const e=G[this.currentSection].offsetTop;this.currentSectionStart=e,this.nextSectionStart=n,this.currentSection==0?this.sectionProgress=(window.scrollY-e)/(n-e-A):this.currentSection==G.length-1?this.sectionProgress=(window.scrollY-e+A)/(n-e+A):this.sectionProgress=(window.scrollY-e+A)/(n-e)}},G=document.querySelectorAll(".transform-break"),et=[{position:new m([new i(.33,.28,-.11),new i(-.23,.39,.28),new i(-.41,-.08,.1)]),rotation:new m([new i(-1.19,.19,-.01),new i(-1,-.19,-.51),new i(-.27,1.31,.24)])},{position:new m([new i(-.41,-.08,.1),new i(-.41,-.08,.1)]),rotation:new m([new i(-.27,1.31,.24),new i(-.27,1.31,.24)])},{position:new m([new i(-.41,-.08,.1),new i(-.23,.1,.28),new i(.03,.18,.45)]),rotation:new m([new i(-.27,1.31,.24),new i(-1,.19,.51),new i(-1.22,.47,.28)])},{position:new m([new i(.03,.18,.45),new i(.03,.18,.45)]),rotation:new m([new i(-1.22,.47,.284),new i(-1.22,.47,.28)])},{position:new m([new i(.03,.18,.45),new i(.2,.8,.1),new i(-.098,.122,.302)]),rotation:new m([new i(-1.22,.47,.28),new i(-1,.8,-.51),new i(.13,1.22,-.11)])},{position:new m([new i(-.098,.122,.302),new i(-.098,.122,.302)]),rotation:new m([new i(.13,1.22,-.11),new i(.13,1.22,-.11)])},{position:new m([new i(-.098,.122,.302),new i(.2,.8,.1),new i(1.254,.458,-.536)]),rotation:new m([new i(.13,1.22,-.11),new i(-1,.8,-.51),new i(-.43,.21,1.18)])},{position:new m([new i(1.254,.458,-.536),new i(.721,.722,.533),new i(1.142,1.735,1.712)]),rotation:new m([new i(-.43,.21,1.18),new i(-.487,-.489,1.401),new i(-1.33,-.81,.98)])},{position:new m([new i(1.142,1.735,1.712),new i(-.51,-.28,-.44)]),rotation:new m([new i(-1.33,-.81,.98),new i(-1.06,.39,1.45)])},{position:new m([new i(-.51,-.28,-.44),new i(-.51,-.28,-.44)]),rotation:new m([new i(-1.06,.39,1.45),new i(-1.06,.39,1.45)])},{position:new m([new i(-.51,-.28,-.44),new i(1,.54,-.1),new i(-.872,-.328,-.129),new i(.6,.58,.36)]),rotation:new m([new i(-1.06,.39,1.45),new i(-1.194,.267-2*Math.PI,.178-2*Math.PI),new i(-.47,.27-2*Math.PI,-.13-2*Math.PI)])}],tt=[{position:new m([new i(-.804,-1.074,-.809),new i(-.23,.39,.28),new i(-1.101,-.774,-1.057)]),rotation:new m([new i(-1.223,.172,-.056),new i(-1,-.19,-.51),new i(-.58,1.244,.519)])},{position:new m([new i(-1.101,-.774,-1.057),new i(-1.101,-.774,-1.057)]),rotation:new m([new i(-.58,1.244,.519),new i(-.58,1.244,.519)])},{position:new m([new i(-1.101,-.774,-1.057),new i(-.23,.1,.28),new i(-1.247,-.961,-1.27)]),rotation:new m([new i(-.58,1.244,.519),new i(-1,.19,.51),new i(-.931,.47,.283)])},{position:new m([new i(-1.247,-.961,-1.27),new i(-1.247,-.961,-1.27)]),rotation:new m([new i(-.931,.47,.283),new i(-.931,.47,.283)])},{position:new m([new i(-1.247,-.961,-1.27),new i(.2,.8,.1),new i(-1.359,-.915,-1.355)]),rotation:new m([new i(-.931,.47,.283),new i(-1,.8,-.51),new i(.161,1.289,-.142)])},{position:new m([new i(-1.359,-.915,-1.355),new i(-1.359,-.915,-1.355)]),rotation:new m([new i(.161,1.289,-.142),new i(.161,1.289,-.142)])},{position:new m([new i(-1.359,-.915,-1.355),new i(.2,.8,.1),new i(1.254,.458,-.536)]),rotation:new m([new i(.161,1.289,-.142),new i(-1,.8,-.51),new i(-.43,.21,1.18)])},{position:new m([new i(1.254,.458,-.536),new i(.721,.722,.533),new i(1.142,1.735,1.712)]),rotation:new m([new i(-.43,.21,1.18),new i(-.487,-.489,1.401),new i(-1.33,-.81,.98)])},{position:new m([new i(1.142,1.735,1.712),new i(-2.19,-1.707,-2.121)]),rotation:new m([new i(-1.33,-.81,.98),new i(-1.06,.39,1.45)])},{position:new m([new i(-2.19,-1.707,-2.121),new i(-2.19,-1.707,-2.121)]),rotation:new m([new i(-1.06,.39,1.45),new i(-1.06,.39,1.45)])},{position:new m([new i(-2.19,-1.707,-2.121),new i(1,.54,-.1),new i(-.872,-.328,-.129),new i(.6,.58,.36)]),rotation:new m([new i(-1.06,.39,1.45),new i(-1.194,.267-2*Math.PI,.178-2*Math.PI),new i(-.47,.27-2*Math.PI,-.13-2*Math.PI)])}],k=new Nt;k.environmentIntensity=1;const $=new Wt(75,window.outerWidth/window.outerHeight,.1,1e3),me=document.querySelector("canvas"),pi=new ve,X=new Gt({canvas:me,alpha:!0});X.setSize(window.outerWidth,window.outerHeight);const wt={url:mi,envMap:null,isSet:!1,load:function(){new ai().load(this.url,n=>{const e=new Jt(X);this.envMap=e.fromEquirectangular(n).texture,this.isSet&&this.set(),n.dispose(),e.dispose()})},set:function(){this.isSet=!0,k.environment=this.envMap,k.environmentRotation.x=5.1,k.environmentRotation.x=4.352,k.environmentRotation.y=.954,k.environmentRotation.z=0}};wt.load();wt.set();new i(0,0,10);const Me=new Vt($,X.domElement);$.position.set(2,2,2);$.fov=20;$.updateProjectionMatrix();Me.update();Me.saveState();new Qt(5);const wi=new qt({color:new Q(16777215),transparent:!0,opacity:.5,roughness:.1,metalness:1,ior:1.3,reflectivity:1,iridescence:1,iridescenceIOR:1,sheen:.8,specularIntensity:1,clearcoat:1,clearcoatRoughness:.2,emissiveIntensity:1}),gi=new Yt(16777215,1),Ti=new $t(16759672,10);Ti.position.set(.5,.5,.5);const gt=new Xt(16777215,.1);gt.position.set(1,1,0);const Te=1,Tt=new Zt;Tt.set(Te);const Be={threshold:0,strength:1.85,radius:1},vt=new hi(k,$),Pe=new fe(new q(window.outerWidth,window.outerHeight),Be.strength,Be.radius,Be.threshold),pe=new dt(X);pe.renderToScreen=!1;pe.addPass(vt);pe.addPass(Pe);const yt=new We(new oe({uniforms:{baseTexture:{value:null},bloomTexture:{value:pe.renderTarget2.texture}},vertexShader:document.getElementById("vertexshader").textContent,fragmentShader:document.getElementById("fragmentshader").textContent,defines:{}}),"baseTexture");yt.needsSwap=!0;const ye=new We(ui),Ce=X.getPixelRatio();ye.material.uniforms.resolution.value.x=1/(me.offsetWidth*Ce);ye.material.uniforms.resolution.value.y=1/(me.offsetHeight*Ce);const Ee=new dt(X);Ee.addPass(vt);Ee.addPass(yt);Ee.addPass(ye);k.add(gi);k.add(gt);const j={width:window.outerWidth,height:window.outerHeight},St=new Kt,Et=new ni;Et.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");St.setDRACOLoader(Et);St.load(fi,function(n){vi(n)},function(n){console.log(n.loaded/n.total*100+"% loaded")},function(n){console.log("An error happened")});function vi(n){h=n.scene.clone(),h.scale.set(10,10,10),h.position.copy(new i(.02,-1.63,.07)),h.rotation.setFromVector3(new i(-1.67,-.42,1.76)),console.log(h),k.add(h),k.add(le),ut=!0,h.traverse(e=>{e.name=="spotlight25_cone"&&e.traverse(t=>{t.isMesh&&(t.material=ue,t.layers.enable(Te))})}),h.traverse(e=>{e.name=="spotlight8_cone"&&e.traverse(t=>{t.isMesh&&(t.material=Ge,t.layers.enable(Te))})}),h.traverse(e=>{e.name=="clear_plastic"&&e.traverse(t=>{t.isMesh&&(t.material=wi)})}),h.traverse(e=>{e.name=="clear_plastic_bloom"&&e.traverse(t=>{t.isMesh&&(t.material=mt,t.layers.enable(Te))})}),h.traverse(e=>{e.name=="lens"&&e.traverse(t=>{t.isMesh})}),h.traverse(e=>{e.name=="headband"&&(ft=e.children[0].material)}),h.traverse(e=>{e.name=="headband_text"&&(pt=e.children[0].material)}),h.traverse(e=>{(e.name=="led_white"||e.name=="led_warm"||e.name=="spotlight25"||e.name=="spotlight8")&&e.traverse(t=>{t.isMesh&&t.layers.enable(Te)})}),it.push(h.children.find(e=>e.name=="led_warm").children[0].material,h.children.find(e=>e.name=="led_white").children[0].material,h.children.find(e=>e.name=="spotlight25").children[0].material,h.children.find(e=>e.name=="spotlight8").children[0].material),it.forEach(e=>{e.emissiveIntensity=l.offEmissiveIntensity}),E.position=h.children.find(e=>e.name==="power_button").position,T.position=h.children.find(e=>e.name==="mode_button").position,E.pressTween=new TWEEN.Tween(E.position).to({y:-.001},150).easing(TWEEN.Easing.Quadratic.Out),E.liftTween=new TWEEN.Tween(E.position).to({y:0},200).easing(TWEEN.Easing.Quadratic.In),E.pressTween.chain(E.liftTween),E.repeatPressTween=new TWEEN.Tween(E.position).to({y:-.001},150).easing(TWEEN.Easing.Quadratic.Out).delay(2e3),E.repeatLiftTween=new TWEEN.Tween(E.position).to({y:0},150).easing(TWEEN.Easing.Quadratic.Out),E.repeatPressTween.chain(E.repeatLiftTween),E.repeatLiftTween.chain(E.repeatPressTween),E.holdTween=new TWEEN.Tween(E.position).to({y:-.001},150).easing(TWEEN.Easing.Quadratic.Out),E.holdTween2=new TWEEN.Tween(E.position).to({y:-.001},150).easing(TWEEN.Easing.Quadratic.Out),T.pressTween=new TWEEN.Tween(T.position).to({y:-.001},150).easing(TWEEN.Easing.Quadratic.Out),T.liftTween=new TWEEN.Tween(T.position).to({y:0},200).easing(TWEEN.Easing.Quadratic.In),T.pressTween.chain(T.liftTween),T.repeatPressTween=new TWEEN.Tween(T.position).to({y:-.001},150).easing(TWEEN.Easing.Quadratic.Out).delay(1e3),T.repeatLiftTween=new TWEEN.Tween(T.position).to({y:0},150).easing(TWEEN.Easing.Quadratic.Out),T.repeatPressTween.chain(T.repeatLiftTween),T.repeatLiftTween.chain(T.repeatPressTween),T.repeatPressTween2=new TWEEN.Tween(T.position).to({y:-.001},150).easing(TWEEN.Easing.Quadratic.Out).delay(1e3),T.repeatLiftTween2=new TWEEN.Tween(T.position).to({y:0},150).easing(TWEEN.Easing.Quadratic.Out),T.repeatPressTween2.chain(T.repeatLiftTween2),T.repeatLiftTween2.chain(T.repeatPressTween2),T.holdTween=new TWEEN.Tween(T.position).to({y:-.001},150).easing(TWEEN.Easing.Quadratic.Out),console.log(h),Di(),Si()}let E={},T={},l={onTime:500,offTime:200,onEmissiveIntensity:1,halfOnEmissiveIntensity:.8,offEmissiveIntensity:.1,coneOpacity:.025},u={},f={},H={},U={},z={},N={},D={isPowerOn:!1,brightnessStep:2,lightingMode:0,isSOSOn:!1,isModeButtonPressed:!1};function yi(){D.startPowerOnOff=function(){E.pressTween.onComplete(()=>{this.isPowerOn?(u.offTween.start(),f.offTween.start(),this.isPowerOn=!1):(u.halfOnTween.start(),f.halfOnTween.start(),this.isPowerOn=!0)}),E.repeatPressTween.onComplete(()=>{this.isPowerOn?(u.offTween.start(),f.offTween.start(),this.isPowerOn=!1):(u.halfOnTween.start(),f.halfOnTween.start(),this.isPowerOn=!0)}),E.pressTween.start(),E.repeatPressTween.start()},D.stopPowerOnOff=function(){E.pressTween.stop(),E.repeatPressTween.stop(),E.position.y=0,u.halfOnTween.stop(),f.halfOnTween.stop(),u.material.emissiveIntensity=l.offEmissiveIntensity,f.material.emissiveIntensity=l.offEmissiveIntensity,this.isPowerOn=!1},D.startGradBrightness=function(){E.holdTween2.start(),u.gradBrightmessTween.start(),f.gradBrightmessTween.start()},D.stopGradBrightness=function(){E.holdTween2.stop(),E.position.y=0,u.gradBrightmessTween.stop(),f.gradBrightmessTween.stop(),u.material.emissiveIntensity=l.offEmissiveIntensity,f.material.emissiveIntensity=l.offEmissiveIntensity},D.startStepBrightness=function(){u.material.emissiveIntensity=.15,f.material.emissiveIntensity=.15,T.repeatPressTween2.onComplete(()=>{this.brightnessStep+=1,this.brightnessStep>5&&(this.brightnessStep=1),u.material.emissiveIntensity=this.brightnessStep*.15,f.material.emissiveIntensity=this.brightnessStep*.15}),E.holdTween.start(),T.repeatPressTween2.start()},D.stopStepBrightness=function(){E.holdTween.stop(),T.repeatPressTween2.stop(),E.position.y=0,T.position.y=0,this.brightnessStep=1,u.material.emissiveIntensity=l.offEmissiveIntensity,f.material.emissiveIntensity=l.offEmissiveIntensity},D.startChangeMode=function(){T.pressTween.onComplete(()=>{this.modeChangeOnComplete()}),T.repeatPressTween.onComplete(()=>{this.modeChangeOnComplete()}),T.pressTween.start(),T.repeatPressTween.start()},D.stopChangeMode=function(){T.pressTween.stop(),T.repeatPressTween.stop(),T.position.y=0,this.turnOffAll()},D.turnOffAll=function(){z.material.emissiveIntensity=l.offEmissiveIntensity,N.material.opacity=0,u.material.emissiveIntensity=l.offEmissiveIntensity,f.material.emissiveIntensity=l.offEmissiveIntensity,H.material.emissiveIntensity=l.offEmissiveIntensity,U.material.opacity=0},D.modeChangeOnComplete=function(){switch(this.turnOffAll(),this.lightingMode){case 0:z.material.emissiveIntensity=l.onEmissiveIntensity,N.material.opacity=l.coneOpacity;break;case 1:H.material.emissiveIntensity=l.onEmissiveIntensity,U.material.opacity=l.coneOpacity;break;case 2:u.material.emissiveIntensity=l.onEmissiveIntensity;break;case 3:f.material.emissiveIntensity=l.onEmissiveIntensity;break;case 4:u.material.emissiveIntensity=l.onEmissiveIntensity,f.material.emissiveIntensity=l.onEmissiveIntensity;break;case 5:H.material.emissiveIntensity=l.onEmissiveIntensity,U.material.opacity=l.coneOpacity,z.material.emissiveIntensity=l.onEmissiveIntensity,N.material.opacity=l.coneOpacity,u.material.emissiveIntensity=l.onEmissiveIntensity,f.material.emissiveIntensity=l.onEmissiveIntensity;break}this.lightingMode+=1,this.lightingMode>5&&(this.lightingMode=0)},D.startSOSMode=function(){T.holdTween.start(),this.isModeButtonPressed=!0,this.SOS()},D.stopSOSMode=function(){T.holdTween.stop(),T.position.y=0,this.isModeButtonPressed=!1,ue.opacity=0},D.SOS=function(){setTimeout(()=>{this.isModeButtonPressed&&(this.SOSOn(),setTimeout(()=>this.SOSOff(),100),setTimeout(()=>this.SOSOn(),200),setTimeout(()=>this.SOSOff(),300),setTimeout(()=>this.SOSOn(),400),setTimeout(()=>this.SOSOff(),500),setTimeout(()=>this.SOSOn(),600),setTimeout(()=>this.SOSOff(),900),setTimeout(()=>this.SOSOn(),1e3),setTimeout(()=>this.SOSOff(),1300),setTimeout(()=>this.SOSOn(),1400),setTimeout(()=>this.SOSOff(),1700),setTimeout(()=>this.SOSOn(),1800),setTimeout(()=>this.SOSOff(),1900),setTimeout(()=>this.SOSOn(),2e3),setTimeout(()=>this.SOSOff(),2100),setTimeout(()=>this.SOSOn(),2200),setTimeout(()=>this.SOSOff(),2300),setTimeout(()=>this.SOS(),3300))},3e3)},D.SOSOn=function(){ue.opacity=l.coneOpacity},D.SOSOff=function(){ue.opacity=0}}function Si(){u.material=h.children.find(n=>n.name=="led_warm").children[0].material,u.onTween=new TWEEN.Tween(u.material).to({emissiveIntensity:l.onEmissiveIntensity},l.onTime),u.halfOnTween=new TWEEN.Tween(u.material).to({emissiveIntensity:l.halfOnEmissiveIntensity},l.onTime),u.offTween=new TWEEN.Tween(u.material).to({emissiveIntensity:l.offEmissiveIntensity},l.offTime),u.gradBrightmessTween=new TWEEN.Tween(u.material).to({emissiveIntensity:l.halfOnEmissiveIntensity},3e3),u.gradBrightmessDownTween=new TWEEN.Tween(u.material).to({emissiveIntensity:l.offEmissiveIntensity},3e3),u.gradBrightmessTween.chain(u.gradBrightmessDownTween),u.gradBrightmessDownTween.chain(u.gradBrightmessTween),f.material=h.children.find(n=>n.name=="led_white").children[0].material,f.onTween=new TWEEN.Tween(f.material).to({emissiveIntensity:l.onEmissiveIntensity},l.onTime),f.halfOnTween=new TWEEN.Tween(f.material).to({emissiveIntensity:l.halfOnEmissiveIntensity},l.onTime),f.offTween=new TWEEN.Tween(f.material).to({emissiveIntensity:l.offEmissiveIntensity},l.offTime),f.gradBrightmessTween=new TWEEN.Tween(f.material).to({emissiveIntensity:l.halfOnEmissiveIntensity},3e3),f.gradBrightmessDownTween=new TWEEN.Tween(f.material).to({emissiveIntensity:l.offEmissiveIntensity},3e3),f.gradBrightmessTween.chain(f.gradBrightmessDownTween),f.gradBrightmessDownTween.chain(f.gradBrightmessTween),z.material=h.children.find(n=>n.name=="spotlight25").children[0].material,z.onTween=new TWEEN.Tween(z.material).to({emissiveIntensity:l.onEmissiveIntensity},l.onTime),z.offTween=new TWEEN.Tween(z.material).to({emissiveIntensity:l.offEmissiveIntensity},l.offTime),N.material=ue,N.onTween=new TWEEN.Tween(N.material).to({opacity:l.coneOpacity},l.onTime),N.offTween=new TWEEN.Tween(N.material).to({opacity:0},l.offTime),H.material=h.children.find(n=>n.name=="spotlight8").children[0].material,H.onTween=new TWEEN.Tween(H.material).to({emissiveIntensity:l.onEmissiveIntensity},l.onTime),H.offTween=new TWEEN.Tween(H.material).to({emissiveIntensity:l.offEmissiveIntensity},l.offTime),U.material=Ge,U.onTween=new TWEEN.Tween(U.material).to({opacity:l.coneOpacity},l.onTime),U.offTween=new TWEEN.Tween(U.material).to({opacity:0},l.offTime),yi()}let it=[];{const n=document.querySelectorAll(".spec-scroller");let e=[];for(let t=0;t<n.length;t++)e.push(n[t].scrollHeight-n[t].offsetHeight)}addEventListener("scroll",n=>{J.update(),Pt(),Lt(),Dt(),qe()});function Ei(){X.render(k,$)}let ze=!0;const bt=document.querySelector("#pos");bt.copyPos=function(){const n=`new THREE.Vector3(${h.position.x.toFixed(3)},${h.position.y.toFixed(3)},${h.position.z.toFixed(3)}),`;navigator.clipboard.writeText(n),console.log("Copied the text: "+n)};const xt=document.querySelector("#rot");xt.copyRot=function(){const n=`new THREE.Vector3(${h.rotation.x.toFixed(3)},${h.rotation.y.toFixed(3)},${h.rotation.z.toFixed(3)}),`;navigator.clipboard.writeText(n),console.log("Copied the text: "+n)};function _t(){requestAnimationFrame(_t),ut&&(ze&&Ci(),pi.update(),bi(),Ee.render(),TWEEN.update(),Ri(),bt.textContent=`
    ${h.position.x.toFixed(3)},${h.position.y.toFixed(3)},${h.position.z.toFixed(3)}`,xt.textContent=`
    ${h.rotation.x.toFixed(3)},${h.rotation.y.toFixed(3)},${h.rotation.z.toFixed(3)}`)}function bi(){k.traverse(Li),h.children.find(n=>n.name==="clear_plastic").visible=!1,pe.render(),k.traverse(Ii),h.children.find(n=>n.name==="clear_plastic").visible=!0}const Y=document.querySelectorAll(".highlight"),nt={element:null,clear:function(){this.turnOff(),this.element=null},assign:function(n){this.element=n,this.turnOn()},turnOn:function(){switch(this.element.id){case"spotlight-25deg":z.onTween.start(),N.onTween.start();break;case"spotlight-8deg":H.onTween.start(),U.onTween.start();break;case"flood-light":u.onTween.start(),f.onTween.start();break;case"turbo":z.onTween.start(),N.onTween.start(),H.onTween.start(),U.onTween.start(),u.onTween.start(),f.onTween.start();break;case"3000k":u.onTween.start();break;case"6500k":f.onTween.start();break;case"4200k":u.halfOnTween.start(),f.halfOnTween.start();break;case"on-off":D.startPowerOnOff();break;case"gradual-brightness":D.startGradBrightness();break;case"step-brightness":D.startStepBrightness();break;case"change-mode":D.startChangeMode();break;case"sos":D.startSOSMode();break;case"flame-red":V.set(12997956),de.set(8388608).convertLinearToSRGB();break;case"sunset-orange":V.r=255/255,V.g=165/255,V.b=0/255,de.set(16744448).convertLinearToSRGB();break;case"midnight-blue":V.r=24/255,V.g=24/255,V.b=65/255,de.set(16512).convertLinearToSRGB();break;case"forrest-green":V.r=127/255,V.g=255/255,V.b=127/255,de.set(13303754).convertLinearToSRGB();break;case"glacier-white":V.r=198/255,V.g=216/255,V.b=213/255,de.set(15724527).convertLinearToSRGB();break}},turnOff:function(n){switch(n.id){case"spotlight-25deg":z.onTween.stop(),z.material.emissiveIntensity=1,z.offTween.start(),N.onTween.stop(),N.material.opacity=l.coneOpacity,N.offTween.start();break;case"spotlight-8deg":H.onTween.stop(),H.material.emissiveIntensity=1,H.offTween.start(),U.onTween.stop(),U.material.opacity=l.coneOpacity,U.offTween.start();break;case"flood-light":u.onTween.stop(),f.onTween.stop(),u.material.emissiveIntensity=.5,f.material.emissiveIntensity=.5,u.offTween.start(),f.offTween.start();break;case"turbo":z.onTween.stop(),z.material.emissiveIntensity=1,z.offTween.start(),N.onTween.stop(),N.material.opacity=l.coneOpacity,N.offTween.start(),H.onTween.stop(),H.material.emissiveIntensity=1,H.offTween.start(),U.onTween.stop(),U.material.opacity=l.coneOpacity,U.offTween.start(),u.onTween.stop(),f.onTween.stop(),u.material.emissiveIntensity=.5,f.material.emissiveIntensity=.5,u.offTween.start(),f.offTween.start();case"3000k":u.onTween.stop(),u.material.emissiveIntensity=1,u.offTween.start();break;case"6500k":f.onTween.stop(),f.material.emissiveIntensity=1,f.offTween.start();break;case"4200k":u.halfOnTween.stop(),f.halfOnTween.stop(),u.material.emissiveIntensity=.5,f.material.emissiveIntensity=.5,u.offTween.start(),f.offTween.start();break;case"on-off":D.stopPowerOnOff();break;case"gradual-brightness":D.stopGradBrightness();break;case"step-brightness":D.stopStepBrightness();break;case"change-mode":D.stopChangeMode();break;case"sos":D.stopSOSMode();break}}};function Pt(){let n=[];Y.forEach(e=>n.push(e.getBoundingClientRect()));for(let e=0;e<n.length;e++){re==!0?A=Ue:A=window.innerHeight-Y[e].offsetHeight/1.5;const t=Y[e].querySelectorAll(".bolding");if(n[e].y-xe<=A&&A<=n[e].bottom+xe?Y[e].classList.contains("active")||(Y[e].classList.toggle("active"),nt.assign(Y[e]),t.forEach(a=>{a.classList.toggle("active")})):Y[e].classList.contains("active")&&(Y[e].classList.toggle("active"),nt.turnOff(Y[e]),t.forEach(a=>{a.classList.toggle("active")})),A>=n[e].bottom+xe&&!re){const a=(100+n[e].bottom+xe-A)*.01;Y[e].style.opacity=a}else Y[e].style.opacity=1}}function Dt(){const n=document.querySelector(".intro-background");Rt()>1?n.style.opacity=0:n.style.opacity=1}let re=!0;function Ct(){const n=document.querySelector(".page-title").getBoundingClientRect(),e=document.querySelector(".spec-wrapper").getBoundingClientRect();n.right<e.left?re=!0:re=!1}addEventListener("resize",n=>{j.width=window.outerWidth,j.height=window.outerHeight,$.aspect=j.width/j.height,$.updateProjectionMatrix(),X.setSize(j.width,j.height),X.setPixelRatio(Math.min(window.devicePixelRatio,2)),pe.setSize(j.width,j.height),Ee.setSize(j.width,j.height),ye.material.uniforms.resolution.value.x=1/(me.offsetWidth*Ce),ye.material.uniforms.resolution.value.y=1/(me.offsetHeight*Ce),xi(),Ct(),qe()});const Mt=document.querySelector(".scroll-watcher"),Ve=document.querySelector(".scroll-watcher-value");function Lt(){Ve.style.width=`${Rt("rounded")}%`}function It(){re?Pi():_i()}function xi(){It()}function _i(){Mt.style.opacity=1,Ve.style.opacity=1}function Pi(){Mt.style.opacity=0,Ve.style.opacity=0}function Rt(n=!1){var e=document.body.scrollHeight-window.innerHeight,t=window.scrollY,a=t/e*100;return n?Math.round(a):a}W.add($,"fov",1,200,1).onChange(()=>{$.updateProjectionMatrix()});const Qe={element:me,isControlling:!1,toggle:function(){this.isControlling=!this.isControlling,this.isControlling?(ze=!1,this.element.style.zIndex=2,le.attach(h)):(ze=!0,this.element.style.zIndex=-9,le.detach(h))},changeHDR:function(){}};W.add(Me,"reset");W.add(Qe,"toggle");W.add(Qe,"changeHDR");const we=W.addFolder("Scroll");we.open(!1);we.add(J,"totalProgress").listen();we.add(J,"lerpTotalProgress").listen();we.add(J,"currentSection").listen();we.add(J,"sectionProgress").listen();we.add(J,"lerpSectionProgress").listen();const ae=W.addFolder("Position");ae.open(!1);function Di(){ae.add(h.position,"x").listen().decimals(2),ae.add(h.position,"y").listen().decimals(2),ae.add(h.position,"z").listen().decimals(2),ae.add(h.rotation,"x").name("rotation x").listen().decimals(2),ae.add(h.rotation,"y").name("rotation y").listen().decimals(2),ae.add(h.rotation,"z").name("rotation z").listen().decimals(2),W.add(Pe,"strength",0,5,.01),W.add(Pe,"threshold",0,.1,1e-4),W.add(Pe,"radius",0,1,.001),W.add(k,"environmentIntensity",0,2,.001),W.add(X,"toneMappingExposure",0,2,.001),W.add(k.environmentRotation,"x",0,Math.PI*2,.001),W.add(k.environmentRotation,"y",0,Math.PI*2,.001),W.add(k.environmentRotation,"z",0,Math.PI*2,.001)}const le=new jt($,X.domElement);le.addEventListener("change",Ei);le.addEventListener("dragging-changed",function(n){Me.enabled=!n.value});window.addEventListener("keydown",function(n){switch(n.key){case"w":le.setMode("translate");break;case"e":le.setMode("rotate");break;case"q":Qe.toggle();break}});let Ae=new i,Fe=new ei;function Ci(){const n=J.currentSection,e=Math.min(1,J.sectionProgress);re?(Ae.copy(et[n].position.getPointAt(e)),Fe.setFromVector3(et[n].rotation.getPointAt(e))):(Ae.copy(tt[n].position.getPointAt(e)),Fe.setFromVector3(tt[n].rotation.getPointAt(e)));const t=new ti;t.setFromEuler(Fe);const a=.05;h.position.lerp(Ae,a),h.quaternion.slerp(t,a)}function st(n,e,t=.1){return(1-t)*n+t*e}const Mi=new lt({color:"black"}),De={};function Li(n){n.isMesh&&Tt.test(n.layers)===!1&&(De[n.uuid]=n.material,n.material=Mi)}function Ii(n){De[n.uuid]&&(n.material=De[n.uuid],delete De[n.uuid])}function Ri(){ft.color.lerp(V,.3),pt.color.lerp(de,.3)}function qe(){re==!0||J.currentSection==0?A=Ue:A=window.innerHeight}_t();Ct();qe();It();J.update();Pt();Lt();Dt();
