import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { AvatarModel } from '../models/AvatarModel';
import StyleScreen from '../constants/StyleScreen';
import { ListItem, Avatar, Button } from 'react-native-elements';

const styleScreen: any = StyleScreen;
const styles = StyleSheet.create(styleScreen);

export class FightsScreen extends React.Component<{ avatar: AvatarModel; navigation: any }, {}> {
  constructor(props: { avatar: AvatarModel; navigation: any }) {
    super(props);
  }

  goToFightsAddScreen() {
    this.props.navigation.navigate('FightsAddScreen');
  }

  render() {
    const list = [
      {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
      },
    ];

    return (
      <View style={styles.container}>
        <View style={{ width: '100%', height: '70%', margin: '1%' }}>
          <View>
            {list.map((l, i) => (
              <ListItem key={i} bottomDivider>
                <Avatar source={{ uri: l.avatar_url }} />
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                  <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
          <Button onPress={() => this.goToFightsAddScreen()} title='Add fight'>
            Start a fight
          </Button>
        </View>
      </View>
    );
  }
}
