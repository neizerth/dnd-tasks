export class HTMLComponent {
    constructor(parent, options = {}) {
        this.parent = parent;
        this.options = options;
    }

    static of(parent, options) {
        return new this(parent, options);
    }

    get template() {
        return null;
    }

    render() {
        if (!this.template) {
            return;
        }
        this.container = this.template;
        this.parent.append(this.container);

        return this;
    }
}