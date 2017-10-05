import React, {Component, PropTypes} from 'react'
import { Animated, ScrollView, StyleSheet, Dimensions, View, PanResponder, Image, TouchableWithoutFeedback } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})

const MAX_ZOOM = 4
const ANIMATION_DURATION = 600

class ZoomableImage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			scale: new Animated.Value(1),
			inZoomedState: false,
			isZooming: false,
			offsetX: 0,
			offsetY: 0,
		}
		this.onImagePress = this.onImagePress.bind(this)
		this.initValues = this.initValues.bind(this)

		this.onMoveShouldSetPanResponder = this.onMoveShouldSetPanResponder.bind(this)
		this.onPanResponderMove = this.onPanResponderMove.bind(this)
		this.onPanResponderRelease = this.onPanResponderRelease.bind(this)
		this.onPanResponderTerminate = this.onPanResponderTerminate.bind(this)
		this.onPanResponderGrant = this.onPanResponderGrant.bind(this)
		this.trueFunction = () => true
		this.falseFunction = () => false
		this.previousDistanceX = 0
		this.previousDistanceY = 0
	}


	componentWillMount() {
		this.state.scale.addListener(this.initValues)
		this.initPanResponder()
	}

	componentWillUnMount() {

	}

	initValues ({ value }) {
		this.scale = value
		console.log(value)
		let offsetX = (this.props.imageWidth / 2 - this.locationX ) * this.scale
		let offsetY = (this.props.imageHeight / 2 - this.locationY ) * this.scale
		const maxOffsetY = this.props.imageHeight * (this.scale -1) / 2
		const maxOffsetX = this.props.imageWidth * (this.scale -1) / 2

		this.offsetY = Math.abs(offsetY) > maxOffsetY ? (offsetY > 0 ? maxOffsetY : -maxOffsetY) : offsetY
		this.offsetX = Math.abs(offsetX) > maxOffsetX ? (offsetX > 0 ? maxOffsetX: -maxOffsetX ) : offsetX
		//this.offsetY = offsetY
		//this.offsetX = offsetX
		this.setState({
			offsetX: this.offsetX,
			offsetY: this.offsetY,
		})
	}

	initPanResponder () {
		const config = {
			onStartShouldSetPanResponder: this.trueFunction,
			onStartShouldSetPanResponderCapture: this.falseFunction,
			onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
			onMoveShouldSetPanResponderCapture: this.onMoveShouldSetPanResponder,
			onPanResponderMove: this.onPanResponderMove,
			onPanResponderTerminationRequest: this.trueFunction,
			onPanResponderRelease: this.onPanResponderRelease,
			onPanResponderTerminate: this.onPanResponderTerminate,
			onShouldBlockNativeResponder: this.trueFunction,
			onPanResponderGrant: this.onPanResponderGrant,
		}
		this.panResponder = PanResponder.create(config)
	}

	onPanResponderGrant () {
		this.previousDistanceX = 0
		this.previousDistanceY = 0
		console.log('start', this.offsetXStartValue, this.offsetYStartValue, this.state.offsetX, this.state.offsetY)
	}

	onMoveShouldSetPanResponder (e, state) {
		return this.state.inZoomedState && !this.state.isZooming
	}

	onPanResponderMove (e, s) {
		const distanceMovedX = s.dx - this.previousDistanceX
		const distanceMovedY = s.dy - this.previousDistanceY
		console.log(distanceMovedX)
		this.previousDistanceX = s.dx
		this.previousDistanceY = s.dy
		let offsetX = this.state.offsetX + distanceMovedX
		let offsetY = this.state.offsetY + distanceMovedY
		const maxOffsetY = this.props.imageHeight * (this.scale -1) / 2
		const maxOffsetX = this.props.imageWidth * (this.scale -1) / 2

		this.offsetY = Math.abs(offsetY) > maxOffsetY ? (offsetY > 0 ? maxOffsetY : -maxOffsetY) : offsetY
		this.offsetX = Math.abs(offsetX) > maxOffsetX ? (offsetX > 0 ? maxOffsetX: -maxOffsetX ) : offsetX
		this.setState({
			offsetX: this.offsetX,
			offsetY: this.offsetY,
		})
	}

	onPanResponderRelease (e, state) {
	}

	onPanResponderTerminate () {

	}

	onImagePress (e) {
		const { nativeEvent: { locationX = 0, locationY = 0 } = {}  } = e
		if (!this.state.inZoomedState) {
			this.locationX = locationX
			this.locationY = locationY
			this.zoomUpImage()
		}
		else
			this.zoomDownImage()
	}

	zoomUpImage () {
		this.setState({ isZooming: true })
		Animated.timing(
			this.state.scale,
			{
				toValue: MAX_ZOOM,
				duration: ANIMATION_DURATION,
				useNativeDrive: true,
			}
		).start(() => this.setState({ inZoomedState: true, isZooming: false  }))
	}

	zoomDownImage () {
		this.setState({ isZooming: true })
		Animated.timing(
			this.state.scale,
			{
				toValue: 1,
				duration: ANIMATION_DURATION,
			}
		).start(() => this.setState({ inZoomedState: false, offsetX: 0, offsetY: 0, isZooming: false  }))
	}

	render() {
		const tansformStyles = { transform: [
			{ scale: this.state.scale },

		] }

		//this.initValues()

		return (
		  <ScrollView
				style={ { maxHeight: this.props.imageHeight, width: this.props.imageWidth, backgroundColor: 'blue' } }
				{ ...this.panResponder.panHandlers }
				bounces={ false }
				scrollEventThrottle={ 15 }
			>
				<TouchableWithoutFeedback
					onPress={ this.onImagePress }
					style= { { height: this.props.imageHeight, width: this.props.imageWidth, backgroundColor: 'red' } }
				>
					<Animated.Image
						source={ this.props.source }
						style={ [ tansformStyles, { height: this.props.imageHeight, width: this.props.imageWidth, top: this.state.offsetY , left: this.state.offsetX } ] }
					/>
				</TouchableWithoutFeedback>

		  </ScrollView>
		)
	}
}

ZoomableImage.propTypes = {
  imageWidth: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
  source: PropTypes.object.isRequired,
};
export default ZoomableImage
