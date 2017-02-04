namespace UTILS{
    export class Pos {
        public x:number = 0;
        public y:number = 0;

        constructor(x:number = 0, y:number = 0) {
            this.x = x;
            this.y = y;
        }
        public clone():Pos{
            return new Pos(this.x, this.y);
        }
        public equals(pos:Pos, diff:number = 1):boolean{
            const dx = pos.x - this.x;
            const dy = pos.y - this.y;
            return dx*dx+dy*dy < diff
        }
    }
    export class VecPos {
        public pos:Pos;
        public r:number = 0;

        constructor(x:number = 0, y:number = 0, r:number = 0) {
            this.pos = new Pos(x, y);
            this.r = r;
        }
        public clone():VecPos{
            return new VecPos(this.pos.x, this.pos.y, this.r);
        }
        public add(radius:number):VecPos{
            this.r += radius;
            return this;
        }
    }
    export class Circle {
        public pos:Pos;
        public r:number;
        public d:number;
        public tr:number;
        
        constructor(x:number, y:number, r:number, d:number, tr:number) {
            this.pos = new Pos(x, y);
            this.r = r;
            this.d = d;
            this.tr = Matthew.normalize(tr);
        }
    }
}
namespace Matthew{
    export const PI:number = Math.PI;
    export const H_PI:number = Math.PI / 2;
    export const D_PI:number = Math.PI * 2;

    export const normalize = (r:number):number => {
        r = r % D_PI;
        if (r < 0) return D_PI + r;
        return r;
    }
    export const abs = (v:number):number => {
        return v < 0 ? -v : v;
    }
}
window["UTILS"] = UTILS;
window["Matthew"] = Matthew;