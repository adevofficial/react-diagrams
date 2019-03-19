import { DefaultPortModel } from "./DefaultPortModel";
import * as _ from "lodash";

import { NodeModel } from "../../models/NodeModel";
import { Toolkit } from "../../Toolkit";
import { DiagramEngine } from "../../DiagramEngine";

/**
 * @author Dylan Vorster
 */
export class DefaultNodeModel extends NodeModel {
	name: string;
	color: string;
	ports: { [s: string]: DefaultPortModel };

	constructor(name: string = "Untitled", color: string = "rgb(0,192,255)") {
		super("default");
		this.name = name;
		this.color = color;
	}

	addInOutPort(label: string): DefaultPortModel[] {
		const inPort = this.addPort(
			new DefaultPortModel(true, Toolkit.UID(), label, true)
		);
		const outPort = this.addPort(
			new DefaultPortModel(false, Toolkit.UID(), label, true)
		);

		return [inPort, outPort];
	}

	addInPort(label: string): DefaultPortModel {
		return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label));
	}

	addOutPort(label: string): DefaultPortModel {
		return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label));
	}

	deSerialize(object, engine: DiagramEngine) {
		super.deSerialize(object, engine);
		this.name = object.name;
		this.color = object.color;
	}

	serialize() {
		return _.merge(super.serialize(), {
			name: this.name,
			color: this.color
		});
	}

	getInOutPorts(): any {
		let InOutObj = {};
		_.map(this.ports, portModel => {
			if (portModel.InOut) {
				if (!Array.isArray(InOutObj[portModel.label])) {
					InOutObj[portModel.label] = [];
				}
				InOutObj[portModel.label].push(portModel);
			}
		});
		return InOutObj;
	}

	getInPorts(): DefaultPortModel[] {
		return _.filter(this.ports, portModel => {
			return portModel.in && !portModel.InOut;
		});
	}

	getOutPorts(): DefaultPortModel[] {
		return _.filter(this.ports, portModel => {
			return !portModel.in && !portModel.InOut;
		});
	}
}
