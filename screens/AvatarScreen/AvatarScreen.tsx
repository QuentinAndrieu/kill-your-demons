import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
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
                <View style={{ width: '100%', margin: '1%', flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginTop: '5%' }}>
                  <View style={{ width: '55%', height: '55%', paddingLeft: '5%' }}>
                    <Image
                      source={require('./../../images/avatar.jpg')}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode='stretch'
                      PlaceholderContent={<ActivityIndicator />}
                    ></Image>
                  </View>
                  <View style={{ width: '45%', height: '40%' }}>
                    <Text h5 key={'avatarname'} style={{ color: 'black', fontWeight: 'bold' }}>
                      {avatarContext.avatar.name}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </MonstersContext.Consumer>
        )}
      </AvatarContext.Consumer>
    );
  }
}
