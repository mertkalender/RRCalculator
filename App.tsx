import React, { useState } from 'react';
import { View,  SafeAreaView, StatusBar, TextInput, StyleSheet, Text, Alert, ToastAndroid} from 'react-native';
import { Button } from 'react-native-paper';
import ToggleSwitch from 'rn-toggle-switch';
import { Picker } from '@react-native-picker/picker';

export default function App ()  {

  const [isLong, setIsLong] = useState(true);
  const toggleSwitch = () => setIsLong(!isLong)

  const [rValue, setRValue] = useState<number>(0);
  const [entry, setEntry] = useState<number>(0);
  const [stop, setStop] = useState<number>(0);
  const [leverage, setLeverage] = useState<number>(0);
  const leverageArray = Array.from({length: 126}, (x, i) => i);

  const calculate = () => {
    if(rValue && entry && stop) {
      let diff, percentage, positionSize;
      if (isLong) {
        console.log(typeof(entry))
        console.log(stop)
        if (entry > stop) {
          diff = entry - stop;
          percentage = diff / entry;
          positionSize = rValue / percentage;
          positionSize = Math.floor(positionSize);
          Alert.alert("Result:", "Position size: " + positionSize + "$", [{ text: "Okay", onPress: () =>  null}]);
        }
        else {
          Alert.alert("Error", "Entry should be greater than stop!", [{ text: "Okay", onPress: () =>  null}]);
        }
      }
      else {
        if(stop > entry) {
          diff = stop - entry;
          percentage = diff / entry;
          positionSize = rValue / percentage;
          positionSize = Math.floor(positionSize);
          Alert.alert("Result:", "Position size: " + positionSize, [{ text: "Okay", onPress: () =>  null}]);
        }
        else {
          Alert.alert("Error", "Stop should be greater than entry!", [{ text: "Okay", onPress: () =>  null}]);
        }

      }
    }
    else {
      ToastAndroid.showWithGravityAndOffset(
        "Please fill all the fields!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        250
      )
    }

  }

  const renderPickerList = () => {    // Create picker elements from pubs array
    return leverageArray?.map((num) => {
      return <Picker.Item label={num.toString()} value={num} key={num}/>
    })
  }
 
  return (

    <SafeAreaView style={styles.page}>
      <View style={{marginBottom: '9%'}}>
        <ToggleSwitch
          text={{on: 'LONG', off: 'SHORT', activeTextColor: 'white', inactiveTextColor: 'black'}}
          textStyle={{fontWeight: 'bold'}}
          color={{ indicator: 'white', active: '#006400', inactive:  '#8b0000', activeBorder: '#006400', inactiveBorder: '#8b0000'}}
          active={isLong}
          width={90}
          radius={20}
          onValueChange={(val) => {toggleSwitch()}}
        />
      </View>
      <Text style= {styles.text}>
      R Value
      </Text>
      <TextInput
        style={{
            color: '#000000',
            backgroundColor: '#f48024',
            width: '77%',
            height: '8%',
            borderRadius: 15,
            paddingLeft: '5%',
            marginBottom: '3%',
        }}
        placeholder={'R value'}
        placeholderTextColor= '#00000070'
        keyboardType='numeric'
        allowFontScaling = {false}
        autoCorrect = {false}
        onChangeText={(value) => {setRValue(parseFloat(value))}}
      />
      <Text style= {styles.text}>
      Entry
      </Text>
      <TextInput
        style={{
            color: '#000000',
            backgroundColor: '#f48024',
            width: '77%',
            height: '7%',
            borderRadius: 15,
            paddingLeft: '5%',
            marginBottom: '3%',
        }}
        placeholder={'entry'}
        placeholderTextColor= '#00000070'
        keyboardType='numeric'
        allowFontScaling = {false}
        autoCorrect = {false}
        onChangeText={(value) => {setEntry(parseFloat(value))}}
      />
      <Text style= {styles.text}>
      Stop
      </Text>
      <TextInput
        style={{
            color: '#000000',
            backgroundColor: '#f48024',
            width: '77%',
            height: '7%',
            borderRadius: 15,
            paddingLeft: '5%',
            marginBottom: '9%',
        }}
        placeholder={'stop'}
        placeholderTextColor= '#00000070'
        keyboardType='numeric'
        allowFontScaling = {false}
        autoCorrect = {false}
        onChangeText={(value) => {setStop(parseFloat(value))}}
      />
      <Text style= {styles.text}>
      Leverage
      </Text>
      <Picker
        selectedValue={leverage}
        style={{color: '#000000'}}
        onValueChange={(selectedValue) => setLeverage(selectedValue)}
        dropdownIconRippleColor="#000000"
        dropdownIconColor="#000000"
        prompt="Select Pub/Bar"
        mode='dialog'
      >
        <Picker.Item label='Please select an option...' value='0' />
        {renderPickerList()}
      </Picker>
      <Button 
        style={styles.button}  
        mode="contained" 
        color='#f48024' 
        onPress={() => calculate()}>
        Calculate
      </Button>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000000',
  },
  page:{
    flex: 1,
    padding: "3%",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '50%',
    borderRadius: 15,
    marginBottom: '3%',
  },
});
