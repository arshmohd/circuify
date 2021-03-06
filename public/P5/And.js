class And extends Element {
    constructor() {
        super(4, 2, 2, 2);
        this.inputs = [
            new Joint(null, jointType.INPUT),
            new Joint(null, jointType.INPUT),
        ];
        this.outputs = [new Joint(null, jointType.OUTPUT)];
    }

    show = (pos, cellSize) => {
        this.setColor();

        this.position = pos;

        line(
            pos.x,
            pos.y + cellSize / 2,
            pos.x + cellSize,
            pos.y + cellSize / 2
        );
        line(
            pos.x,
            pos.y + (3 * cellSize) / 2,
            pos.x + cellSize,
            pos.y + (3 * cellSize) / 2
        );

        line(
            pos.x + 3 * cellSize,
            pos.y + cellSize,
            pos.x + 4 * cellSize,
            pos.y + cellSize
        );

        this.inputs[0].show(
            createVector(pos.x, pos.y + cellSize / 2),
            cellSize / 2,
            cellSize,
            this.state
        );

        this.inputs[1].show(
            createVector(pos.x, pos.y + (3 * cellSize) / 2),
            cellSize / 2,
            cellSize,
            this.state
        );

        this.outputs[0].show(
            createVector(pos.x + 4 * cellSize, pos.y + cellSize),
            cellSize / 2,
            cellSize,
            this.state
        );

        this.setColor();

        beginShape();
        vertex(pos.x + cellSize, pos.y);
        vertex(pos.x + 2 * cellSize, pos.y);
        bezierVertex(
            pos.x + 3.2 * cellSize,
            pos.y,
            pos.x + 3.2 * cellSize,
            pos.y + 2 * cellSize,
            pos.x + 2 * cellSize,
            pos.y + 2 * cellSize
        );
        vertex(pos.x + cellSize, pos.y + 2 * cellSize);
        endShape(CLOSE);
    };

    calculateOutput = () => {
        if (
            (this.inputs[0].getState() == null &&
                this.inputs[1].getState() == null) ||
            (this.inputs[0].getState() == true &&
                this.inputs[1].getState() == null) ||
            (this.inputs[0].getState() == null &&
                this.inputs[1].getState() == true)
        ) {
            this.outputs[0].setState(null);
        } else if (
            this.inputs[0].getState() == false ||
            this.inputs[1].getState() == false
        ) {
            this.outputs[0].setState(false);
        } else {
            this.outputs[0].setState(
                this.inputs[0].getState() && this.inputs[1].getState()
            );
        }
    };
}
