import { h, Component } from 'preact';
/** @jsx h */
import Input from './input';

class MeasureInput extends Component {
	constructor(props) {
		super(props);
		this.state = { meas: 'px' };
	}
	handleChange(value, onChange) {
		let convValue = convertValue(value, this.state.meas, 'px');
		this.state.cust = value;
		onChange(convValue);
	}
	render() {
		let { meas, cust } = this.state;
		let { schema, value, onChange, ...props } = this.props;
		if (convertValue(cust, meas, 'px') !== value)
			this.setState({ meas: 'px', cust: value }); // Hack: New store (RESET)
		return (
			<div style="display: inline-flex;" {...props}>
				<Input schema={schema} step={meas === 'px' || meas === 'pt' ? '1' : '0.001'} style="width: 75%;"
					   value={cust} onChange={(v) => this.handleChange(v, onChange)} />
				<Input schema={{ enum: ['cm', 'px', 'pt', 'inch'] }} style="width: 25%;"
					   value={meas}
					   onChange={(m) => this.setState({
						   meas: m,
						   cust: convertValue(this.state.cust, this.state.meas, m)
					   })} />
			</div>
		);
	}
}

function convertValue(value, measureFrom, measureTo) {
	if (!value && value !== 0 || isNaN(value)) return null;
	var measureMap = {
		'px': 1,
		'cm': 37.795278,
		'pt': 1.333333,
		'inch': 96,
	};
	return (measureTo === 'px' || measureTo === 'pt')
		? (value * measureMap[measureFrom] / measureMap[measureTo]).toFixed( ) - 0
		: (value * measureMap[measureFrom] / measureMap[measureTo]).toFixed(3) - 0;
}

export default MeasureInput;
