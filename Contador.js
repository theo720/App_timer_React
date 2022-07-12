import { StatusBar } from 'expo-status-bar';
import React ,{ useState,useEffect } from 'react';
import { StyleSheet, Text, View,Picker, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

export default function Contador(props){
var done = false;

useEffect(()=>{

  const timer = setInterval(()=>{
    props.setSegundo(props.segundos - 1);
    if (props.segundos<=0) {
      if (props.minutos>0) {
        props.setMinuto(props.minutos - 1);
        props.setSegundo(59);
      }else{
        if (!done) {
          done = true;
          soundPlay();
        resetar();
        }
    }
      
    }

  },1000)
  return()=> clearInterval(timer)
})
async function soundPlay(){
  const sound = new Audio.Sound();
  try {
    var som;
    props.alarmes.map(function(vaL){
      if (vaL.selecionado) {
        som = vaL.arquivo;
      }
    })
  } catch (error) {
    
  }
  await sound.loadAsync(som)

 

 console.log('Playing Sound');
 await sound.playAsync(); 
}
function resetar(){
 
  props.setestado('selecionar')
  props.setMinuto(0);
  props.setSegundo(0);
}

function formatarNumero(number){
  var NumberFinal = ""
  if (number<10) {
    NumberFinal = "0"+number;
  } else {
    NumberFinal = number;
  }
  return NumberFinal;
}
var segUN = formatarNumero(props.segundos);
var minU = formatarNumero(props.minutos);
    return (

        <View style={styles.container}>
            <LinearGradient
       colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
       style={{ position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  height: '100%'}}
    >

    </LinearGradient>
    <View style={{flexDirection:'row'}}>
      
    <Text style={{color:'white', fontSize:30, fontWeight:'bold', textAlign:'center'}}>{minU}:</Text>
    <Text style={{color:'white', fontSize:30, fontWeight:'bold', textAlign:'center'}}>{segUN}</Text>

    </View>
  
    <View style={{paddingTop:20}}>
    <TouchableOpacity onPress={()=>resetar()}style={styles.btmIniciar}>
    <Image
        style={{width:50, height:50, tintColor:'white', top:15, marginLeft:25,marginBottom:5, }}
        source={require('./assets/Imagens/stop.png')}
      />
    <Text style={{color:'white', textAlign:'center', paddingTop:0, flex:1,fontWeight:'bold', fontSize:20}}>
    Parar</Text>
        </TouchableOpacity>
    </View>
 
    <StatusBar style="auto" />
  

    </View>
  );
}


const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#a903fc',
  alignItems: 'center',
  justifyContent: 'center',
},
btmIniciar:{
  height: 100,
  width:100,
  backgroundColor:'#fc032c',
  borderRadius:50,
  borderColor:"white",
  borderWidth:1
}
})