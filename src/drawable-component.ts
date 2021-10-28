import p5 from "p5";

export abstract class DrawableComponent{
    protected canvas:p5
    
    constructor(canvas:p5){
        this.canvas = canvas
    }

    abstract draw():void
    abstract update(dt: number): void
}