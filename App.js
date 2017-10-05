import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ZoomableImage from './ZoomableImage'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ZoomableImage
					style={{ backgroundColor: 'red' }}
					source={ { uri: 'https://assets.myntassets.com/w_5000/v1/assets/images/1894652/2017/5/29/11496035983890-DHRUVI-Silver-Toned-Dome-Shaped-Jhumkas-8601496035983793-1.jpg' } }
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
