import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ZoomableImage from './ZoomableImage'
import PulsingCircle from './PulsingCircle'

const annotations = [
	{
		x1: 25,
		x2: 35,
		y1: 20,
		y2: 30,
		description: 'A pair of black running sports shoes, has lace-up detail. Textile and mesh upper',
	},
	{
		x1: 60,
		x2: 70,
		y1: 15,
		y2: 25,
		description: 'Shoe sole tip!',
	},
	{
		x1: 20,
		x2: 30,
		y1: 50,
		y2: 60,
		description: 'Textured and patterned outsole',
	},
	{
		x1: 65,
		x2: 75,
		y1: 65,
		y2: 75,
		description: 'Textured outsole with a stacked heel',
	},
]

export default class App extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container} scrollEnabled={ false }>
        <ZoomableImage
					source={ require('./test.jpg') }
					imageHeight={ 600 }
					imageWidth={ 450 }
					annotations={ annotations }
					popOverStyles={ { backgroundColor: 'white' } }
				/>
				<View style={ { height: 1000 } }/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
