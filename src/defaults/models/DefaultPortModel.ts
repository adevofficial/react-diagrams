import * as _ from "lodash";
import { PortModel } from "../../models/PortModel";
import { DiagramEngine } from "../../DiagramEngine";
import { DefaultLinkModel } from "./DefaultLinkModel";
import { LinkModel } from "../../models/LinkModel";

export class DefaultPortModel extends PortModel {
	in: boolean;
	label: string;
	links: { [id: string]: DefaultLinkModel };
	InOut?: boolean;

	constructor(
		isInput: boolean,
		name: string,
		label: string = null,
		InOut?: boolean,
		id?: string
	) {
		super(name, "default", id);
		this.in = isInput;
		this.label = label || name;
		this.InOut = InOut;
	}

	deSerialize(object, engine: DiagramEngine) {
		super.deSerialize(object, engine);
		this.in = object.in;
		this.label = object.label;
		this.InOut = object.InOut;
	}

	serialize() {
		return _.merge(super.serialize(), {
			in: this.in,
			label: this.label,
			InOut: this.InOut
		});
	}

	link(port: PortModel): LinkModel {
		let link = this.createLinkModel();
		link.setSourcePort(this);
		link.setTargetPort(port);
		return link;
	}

	canLinkToPort(port: PortModel): boolean {
		if (port instanceof DefaultPortModel) {
			return this.in !== port.in;
		}
		return true;
	}

	createLinkModel(): LinkModel {
		let link = super.createLinkModel();
		return link || new DefaultLinkModel();
	}
}
