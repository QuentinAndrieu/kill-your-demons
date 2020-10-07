import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import StyleScreen from '../constants/StyleScreen';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export class OverviewScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            margin: '2%',
          }}
        >
          <View style={{ width: '98%', height: 300, backgroundColor: 'green' }} />
        </View>
      </View>
    );
  }
}
