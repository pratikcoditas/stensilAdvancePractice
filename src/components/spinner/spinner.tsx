import {Component, h} from '@stencil/core'
Component({
    tag: "pr-spinner",
    styleUrl: './spiner.css',
    shadow: true
})
export class Spinner {
render() {
    return (<div class="lds-roller"><div></div><div></div><div></div><div>
        </div><div></div><div></div><div></div><div></div></div>);
}
}