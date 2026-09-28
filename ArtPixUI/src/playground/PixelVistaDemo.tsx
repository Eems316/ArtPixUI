import { useState } from "react";
import { Button, Checkbox, Label, SortSelect, TextInput, PixelVistaBackground, type VistaScenery } from "../index.js";
export function PixelVistaDemo() {
    const [scene, setScene] = useState<VistaScenery>("plains");
    const [seed, setSeed] = useState(2026);
    const [paused, setPaused] = useState(false);
    const [showText, setShowText] = useState(true);
    const [movementRate, setMovementRate] = useState(1);
    const [rateInput, setRateInput] = useState("1");
    return <section className="playground-exhibit" id="pixel-vista-background-demo" aria-labelledby="pixel-vista-background-heading">
        <div className="playground-exhibit-heading"><span className="playground-number">187</span><h2 id="pixel-vista-background-heading">A world drifting by</h2><span className="playground-kind">PIXEL VISTA · AWAITING REVIEW</span></div>
        <div style={{ padding: 24, display: "grid", gap: 20 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                <SortSelect label="Starting scenery" value={scene} onChange={value => setScene(value as VistaScenery)} options={["plains","hills","desert","ocean"].map(value => ({ id: value, label: value }))} />
                <Button onClick={() => setSeed(value => value + 1)}>Generate a new world</Button>
                <Label><Checkbox checked={paused} onChange={event => setPaused(event.target.checked)} /> Pause externally</Label>
                <Label><Checkbox checked={showText} onChange={event => setShowText(event.target.checked)} /> Show text box</Label>
                <Label>Movement rate × <TextInput type="number" inputMode="decimal" min={0} max={100} step="any" style={{ width: 110 }} value={rateInput} onChange={event => {
                    setRateInput(event.target.value);
                    const value = event.target.valueAsNumber;
                    if (Number.isFinite(value) && value >= 0 && value <= 100) setMovementRate(value);
                }} onBlur={() => setRateInput(String(movementRate))} /></Label>
            </div>
            <PixelVistaBackground showControls={false} initialScenery={scene} seed={seed} paused={paused} movementRate={movementRate} style={{ minHeight: 440 }}>
                {showText && <div style={{ display:"inline-block", maxWidth:320, background:"#fff9e5ee", padding:20, border:"2px solid #2c3025", borderRadius:12, boxShadow:"0 4px 0 #2c3025" }}>
                    <small>THE LONG WAY HOME</small><h3 style={{margin:"10px 0"}}>Let the horizon wander.</h3><p style={{margin:0}}>An endless, freshly generated pixel landscape. Stay a little while.</p>
                </div>}
            </PixelVistaBackground>
        </div>
    </section>;
}
