import React from 'react';
import { Button, Text, View, Image, StyleSheet, FlatList, TextInput, ActivityIndicator, RefreshControl, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Version can be specified in package.json
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>INBASAN</Text>
        <Text>PENDIDIKAN TEKNIK INFORMATIKA</Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };
  constructor()
    {
        super();
 
        this.state = { 
          Kode: '',
          Nama: '',
          Jumlah: '', 
          Kondisi: '', 
          ActivityIndicator_Loading: false, 

        }
    }
    //fungsi mengirim data ke database
    Insert_Data_Into_MySQL = () =>
    {
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
            fetch('https://bali-pratiwi.000webhostapp.com/inventaris/kirimData.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                  Kode : this.state.Kode,
                  Nama : this.state.Nama,
                  Jumlah : this.state.Jumlah,
                  Kondisi : this.state.Kondisi,
                })
 
            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                alert(responseJsonFromServer);
                this.setState({ ActivityIndicator_Loading : false });
            }).catch((error) =>
            {
                console.error(error);
                /*Alert.alert(
                  'Oops!',
                  'Something went wrong!',
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )*/
                this.setState({ ActivityIndicator_Loading : false});
            });
        });
    }
  render() {
    return (
      <View style={styles.containerMain}>
      
      <View style={styles.box2}>
      <Image
        source={require('./assets/hmj1.png')}
        style={{flex: 10, width: 80, height: 50}}
      />
      
        <Text style={{ textAlign: 'left', paddingTop: 20, paddingBottom: 15,fontSize: 20 }}> Masukan Data Inventaris </Text>
          <TextInput
                style={styles.input}
              placeholder="Kode"
              onChangeText={(Kode) => this.setState({ Kode })}
            />
          <TextInput
                style={styles.input}
              placeholder="Nama Barang"
              onChangeText={(Nama) => this.setState({ Nama })}
            />
            <TextInput
                  style={styles.input}
              placeholder="Jumlah Barang"
              onChangeText={(Jumlah) => this.setState({ Jumlah })}
            />
            <TextInput
                style={styles.input}
              placeholder="Kondisi Barang"
              onChangeText={(Kondisi) => this.setState({ Kondisi })}
            />  
             <TouchableOpacity 
                  activeOpacity = { 0.5 }
                  style = { styles.TouchableOpacityStyle } 
                  onPress = { this.Insert_Data_Into_MySQL }>

                    <Text style = { styles.TextStyle }>Input Data Inventaris</Text>

                </TouchableOpacity>

                {
        
                this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#2196F3' size='large'style={styles.ActivityIndicatorStyle} /> : null
                
                }
      </View>
      <View style={styles.box1}>
      <Button
          title="Detail Data Inventaris"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
      </View>
     </View> //penutup containerMain
     
      
    );
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      ActivityIndicator_Loading: false, 
    };
}

  componentDidMount()  {
    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
        this.setState({refreshing: true});
        const url = 'https://bali-pratiwi.000webhostapp.com/inventaris/getData.php';
       //this.setState({ loading: true });
        fetch (url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("comp");
          console.log(responseJson);
          this.setState({
            data: responseJson,
            error: responseJson.error || null,
            loading: false,
            refreshing: false,
            ActivityIndicator_Loading: false, 

          });
        }
      );
    });
  }
  _keyExtractor = (item, index) => item.Kode;

  render() {
    return (

      <View style={ styles.containerMain }>
         {
          this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#2196F3' size='large'style={styles.ActivityIndicatorStyle} /> : null        
          }
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>
            <View style={styles.BoxClass}>
              <Text>Kode Barang : {item.Kode}</Text>
              <Text>Nama Barang: {item.Nama}</Text>
              <Text>Jumlah Barang : {item.Jumlah}</Text>
              <Text>Kondisi Barang : {item.Kondisi}</Text>
            </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.componentDidMount.bind(this)}
          />
        }
        /> 
        
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        
      </View> 
      
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> Data Inventaris </Text>
      </View>
    );
  }
}

const HomeStack = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
});

const ProfileStack = StackNavigator({
  Profile: { screen: ProfileScreen },
  Details: { screen: DetailsScreen },
});

export default TabNavigator(
  
  {
    Home: { screen: HomeStack },
    Profile: { screen: ProfileStack },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-people${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);
const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    justifyContent:'center',
    margin: 20
  },
  box1: {
    flex: 0.5,
    backgroundColor: 'white',
  },
  box2: {
    flex: 0.6,
    backgroundColor: 'white',
    marginLeft: 12,
    marginRight: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5,
  },
  box3: {
    flex: 0.5,
    backgroundColor: '#00FFFF',
    //marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  box4: {
    flex: 0.3,
    backgroundColor: '#00FFFF',
    //marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  box5: {
    flex: 0.7,
    backgroundColor: '#1565C0',
    margin: 10
  },
  button: {
    width: 140,
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: '#feb401',
    borderColor: '#feaf12',
    //borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    height: 50,
    width: 30,
  },
  icon: {
    tintColor: '#fff',
    height: 25,
    width: 25,
  },
  input: {
    backgroundColor: '#009688',
    borderRadius: 15,
    width: 250,
    alignItems: 'center',
    textAlign: 'center',
    margin: 5
  },
  hasil: {
    backgroundColor: '#009688',
    borderRadius: 15,
    width: 250,
    alignItems: 'center',
    //textAlign: 'center',
    margin: 10,
    height: 50
  },
  BoxClass:
    {
      alignItems: 'center',
      height: 40,
      backgroundColor : "#fff",
      borderWidth: 1,
      borderColor: '#2196F3',
      borderRadius: 7 ,
      marginBottom: 10,
      width: '95%'
    },
 
    TouchableOpacityStyle:
   {
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#2196F3',
      marginBottom: 20,
      width: '70%',
      borderRadius: 7 
 
    },
 
    TextStyle:
    {
       color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },

    ActivityIndicatorStyle:{
      
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    
  }, 
  BoxClass:
    {
      alignItems: 'center',
      height: 100,
      backgroundColor : "#fff",
      borderWidth: 1,
      borderColor: '#2196F3',
      borderRadius: 7 ,
      marginBottom: 10,
      width: '95%'
    },
});