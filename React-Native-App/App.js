import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';

const employeeURL = "http://dummy.restapiexample.com/api/v1/employees";
const App = () => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetch(employeeURL)
     .then((response)=> response.json())
     .then((json) => {
       setData(json.data);
       setStatus(json.status);
       setMessage(json.message);
      })

     .finally(setLoading(false));
  });

  return( 
  <View style={styles.container}>

    {
      isLoading ? (<ActivityIndicator />):
    (
    <View>
     <Text style={styles.title}>Fetched Details</Text>
    
     <View style={styles.separator}></View>
    
    <FlatList 
        data={data}
        keyExtractor={({id }, index) => id}
        renderItem={({item}) =>(
        
        <View style={styles.employeeDetails}>
          <Text>
              {item.employee_name}
          </Text>
        </View>
      )}
    />
    <View style={styles.message}>
         <Text>{message}</Text>
    </View>
   
   <StatusBar style="auto"/>
   </View>
    
    )}
    
  </View>

  );
};

const styles = StyleSheet.create({
  
  container: {
    backgroundColor:'gold',
    flex: 1,
    alignItems: 'center',
    marginTop:30,
  
  },
  
  employeeDetails:{
    fontSize: 16,
    fontWeight: "normal",
    paddingBottom:20
  },
  
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color:"green",
    marginTop:12,
    marginBottom:12,

  },
  
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 18,
    color:"green",
  },

  separator:{
    borderBottomWidth: 3, 
    marginBottom: 15,
  },
});
export default App;