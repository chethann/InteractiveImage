/* eslint react-native/no-color-literals:0 */
import React, { Component } from 'react'
import {
	Animated,
	Modal,
	TouchableHighlight,
	StyleSheet,
	View } from 'react-native'

const DEFAULT_ANIMATION_DURATION = 300

const styles = StyleSheet.create({
	overlay: {
		flexGrow: 1,
		backgroundColor: 'rgb(0,0,0)',
	},
	container: { flexGrow: 1 },

	triangle: {
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderLeftWidth: 6.5,
		borderRightWidth: 6.5,
		borderBottomWidth: 10,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
	},

	triangleDown: {
		width: 0,
		height: 0,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderLeftWidth: 6.5,
		borderRightWidth: 6.5,
		borderTopWidth: 10,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
	},
})

class Popup extends Component {
	constructor (props) {
		super(props)
		this.state = {
			modalVisible: false,
			opacityBackground: new Animated.Value(0),
			opacityContent: new Animated.Value(0),
		}
		this.close = this.close.bind(this)
		this.initAdditionalStyles(props)
	}

	componentWillReceiveProps (newProps) {
		this.initAdditionalStyles(newProps)
	}

	initAdditionalStyles (props) {
		this.additionalStyles = {
			position: 'absolute',
			top: props.top || 0,
			left: props.left || 0,
			backgroundColor: 'transparent',
		}
		this.additionalTriangleHeight = {
			borderBottomColor: props.arrowColor || 'white',
			marginLeft: props.arrowOffset || 0,
		}
		this.additionalArrowStyles = {
			marginLeft: props.arrowOffset || 0,
			borderTopColor: props.arrowColor || 'white',
		}
	}

	close () {
		const fadeBackground = Animated.timing(
			this.state.opacityBackground,
			{
				toValue: 0,
				duration: DEFAULT_ANIMATION_DURATION,
			},
		)

		const fadeContent = Animated.timing(
			this.state.opacityContent,
			{
				toValue: 0,
				duration: DEFAULT_ANIMATION_DURATION / 2,
				useNativeDriver: true,
			},
		)
		Animated.parallel([ fadeBackground, fadeContent ]).start(() => {
			this.setState({ modalVisible: false })
			this.props.onClose && this.props.onClose()
		})
	}

	show () {
		this.setState({ modalVisible: true })
		this.props.onOpen && this.props.onOpen()
		const fadeBackground = Animated.timing(
			this.state.opacityBackground,
			{
				toValue: 0.4,
				duration: DEFAULT_ANIMATION_DURATION,
			},
		)

		const fadeContent = Animated.timing(
			this.state.opacityContent,
			{
				toValue: 1,
				duration: DEFAULT_ANIMATION_DURATION / 2,
				useNativeDriver: true,
			},
		)
		Animated.parallel([ fadeBackground, fadeContent ]).start()
	}

	render () {
		const heightStyle = this.props.height ? { height: this.props.height } : {}
		const widthStyle = this.props.width ? { width: this.props.width } : {}

		const backgroundColorStyle = { opacity: this.state.opacityBackground, flexGrow: 1 }
		const contentStyle = { opacity: this.state.opacityContent }

		const arrowStyle = this.props.height
			? {
				position: 'absolute',
				top: this.props.height,
			} : {}
		return (
			<Modal
				transparent
				visible={ this.state.modalVisible }
				onRequestClose={ this.close }
			>

				<View style={ styles.container }>
					<Animated.View style={ backgroundColorStyle }>
						<TouchableHighlight
							style={ styles.overlay }
							onPress={ this.close }
						>
							<View />
						</TouchableHighlight>
					</Animated.View>

					<Animated.View
						style={ [ this.additionalStyles, heightStyle, widthStyle, contentStyle ] }
					>
							{this.props.arrowDirection === 'up'
								? <View
									style={ [ styles.triangle, this.additionalTriangleHeight, this.additionalArrowStyles ] }
								/>
									: null }

						<View>
							{this.props.children}
						</View>

						{this.props.arrowDirection === 'down'
							? <View
								style={ [ styles.triangleDown, arrowStyle,
									this.additionalArrowStyles ] }
							/> : null
						}
					</Animated.View>
				</View>
			</Modal>
		)
	}

}

Popup.propTypes = {
	arrowOffset: React.PropTypes.number,
	arrowDirection: React.PropTypes.oneOf([ 'up', 'down' ]),
	height: React.PropTypes.number,
	width: React.PropTypes.number,
	onOpen: React.PropTypes.func,
	onClose: React.PropTypes.func,
	children: React.PropTypes.object,
}

export default Popup
