import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ZoomableImage from './ZoomableImage'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ZoomableImage
					style={{ backgroundColor: 'red' }}
					source={ { uri: 'https://assets.myntassets.com/v1/assets/images/1368778/2016/6/14/11465907252261-HRX-by-Hrithik-Roshan-Men-Navy--Charcoal-Grey-Running-Shoes-161465907252051-3.jpg' } }
					imageHeight={ 600 }
					imageWidth={ 450 }
				/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
