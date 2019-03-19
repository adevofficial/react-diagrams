import * as React from "react";
import * as _ from "lodash";
import { DefaultNodeModel } from "../models/DefaultNodeModel";
import { DefaultPortLabel } from "./DefaultPortLabelWidget";
import { DiagramEngine } from "../../DiagramEngine";
import { BaseWidget, BaseWidgetProps } from "../../widgets/BaseWidget";

export interface DefaultNodeProps extends BaseWidgetProps {
	node: DefaultNodeModel;
	diagramEngine: DiagramEngine;
}

export interface DefaultNodeState {}

/**
 * @author Dylan Vorster
 */
export class DefaultNodeWidget extends BaseWidget<
	DefaultNodeProps,
	DefaultNodeState
> {
	constructor(props: DefaultNodeProps) {
		super("srd-default-node", props);
		this.state = {};
	}

	generatePort(port) {
		return <DefaultPortLabel model={port} key={port.id} />;
	}

	generateInOutPort = ports => {
		const inPort = ports[0];
		const outPort = ports[1];
		return (
			<div className={this.bem("__inout_port")} style={{ display: "flex", background: "gray" }}>
				<DefaultPortLabel model={inPort} key={inPort.id} />
				<div className={this.bem("__inout_port_name")}>{inPort.label}</div>
				<DefaultPortLabel model={outPort} key={outPort.id} />
			</div>
		);
	};

	render() {
		return (
			<div
				{...this.getProps()}
				style={{ background: this.props.node.color }}
			>
				<div className={this.bem("__title")}>
					<div className={this.bem("__name")}>
						{this.props.node.name}
					</div>
				</div>
				<div className={this.bem("__inout_ports")}>
					{_.map(
						this.props.node.getInOutPorts(),
						this.generateInOutPort.bind(this)
					)}
				</div>
				<div className={this.bem("__ports")}>
					<div className={this.bem("__in")}>
						{_.map(
							this.props.node.getInPorts(),
							this.generatePort.bind(this)
						)}
					</div>
					<div className={this.bem("__out")}>
						{_.map(
							this.props.node.getOutPorts(),
							this.generatePort.bind(this)
						)}
					</div>
				</div>
			</div>
		);
	}
}
