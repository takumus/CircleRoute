namespace WF {
    export class Holder {
        private _worms: HoldableWorm<Holder>[];
        private _figure: Figure;
        private _animating: boolean;
        private _positionOffset: UTILS.Pos;
        public get worms(): HoldableWorm<Holder>[] {return this._worms; }
        public get figure(): Figure {return this._figure; }
        public get animating(): boolean {return this._animating; }
        public set animating(val: boolean) {this._animating = val; }
        public WormClass: typeof HoldableWorm;
        constructor(WormClass: typeof HoldableWorm) {
            this._worms = [];
            this._positionOffset = new UTILS.Pos();
            this.WormClass = WormClass;
        }
        public setPositionOffset(pos: UTILS.Pos): void {
            if (this._animating) {
                console.error('Cannnot call "Holder.prototype.setPositionOffset" while animating');
                return;
            }
            this._positionOffset = pos;
            if (this._figure) this._figure.setPositionOffset(pos);
        }
        public setFigure(figure: Figure): void {
            if (this._animating) {
                console.error('Cannnot call "Holder.prototype.setFigure" while animating');
                return;
            }
            this._figure = figure.clone();
            this._figure.setPositionOffset(this._positionOffset);
        }
        public generate(): void {
            if (this._animating) {
                console.error('Cannnot call "Holder.prototype.generate" while animating');
                return;
            }
            this.dispose();
            for (let i = 0; i < this._figure.length; i ++) {
                const l = this._figure[i];
                const w = new this.WormClass(l.length);
                w.setHolder(this, true);

                w.setRoute(l);
                this._worms.push(w);
            }
        }
        public dispose(): void {
            if (this._animating) {
                console.error('Cannnot call "Holder.prototype.clear" while animating');
                return;
            }
            this._worms.forEach((worm) => worm.dispose());
            this.clear();
        }
        public clear(): void {
            this._worms = [];
        }
    }
}