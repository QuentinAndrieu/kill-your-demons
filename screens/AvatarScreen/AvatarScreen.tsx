import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';
import StyleScreen from '../../constants/StyleScreen';
import { AvatarContext } from '../../contexts/AvatarContext';
import { MonstersContext } from '../../contexts/MonstersContext';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export class AvatarScreen extends React.Component {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <AvatarContext.Consumer>
        {(avatarContext) => (
          <MonstersContext.Consumer>
            {(monstersContext) => (
              <View style={styles.container}>
                <View style={{ width: '100%', height: '60%' }}>
                  <Image
                    source={require('./../../images/avatar.jpg')}
                    style={{ width: '100%', height: '100%' }}
                    PlaceholderContent={<ActivityIndicator />}
                  ></Image>
                </View>
                <View style={{ width: '100%', height: '40%' }}></View>
              </View>
            )}
          </MonstersContext.Consumer>
        )}
      </AvatarContext.Consumer>
    );
  }
}
