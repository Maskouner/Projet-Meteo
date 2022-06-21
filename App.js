import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card , Searchbar } from 'react-native-paper'
import  Icon  from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/Fontisto'


function Icone(temp) {
  switch (temp) {
  case 'Clouds' :  return 'cloudy'
  case 'Clear' : return  'sunny'
  case 'Rain' : return 'rainy'
 } 

}

function Color(temp) {
  switch (temp) {
  case 'Clouds' :  return '#D5DBDB'
  case 'Clear' : return  '#F4D03F'
  case 'Rain' : return '#D5DBDB'
 } 

}

function Background(temp) {
  switch (temp) {
  case 'Clouds' :  return require('../Meteo/src/Images/Nuage.jpg')
  case 'Clear' : return  require('../Meteo/src/Images/soleil.jpg')
  case 'Rain' : return require('../Meteo/src/Images/pluie.jpg')
 } 

}



const App = () => {

  const [data,setData] = useState([])
  const [ville,setVille] = useState("Marais-Vernier")
  const requete = async () => {
    const requeteAPI = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+ville+"&units=metric&lang=fr&appid=6120f4c447d35d18f93b8d92691018d9");
    const json = await requeteAPI.json();
    console.log("Response du json", json);
    return json;
}
  

const datainit = async () => {
  await requete().then(requete => {
      setData(requete);
      console.log(requete);

  }
  )
  .catch(error => {
    
  }
  )
  
}
  

  useEffect(() => {
    datainit()
  },[],
  )

  return (
    
      <View style={styles.Container}>  
        <Searchbar  onChangeText={text => setVille(text)}  value={ville}   onBlur={() => datainit()}
        placeholder='Entrer une ville' />
          <Image style={{height:'30%',width:'100%'}} source={Background(data.weather?.[0].main)}/>
          <Card>
          <Card.Title titleStyle={styles.Titre} title={data.name}/>
          <Card.Content style={{flexDirection:'row',borderBottomWidth:0.5}}>     
              <Text style={styles.Temperature}>{data.main?.temp}°</Text>
              <Icon name={Icone(data.weather?.[0].main)} size={50} color={Color(data.weather?.[0].main)} style={styles.IconeTemps}/>
          </Card.Content>

        <Card.Content style={styles.Detail}>
              <Icon3 name='thermometer' size={18} style={{marginTop:10,marginRight:5}}/>
              <Text style={styles.categorieDetail}>Max./Min.</Text>
              <Text style={{fontSize:19,marginLeft:135,marginTop:5}}> {data.main?.temp_max}°/{data.main?.temp_min}°</Text>
          </Card.Content>
          <Card.Content style={styles.Detail}>
              <Icon2 name='weather-windy' size={18} style={styles.IconeDetails}/>
              <Text style={styles.categorieDetail}>Vent</Text>
              <Text style={{fontSize:19,marginLeft:220,marginTop:5}}> {data.wind?.speed} km/h</Text>
          </Card.Content>
          <Card.Content style={styles.Detail}>
              <Icon name='water' size={18} style={styles.IconeDetails}/>
              <Text style={styles.categorieDetail}>Humidité</Text>
              <Text style={{fontSize:19,marginLeft:225,marginTop:5}}> {data.main?.humidity}%</Text>
          </Card.Content>
          <Card.Content style={styles.Detail}>
              <Icon2 name='thermometer' size={18} style={styles.IconeDetails}/>
              <Text style={styles.categorieDetail}>T. Ressentie</Text>
              <Text style={{fontSize:19,marginLeft:175,marginTop:5}}> {data.main?.feels_like}°</Text>
          </Card.Content>
          <Card.Content style={styles.Detail}>
              <Icon2 name='weather-sunny' size={20} style={styles.IconeDetails}/>
              <Text style={styles.categorieDetail}>Temps</Text>
              <Text style={{fontSize:19,marginLeft:185,marginTop:5}}> {data.weather?.[0].description}</Text>
          </Card.Content>
          <Card.Content>
              <Text> 15/06/2022 16:07</Text>
          </Card.Content>
        </Card>
        <Image style={{height:'100%',width:'100%'}} source={Background(data.weather?.[0].main)}/>
      </View>
   
    
  )
}

export default App

const styles = StyleSheet.create({
  Container:{
    flex:1,
  },
  Titre:{
    alignSelf:'center',
    fontSize:25,
  },
  Temperature:{
    fontSize:40,
    marginRight:200
  },
  IconeTemps:{
    marginTop:5
  },
  Detail:{
    flexDirection:'row',
    borderBottomWidth:0.5
  },
  IconeDetails:{
    marginTop:10,
    marginRight:10
  },
  categorieDetail:{
    fontSize:19,
    marginTop:5
  },
  TextDetail:{
    fontSize:19,
    marginLeft:180,
    marginTop:5
  }
  
})