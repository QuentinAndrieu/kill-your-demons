import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import StyleScreen from '../../constants/StyleScreen';
import { AvatarContext } from '../../contexts/AvatarContext';
import { MonstersContext } from '../../contexts/MonstersContext';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export function AvatarScreen() {
  return (
    <AvatarContext.Consumer>
      {(avatarContext) => (
        <MonstersContext.Consumer>
          {(monstersContext) => (
            <View style={styles.container}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  height: '70%',
                }}
              >
                <View style={{ width: '55%', height: '100%', paddingLeft: '5%' }}>
                  <Image
                    source={require('./../../images/avatar.jpg')}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode='stretch'
                    PlaceholderContent={<ActivityIndicator />}
                  ></Image>
                </View>
                <View style={{ width: '45%', height: '100%', flexDirection: 'column', flexWrap: 'wrap' }}>
                  <Text h3 key={'avatarname'} style={{ color: 'black', fontWeight: 'bold' }}>
                    {avatarContext.avatar.name || 'John Doe'}
                  </Text>
                  <Text key={`${avatarContext.avatar.id}pvTotal`} style={{ color: 'black' }}>
                    PV: {avatarContext.avatar.pvTotal} / {avatarContext.avatar.pvTotal}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  height: '50%',
                }}
              ></View>
            </View>
          )}
        </MonstersContext.Consumer>
      )}
    </AvatarContext.Consumer>
  );
}
