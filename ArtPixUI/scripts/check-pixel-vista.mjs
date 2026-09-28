import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PixelVistaBackground } from "../dist/art-pix-ui.js";
const require = createRequire(import.meta.url);
const root = "../src/components/decorative-effects/PixelVistaBackground/";
const source = name => readFileSync(new URL(root + name, import.meta.url), "utf8");
const compiled = text => ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
const model = { exports: {} };
new Function("module", "exports", compiled(source("vista.ts")))(model, model.exports);
const { randomSource, nextScenery, sceneDuration, surface, paintTerrain, terrainAt, paintWorldStrip, layerSpeeds, mixColor, sceneryTypes } = model.exports;
for (const [rate, expected] of [[0,0],[.125,3],[.5,12],[1,24],[1.25,30],[2,48],[-1,0],[NaN,24],[Infinity,24],[101,2400]]) assert.equal(model.exports.movementSpeed(24,rate),expected);
assert.equal(model.exports.movementSpeed(60,2),120);
assert.equal(model.exports.movementSpeed(0,2),0);
assert.equal(model.exports.defaultMovementSpeed,720,"Default movement is three times the previous 240");
assert.equal(model.exports.movementSpeed(720,1),720);
assert.equal(model.exports.movementSpeed(NaN,1),720);
assert.equal(model.exports.movementSpeed(240,.1),24,"0.1× restores original movement speed");
assert.deepEqual(layerSpeeds, [.25,.45,.7,1], "Preserve the approved parallax speeds");
assert.equal(mixColor("#000000","#ffffff",.5),"#808080");
const noon = model.exports.celestialState(0,640,360), midnight = model.exports.celestialState(60000,640,360);
assert.equal(model.exports.dayCycleDuration,120000);
assert.deepEqual(model.exports.celestialState(120000,640,360),noon,"Full sun→moon→sun orbit lasts exactly 120 seconds");
assert.equal(noon.night,0); assert.equal(midnight.night,1);
assert(noon.sun.y<noon.horizon && noon.moon.y>noon.horizon);
assert(midnight.moon.y<midnight.horizon && midnight.sun.y>midnight.horizon);
for (const height of [360, 720, 960]) for(let ms=0;ms<120000;ms+=1000) {
    const state=model.exports.celestialState(ms,640,height);
    assert(Math.abs(state.sun.x+state.moon.x-640)<1e-8);
    assert.equal(state.horizon,Math.round(height*.78),"Bodies set at the ocean line rather than the old sky midpoint");
    assert.equal(state.center.y,height*.8,"Center is just below the ocean line");
    assert(Math.abs(state.sun.y+state.moon.y-2*state.center.y)<1e-8,"Sun and moon are opposite on the same orbit");
    assert(Math.abs(((state.sun.x-320)/(640*.31))**2+((state.sun.y-state.center.y)/(height*.69))**2-1)<1e-8,"Elliptical celestial path matches the reference proportions");
}
for (const from of sceneryTypes) for (const to of sceneryTypes) for (let layer=0;layer<4;layer++) {
    const before=[{start:0,kind:from,seed:7,transitionWidth:1}];
    const sequence=[...before,{start:700,kind:to,seed:12,transitionWidth:72}];
    for (const x of [0,100,600,699]) assert.deepEqual(terrainAt(sequence,layer,x,640,360),terrainAt(before,layer,x,640,360),"Future scenery cannot change existing columns");
    const endpoint = (kind,x,seed) => kind === "ocean" ? 400 : surface(kind,layer,x,640,360,seed);
    assert.equal(terrainAt(sequence,layer,700,640,360).y,endpoint(from,700,7));
    assert.equal(terrainAt(sequence,layer,772,640,360).y,endpoint(to,772,12));
    const midway=terrainAt(sequence,layer,736,640,360);
    assert.equal(midway.y,Math.round((endpoint(from,736,7)+endpoint(to,736,12))/2));
    if ((from === "ocean") !== (to === "ocean")) {
        const landKind = from === "ocean" ? to : from;
        const land = terrainAt([{start:0,kind:landKind,seed:7,transitionWidth:1}],layer,736,640,360);
        assert.deepEqual(midway.colors,land.colors,"Coastline retains land colors instead of becoming blue");
    }
    const stable=terrainAt(sequence,layer,730,640,360);
    sequence.push({start:850,kind:"ocean",seed:99,transitionWidth:72});
    assert.deepEqual(terrainAt(sequence,layer,730,640,360),stable);
}
const a = randomSource(42), b = randomSource(42);
for (let i = 0; i < 1000; i++) { const value = a(); assert(value >= 0 && value < 1); assert.equal(value, b()); }
const random = randomSource(123); let current = "plains"; const visited = new Set();
for (let i = 0; i < 100; i++) { const next = nextScenery(current, random); assert.notEqual(next, current); visited.add(next); current = next; const duration = sceneDuration(random); assert(duration >= 15000 && duration <= 20000); }
assert.equal(visited.size, 4); assert.equal(sceneDuration(() => 0), 15000);
assert.equal(sceneDuration(() => 1), 20000);
let rectangles = 0;
const paintContext = { clearRect(){}, fillRect(...args){ assert(args.every(Number.isFinite)); rectangles++; } };
for (const kind of sceneryTypes) for (let layer = 0; layer < 4; layer++) {
    assert.equal(surface(kind,layer,0,640,360,123),surface(kind,layer,640,640,360,123));
    paintTerrain(paintContext,kind,layer,640,360,123);
}
assert(rectangles > 20000);
for(const kind of sceneryTypes)for(let layer=0;layer<4;layer++)paintWorldStrip(paintContext,[{start:0,kind:"hills",seed:7,transitionWidth:1},{start:640,kind,seed:42,transitionWidth:72}],layer,620,128,360,640);
// Regression: translucent texture must not make subsequent ground columns translucent.
for (const height of [240,360,720]) for (const kind of sceneryTypes.filter(kind=>kind!=="ocean")) for (let layer=0;layer<4;layer++) {
    const bottoms = new Float64Array(128);
    const raster = {
        globalAlpha:.4, fillStyle:"",
        clearRect(){},
        fillRect(x,y,w,h){
            if(y>height-1 || y+h<=height-1)return;
            for(let col=Math.max(0,Math.ceil(x));col<Math.min(128,Math.ceil(x+w));col++)bottoms[col]=this.globalAlpha+bottoms[col]*(1-this.globalAlpha);
        },
    };
    paintWorldStrip(raster,[{start:0,kind:"hills",seed:7,transitionWidth:1},{start:640,kind,seed:42,transitionWidth:72}],layer,620,128,height,640);
    assert(bottoms.every(alpha=>alpha===1),"Every terrain column, including chunk edges, must cover the rear layers fully");
    assert.equal(raster.globalAlpha,1,"Reset drawing alpha after painting");
}
const html = renderToStaticMarkup(createElement(PixelVistaBackground, { seed: 123, initialScenery: "desert" }, createElement("a",{href:"#test"},"Foreground")));
for(let layer=0;layer<4;layer++) {
    let painted=0;
    paintWorldStrip({clearRect(){},fillRect(){painted++;}},[{start:0,kind:"ocean",seed:7,transitionWidth:1}],layer,0,128,360,640);
    assert.equal(painted,0,"Ocean terrain strips are transparent: reveal the independent water backdrop");
}
const waterCalls=[];
model.exports.paintOcean({fillRect(...args){assert(args.every(Number.isFinite));waterCalls.push(args);}},640,360,123);
assert(waterCalls.length>100,"Water backdrop includes moving wave crests");
assert.deepEqual(waterCalls.filter(([x,,w])=>x===0&&w===640).map(([,y])=>y),[.78,.835,.885].map(value=>Math.round(360*value)),"All three bands move down six percent with spacing preserved");
assert(waterCalls.every(([,y])=>y>=Math.round(360*.78)-3),"No distant water shelf remains");
for (const [pass, positions] of [["rear", [.78]], ["middle", [.835]], ["front", [.885]]]) {
    const bands = [];
    model.exports.paintOcean({fillRect(x,y,w){if(x===0&&w===640)bands.push(y);}},640,360,123,pass);
    assert.deepEqual(bands,positions.map(value=>Math.round(360*value)),`${pass} pass draws only its assigned water bands`);
}
assert.match(html, /aria-hidden="true"/); assert.match(html, /Pause scenery/); assert.match(html, /Foreground/);
assert(!renderToStaticMarkup(createElement(PixelVistaBackground,{showControls:false})).includes("<button"));
assert.match(renderToStaticMarkup(createElement(PixelVistaBackground,{paused:true})),/disabled=""/);
const zeroRate = renderToStaticMarkup(createElement(PixelVistaBackground,{movementRate:0}));
assert.match(zeroRate,/Scenery paused/); assert.match(zeroRate,/disabled=""/);
assert(!html.includes("movementRate="), "Component-only prop does not leak to DOM");

// Isolated lifecycle fixture: no browser access and no DOM emulation package.
function lifecycle({ paused = false, reduced = false, movementRate = 1, initialHeight = 360 } = {}) {
    const saved = Object.fromEntries(["window","document","requestAnimationFrame","cancelAnimationFrame","ResizeObserver","IntersectionObserver"].map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]));
    const frames = new Map(), effects = [], cleanups = [], mainDraws = [], suns = []; let sequence = 0, canvases = 0, resizeCallback, measuredHeight=initialHeight, scheduleCalls=0;
    let drawOrder = [];
    let lastSkyTime = 0;
    const context = {
        fillStyle:"", globalAlpha:1, imageSmoothingEnabled:true,
        clearRect(){}, createLinearGradient(){return {addColorStop(){}};},
        fillRect(x,y,w,h){ assert(!String(this.fillStyle).startsWith("rgba(8, 15, 43"),"No rectangular night tint"); if(this.fillStyle === "#f8dc85") suns.push([x,y,w,h]); },
        drawImage(tile,x,y){ drawOrder.push("land"); assert.equal(tile.height,canvas.height,"Cached strips must match the current canvas height"); mainDraws.push([x,y,this.globalAlpha]); },
    };
    const canvas = { width:640,height:initialHeight,getContext:()=>context,getBoundingClientRect:()=>({width:640,height:measuredHeight}) };
    globalThis.window = {matchMedia:()=>({matches:reduced,addEventListener(){},removeEventListener(){}})};
    globalThis.document = {hidden:false,addEventListener(){},removeEventListener(){},createElement(){canvases++;return {width:0,height:0,getContext:()=>({clearRect(){},fillRect(){},drawImage(){}})};}};
    globalThis.ResizeObserver = class { constructor(callback){resizeCallback=callback;} observe(){} disconnect(){} }; globalThis.IntersectionObserver = undefined;
    globalThis.requestAnimationFrame = callback => { frames.set(++sequence,callback);return sequence; };
    globalThis.cancelAnimationFrame = id => frames.delete(id);
    const hooks = {useRef:value=>({current:value === null ? canvas : value}),useState:value=>[value,()=>{}],useEffect:effect=>effects.push(effect)};
    const mod = {exports:{}};
    try {
        const trackedModel={...model.exports,
            paintSky(...args){lastSkyTime=args[3];drawOrder=[];return model.exports.paintSky(...args);},
            paintOcean(...args){drawOrder.push(args[4]);return model.exports.paintOcean(...args);},
            sceneDuration:random=>{scheduleCalls++;return model.exports.sceneDuration(random);}};
        new Function("require","module","exports",compiled(source("PixelVistaBackground.tsx")))(id=>id==="react"?hooks:id.endsWith("vista.js")?trackedModel:id.endsWith(".css")?{}:require(id),mod,mod.exports);
        mod.exports.PixelVistaBackground({seed:123,paused,movementRate});
        for (const effect of effects) { const cleanup=effect(); if(cleanup)cleanups.push(cleanup); }
        const before = canvases; const initialDraws = mainDraws.length;
        for(let time=100;time<=22000;time+=100){const [id,callback]=frames.entries().next().value;frames.delete(id);callback(time);}
        if(paused||reduced||movementRate===0){assert.equal(canvases,before);assert.equal(mainDraws.length,initialDraws);}
        else { assert(canvases>before,"New world chunks are generated while scrolling"); assert(mainDraws.some(([x])=>x<0),"Terrain scrolls left"); assert(mainDraws.every(([, ,alpha])=>alpha===1),"No whole-frame opacity fade"); }
        if(paused||reduced||movementRate===0)assert.equal(scheduleCalls,1);
        else {
            assert(new Set(suns.map(rect=>rect.slice(0,2).join(","))).size>2,"Sun advances along its orbit");
            if(movementRate===.5)assert.equal(scheduleCalls,1,"Half speed waits 30–40 seconds");
            if(movementRate===1)assert.equal(scheduleCalls,2,"Default scenery interval remains 15–20 seconds");
            if(movementRate===2)assert(scheduleCalls>=3,"Double speed selects scenery every 7.5–10 seconds");
        }
        assert(Math.abs(lastSkyTime - ((paused || reduced || movementRate===0) ? 0 : 21900*movementRate%120000))<1e-6,"Celestial clock scales with movement rate and freezes when stopped");
        measuredHeight=720; resizeCallback(); assert.equal(canvas.height,720);
        measuredHeight=240; resizeCallback(); assert.equal(canvas.height,240);
        assert.deepEqual(drawOrder.filter((pass,index)=>pass!==drawOrder[index-1]),
            ["rear","land","middle","front","land"],
            "Middle and closest water sit behind the front two terrain layers");
        for(const cleanup of cleanups)cleanup(); assert.equal(frames.size,0,"Unmount cancels animation frame");
    } finally { for(const [key,descriptor]of Object.entries(saved))if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key]; }
}
lifecycle(); lifecycle({paused:true}); lifecycle({reduced:true});
lifecycle({movementRate:0}); lifecycle({movementRate:.5}); lifecycle({movementRate:2});
lifecycle({initialHeight:720,movementRate:10}); lifecycle({initialHeight:720,paused:true});
console.log("PixelVistaBackground: terrain/coastlines, wave stacking, 720 default speed, inverse scenery timing, movement-scaled 120-second elliptical sun/moon cycle, geometry, SSR, pause/reduced motion and cleanup passed. Visual/browser review pending.");
