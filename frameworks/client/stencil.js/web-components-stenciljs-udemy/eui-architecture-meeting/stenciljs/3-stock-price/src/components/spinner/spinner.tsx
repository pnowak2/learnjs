import { Component, h } from "@stencil/core";

@Component({
	tag: 'eui-spinner',
	styleUrl: './spinner.css',
	shadow: true
})
export class EuiSpinner {
	render() {
		return <div>Loading</div>
	}
}