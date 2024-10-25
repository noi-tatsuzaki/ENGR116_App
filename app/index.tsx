//General
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Dimensions, PanResponder, SafeAreaView, StatusBar, TouchableOpacity, TextInput, FlatList } from 'react-native';
//Map
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue } from 'react-native-reanimated';
//Calculator

//Swiper
import Swiper from 'react-native-swiper';
//Bottom Bar
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Stack } from 'expo-router';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
//Todo List

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#293241",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bottomabar: {
    backgroundColor: "black",
  },
  textElement: {
    color: "white",
    fontSize: 60,
    textAlign: "right",
    marginTop: 20,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    width: windowWidth * 0.9,
    height: 80,
  },
  btnc: {
    backgroundColor: "#3b5a80",
    marginTop: -5,
    marginBottom: 10,
    marginRight: 7,
    marginLeft: 7,
    height: windowWidth / 5,
    width: windowWidth / 5,
    borderRadius: 200,
  },
  toprowbtn: {
    backgroundColor: "#98c1d9",
    marginTop: -5,
    marginBottom: 10,
    marginRight: 7,
    marginLeft: 7,
    height: windowWidth / 5,
    width: windowWidth / 5,
    borderRadius: 200,
  },
  siderowbtn: {
    backgroundColor: "#ee6c4d",
    marginTop: -5,
    marginBottom: 10,
    marginRight: 7,
    marginLeft: 7,
    height: windowWidth / 5,
    width: windowWidth / 5,
    borderRadius: 200,
  },
  longbtn: {
    backgroundColor: "#3d5a80",
    marginTop: -5,
    marginBottom: 15,
    marginRight: 7,
    marginLeft: 7,
    height: windowWidth / 5,
    width: windowWidth / 2.27,
    borderRadius: 200,
  },
  textAllbtn: {
    fontSize: 40,
    marginTop: 11,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    color: "white",
    textAlign: "center",
    justifyContent: "center",
  },
  textLongbtn: {
    fontSize: 40,
    marginTop: 11,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 20,
    color: "white",
    textAlign: "left",
    justifyContent: "center",
  },
  textTopfirst3btns: {
    fontSize: 40,
    marginTop: 11,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    color: "#293241",
    textAlign: "center",
    justifyContent: "center",
  },
  textsidebtns: {
    fontSize: 40,
    marginTop: 11,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    color: "white",
    textAlign: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Or 'space-between', 'space-evenly', etc.
    alignItems: 'center',
    padding: 10,
  },
  description: {
    fontSize: 15,
    color: "white",
    marginBottom: 20,
    marginTop: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 7,
    color: "green",
  },
  input: {
    color: "white",
    borderWidth: 3,
    borderColor: "#98c1d9",
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
    width: windowWidth * 0.9,
  },
  addButton: {
    backgroundColor: "#98c1d9",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "#293241",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    fontSize: 18,
    width: windowWidth * 0.9,
  },
  itemList: {
    fontSize: 15,
    color: "white",
    width: windowWidth * 0.65,
  },
  taskButtons: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
    color: "#98c1d9",
    fontWeight: "bold",
    fontSize: 15,
  },
  deleteButton: {
    color: "#ee6c4d",
    fontWeight: "bold",
    fontSize: 15,
  },
});

//const Tab = createMaterialTopTabNavigator();
const Tab = createBottomTabNavigator();

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 2,
  longitudeDelta: 2
}

//Calculator View
const FirstRoute = () => {
    const [answerValue, setAnswerValue] = useState(0);
    const [readyToReplace, setReadyToReplace] = useState(true);
    const [memoryValue, setMemoryValue] = useState("");
    const [operatorValue, setOperatorValue] = useState("");
    const handleNumber = (value: any) => {
      if (readyToReplace) {
          return value.toString();
      } else {
          return answerValue.toString() + value.toString();
      }
    };
  
  const buttonPressed = (value: any) => {
      if (!isNaN(value)) {
        const updatedValue = handleNumber(value.toString());
        setReadyToReplace(false);
        setAnswerValue(updatedValue);
      } else if (value === "C") {
        setAnswerValue(0);
        setMemoryValue("");
        setOperatorValue("");
        setReadyToReplace(true);
      } else if (value === "x" || value === "/" || value === "+" || value === "-") {
        if (operatorValue) {
          calculateEquals();
          setOperatorValue(value);
          setReadyToReplace(true);
        } else {
          setMemoryValue(answerValue.toString());
          setOperatorValue(value);
          setReadyToReplace(true);
        }
      } else if (value === "=") {
        calculateEquals();
        setMemoryValue("");
        setOperatorValue("");
        setReadyToReplace(true);
      } else if (value === "+/-") {
        if (answerValue !== 0) {
          const newValue = answerValue * -1;
          setAnswerValue(newValue);
        }
      } else if (value === "%") {
        const perValue = answerValue * 0.01;
        setAnswerValue(perValue);
      }
  };
  
  const calculateEquals = () => {
    const previous = parseFloat(memoryValue);
    const current = parseFloat(answerValue.toString());
    let result = 0;
  
    //... (Logic for performing calculations)
      switch (operatorValue) {
      case "x":
        result = previous * current;
        break;
      case "/":
        result = previous / current;
        break;
      case "+":
        result = previous + current;
        break;
      case "-":
        result = previous - current;
        break;
      default:
        return result;
    }
  
    setAnswerValue(result);
    setOperatorValue("");
    return result;
  };
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.textElement}> {answerValue} </Text>
  
          <StatusBar barStyle="light-content" backgroundColor="#007bff" />
          {/* ---------------------------------ROW 1------------------------------------------------------------------------------------------------------ */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.toprowbtn}
              onPress={() => buttonPressed("C")}
            >
              <Text style={styles.textTopfirst3btns}> C </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.toprowbtn}
              onPress={() => buttonPressed("+/-")}
            >
              <Text style={styles.textTopfirst3btns}> ± </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.toprowbtn}
              onPress={() => buttonPressed("%")}
            >
              <Text style={styles.textTopfirst3btns}> % </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.siderowbtn}
              onPress={() => buttonPressed("/")}
            >
              <Text style={styles.textsidebtns}> ÷ </Text>
            </TouchableOpacity>
          </View>
  
          {/* ---------------------------------ROW 2------------------------------------------------------------------------------------------------------ */}
  
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.btnc}
              onPress={() => buttonPressed(7)}
            >
              <Text style={styles.textAllbtn}> 7 </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.btnc}
              onPress={() => buttonPressed(8)}
            >
              <Text style={styles.textAllbtn}> 8 </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.btnc}
              onPress={() => buttonPressed(9)}
            >
              <Text style={styles.textAllbtn}> 9 </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.siderowbtn}
              onPress={() => buttonPressed("x")}
            >
              <Text style={styles.textsidebtns}> × </Text>
            </TouchableOpacity>
          </View>
          {/* ---------------------------------ROW 3------------------------------------------------------------------------------------------------------ */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.btnc}
              onPress={() => buttonPressed(4)}
            >
              <Text style={styles.textAllbtn}> 4 </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.btnc}
              onPress={() => buttonPressed(5)}
            >
              <Text style={styles.textAllbtn}> 5 </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.btnc}
              onPress={() => buttonPressed(6)}
            >
              <Text style={styles.textAllbtn}> 6 </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.siderowbtn}
              onPress={() => buttonPressed("-")}
            >
              <Text style={styles.textsidebtns}> − </Text>
            </TouchableOpacity>
          </View>
          {/* ---------------------------------ROW 4------------------------------------------------------------------------------------------------------ */}
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.btnc]}
              onPress={() => buttonPressed(1)}
            >
              <Text style={styles.textAllbtn}> 1 </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.btnc}
              onPress={() => buttonPressed(2)}
            >
              <Text style={styles.textAllbtn}> 2 </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.btnc}
              onPress={() => buttonPressed(3)}
            >
              <Text style={styles.textAllbtn}> 3 </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.siderowbtn}
              onPress={() => buttonPressed("+")}
            >
              <Text style={styles.textsidebtns}> + </Text>
            </TouchableOpacity>
          </View>
          {/* ---------------------------------ROW 5------------------------------------------------------------------------------------------------------ */}
          <View style={styles.row}>
            {/* Long Button / 0 Button */}
            <TouchableOpacity
              style={styles.longbtn}
              onPress={() => buttonPressed(0)}
            >
              <Text style={styles.textLongbtn}> 0 </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.btnc}
              onPress={() => buttonPressed(".")}
            >
              <Text style={styles.textAllbtn}> . </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.siderowbtn}
              onPress={() => buttonPressed("=")}
            >
              <Text style={styles.textsidebtns}> = </Text>
            </TouchableOpacity>
          </View>
          {/* ---------------------------------ROW END------------------------------------------------------------------------------------------------------ */}
        </View>
      </SafeAreaView>
    );
};

//Map View
const SecondRoute = () => {
  const [randomLocation, setRandomLocation] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    generateRandomLocation();
  }, []);

  const generateRandomLocation = () => {
    const latitude = Math.random() * (48.8584 - 40.7128) + 40.7128; // Range: New York to Paris
    const longitude = Math.random() * (-74.0060 - 2.3522) + 2.3522; // Range: New York to Paris
    const latitudeDelta = 0.0421;
    const longitudeDelta = 0.0421;
    setRandomLocation({ latitude, longitude, latitudeDelta, longitudeDelta });
  };
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MapView style={StyleSheet.absoluteFill} 
        provider = {PROVIDER_GOOGLE} 
        initialRegion={INITIAL_REGION}
        showsUserLocation = {true}
        showsMyLocationButton
      />
    </View>
  );
};

//Todo View
const ThirdRoute = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddTask = () => {
    if (task) {
        if (editIndex !== -1) {
            // Edit existing task
            const updatedTasks = [...tasks];
            updatedTasks[editIndex] = task;
            setTasks(updatedTasks);
            setEditIndex(-1);
        } else {
            // Add new task
            setTasks([...tasks, task]);
        }
        setTask("");
    }
  };

  const handleEditTask = (index: any) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit);
    setEditIndex(index);
  };

  const handleDeleteTask = (index: number) => {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <View style={styles.task}>
        <Text
            style={styles.itemList}>{item}</Text>
        <View
            style={styles.taskButtons}>
            <TouchableOpacity
                onPress={() => handleEditTask(index)}>
                <Text
                    style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleDeleteTask(index)}>
                <Text
                    style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
        </View>
    </View>
  );

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Enter task"
            placeholderTextColor={"white"}
            value={task}
            onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddTask}>
            <Text style={styles.addButtonText}>
                {editIndex !== -1 ? "Update Task" : "Add Task"}
            </Text>
        </TouchableOpacity>
        <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />
    </View>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Calculator' },
    { key: 'second', title: 'Map' },
    { key: 'third', title: 'Todo' }
  ]);

  return (
    <TabView
      navigationState = {{ index, routes }}
      renderScene = { renderScene }
      onIndexChange = { setIndex }
      swipeEnabled = {true}
    />
  );
}

const SwiperComponent = () => {
  return (
    <View style = {styles.container}>
      <Swiper loop = {false} showsPagination = {false} horizontal = {true}>
      </Swiper>
    </View>
  );
};

function Calculator () {
  const [answerValue, setAnswerValue] = useState(0);
  const [readyToReplace, setReadyToReplace] = useState(true);
  const [memoryValue, setMemoryValue] = useState("");
  const [operatorValue, setOperatorValue] = useState("");
  const handleNumber = (value: any) => {
    if (readyToReplace) {
        return value.toString();
    } else {
        return answerValue.toString() + value.toString();
    }
  };

const buttonPressed = (value: any) => {
    if (!isNaN(value)) {
      const updatedValue = handleNumber(value.toString());
      setReadyToReplace(false);
      setAnswerValue(updatedValue);
    } else if (value === "C") {
      setAnswerValue(0);
      setMemoryValue("");
      setOperatorValue("");
      setReadyToReplace(true);
    } else if (value === "x" || value === "/" || value === "+" || value === "-") {
      if (operatorValue) {
        calculateEquals();
        setOperatorValue(value);
        setReadyToReplace(true);
      } else {
        setMemoryValue(answerValue.toString());
        setOperatorValue(value);
        setReadyToReplace(true);
      }
    } else if (value === "=") {
      calculateEquals();
      setMemoryValue("");
      setOperatorValue("");
      setReadyToReplace(true);
    } else if (value === "+/-") {
      if (answerValue !== 0) {
        const newValue = answerValue * -1;
        setAnswerValue(newValue);
      }
    } else if (value === "%") {
      const perValue = answerValue * 0.01;
      setAnswerValue(perValue);
    }
};

const calculateEquals = () => {
  const previous = parseFloat(memoryValue);
  const current = parseFloat(answerValue.toString());
  let result = 0;

  //... (Logic for performing calculations)
    switch (operatorValue) {
    case "x":
      result = previous * current;
      break;
    case "/":
      result = previous / current;
      break;
    case "+":
      result = previous + current;
      break;
    case "-":
      result = previous - current;
      break;
    default:
      return result;
  }

  setAnswerValue(result);
  setOperatorValue("");
  return result;
};
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.textElement}> {answerValue} </Text>

        <StatusBar barStyle="light-content" backgroundColor="#007bff" />
        {/* ---------------------------------ROW 1------------------------------------------------------------------------------------------------------ */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.toprowbtn}
            onPress={() => buttonPressed("C")}
          >
            <Text style={styles.textTopfirst3btns}> C </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toprowbtn}
            onPress={() => buttonPressed("+/-")}
          >
            <Text style={styles.textTopfirst3btns}> +/- </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.toprowbtn}
            onPress={() => buttonPressed("%")}
          >
            <Text style={styles.textTopfirst3btns}> % </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.siderowbtn}
            onPress={() => buttonPressed("/")}
          >
            <Text style={styles.textsidebtns}> / </Text>
          </TouchableOpacity>
        </View>

        {/* ---------------------------------ROW 2------------------------------------------------------------------------------------------------------ */}

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.btnc}
            onPress={() => buttonPressed(7)}
          >
            <Text style={styles.textAllbtn}> 7 </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnc}
            onPress={() => buttonPressed(8)}
          >
            <Text style={styles.textAllbtn}> 8 </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnc}
            onPress={() => buttonPressed(9)}
          >
            <Text style={styles.textAllbtn}> 9 </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.siderowbtn}
            onPress={() => buttonPressed("x")}
          >
            <Text style={styles.textsidebtns}> x </Text>
          </TouchableOpacity>
        </View>
        {/* ---------------------------------ROW 3------------------------------------------------------------------------------------------------------ */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.btnc}
            onPress={() => buttonPressed(4)}
          >
            <Text style={styles.textAllbtn}> 4 </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnc}
            onPress={() => buttonPressed(5)}
          >
            <Text style={styles.textAllbtn}> 5 </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnc}
            onPress={() => buttonPressed(6)}
          >
            <Text style={styles.textAllbtn}> 6 </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.siderowbtn}
            onPress={() => buttonPressed("-")}
          >
            <Text style={styles.textsidebtns}> - </Text>
          </TouchableOpacity>
        </View>
        {/* ---------------------------------ROW 4------------------------------------------------------------------------------------------------------ */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.btnc]}
            onPress={() => buttonPressed(1)}
          >
            <Text style={styles.textAllbtn}> 1 </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnc}
            onPress={() => buttonPressed(2)}
          >
            <Text style={styles.textAllbtn}> 2 </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnc}
            onPress={() => buttonPressed(3)}
          >
            <Text style={styles.textAllbtn}> 3 </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.siderowbtn}
            onPress={() => buttonPressed("+")}
          >
            <Text style={styles.textsidebtns}> + </Text>
          </TouchableOpacity>
        </View>
        {/* ---------------------------------ROW 5------------------------------------------------------------------------------------------------------ */}
        <View style={styles.row}>
          {/* Long Button / 0 Button */}
          <TouchableOpacity
            style={styles.longbtn}
            onPress={() => buttonPressed(0)}
          >
            <Text style={styles.textLongbtn}> 0 </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnc}
            onPress={() => buttonPressed(".")}
          >
            <Text style={styles.textAllbtn}> . </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.siderowbtn}
            onPress={() => buttonPressed("=")}
          >
            <Text style={styles.textsidebtns}> = </Text>
          </TouchableOpacity>
        </View>
        {/* ---------------------------------ROW END------------------------------------------------------------------------------------------------------ */}
      </View>
    </SafeAreaView>
  );
}

function Map () {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MapView
        style={StyleSheet.absoluteFill} 
        provider = {PROVIDER_GOOGLE} 
        //initialRegion={randomLocation}
        initialRegion={{latitude: 10,
          longitude: 10,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,}}
        showsUserLocation = {true}
        showsMyLocationButton
      />
    </View>
  );
}

function Todo () {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

export default App;