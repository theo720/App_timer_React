import { StatusBar } from 'expo-status-bar';
import React ,{ useState } from 'react';
import { StyleSheet, Text, View,Picker, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Contador from './Contador';
export default function App() {
  
  const [min, Setmin] = useState(0);
  const [seg, Setseg] = useState(0);
  const [Estado, Setestado] = useState('selecionar');
  const [alarmesound,setaralarmesound]= useState([
    {
      id:'1',
      selecionado: false,
      som:'Alarme 1',
      arquivo: require('./assets/Sons/alarme1.mp3') 
    },
    {
      id:'2',
      selecionado: false,
      som:'Alarme 2',
      arquivo: require('./assets/Sons/alarme2.mp3') 
    },
    {
      id:'3',
      selecionado: false,
      som:'Alarme 3',
      arquivo: require('./assets/Sons/alarme3.mp3') 
    }
  ])
  function setaralarme(id){
    let alarmetemp = alarmesound.map(function(vaL){
      if (id == vaL.id) {
        vaL.selecionado = true;
        return vaL;
        
      } else {
        vaL.selecionado = false;
        return vaL;
      }
      
  
    })
    setaralarmesound(alarmetemp)
      
  }
  console.disableYellowBox = true;
  var numeros = [];
  for (var i = 0; i < 60; i++) {
    numeros.push(i)
    
  }
  if(Estado == 'selecionar'){
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
      <Image
        style={{width:100, height:100, tintColor:'white'}}
        source={require('./assets/Imagens/clock.png')}
      />
      <Text style={{color:'white', fontSize:30, fontWeight:'bold', textAlign:'center'}}>Selecione o seu tempo!</Text>
      <StatusBar style="auto" />
    

    <View style={{flexDirection:'row'}}>
    <Text style={{color:'white', paddingTop:16, fontWeight:'bold'}}>Min:</Text>
    <Picker
      style={{ height: 50, width: 100, color:'white'}}
      selectedValue={min}
      onValueChange={(itemValue, itemIndex) => Setmin(itemValue)}

      
       >
       
         {
           numeros.map(function(vaL){
        return(<Picker.Item  label={vaL.toString()} value={vaL.toString()} />);      })
         }
      </Picker>
    
      <Text style={{color:'white', paddingTop:16, fontWeight:'bold'}}>Seg</Text>
      <Picker
        style={{ height: 50, width: 100, color:'white' }}
        selectedValue={seg}
          onValueChange={(itemValue, itemIndex) => Setseg(itemValue)}
      
       >
         {
           numeros.map(function(vaL){
        return(
          
        <Picker.Item  label={vaL.toString()} value={vaL.toString()} />);      })
         }
      
      </Picker>
      </View>    
      <View style={{flexDirection:'row', padding:10}}>
        {
          alarmesound.map(function (vaL){
             
        if (vaL.selecionado) {
          return(<TouchableOpacity onPress={()=> setaralarme(vaL.id)} style={styles.btmEscolhido}><Text style={{color:'white'}}>{vaL.som}</Text></TouchableOpacity>);
        } else {
          return(<TouchableOpacity onPress={()=> setaralarme(vaL.id)} style={styles.btmEscolher}><Text style={{color:'white'}}>{vaL.som}</Text></TouchableOpacity>);  
        }
       
      })
}
      </View>
      
      
    <View>
    <TouchableOpacity onPress={()=>Setestado('iniciar')}style={styles.btmIniciar}>
    <Image
        style={{width:50, height:50, tintColor:'white', top:15, marginLeft:25,marginBottom:5, }}
        source={require('./assets/Imagens/play.png')}
      />
    <Text style={{color:'white', textAlign:'center', paddingTop:0, flex:1,fontWeight:'bold', fontSize:20}}>
    Iniciar</Text>
        </TouchableOpacity>
    </View>
 
    </View>
         

  ); } else if(Estado=='iniciar'){
    console.log(seg);
    return(
     <Contador alarmes = {alarmesound} setMinuto={Setmin} setSegundo={Setseg} setestado={Setestado} minutos ={min} segundos={seg}></Contador>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a903fc',
    alignItems: 'center',
    justifyContent: 'center',
  },btmEscolher:{
    marginRight: 10,
    padding:8,
    backgroundColor:'#e68319',
    borderRadius:10

  },
  btmEscolhido:{
    marginRight: 10,
    padding:8,
    backgroundColor:'#ff0026',
    borderRadius:10
  },
  btmIniciar:{
    height: 100,
    width:100,
    backgroundColor:'#32a852',
    borderRadius:50,
    borderColor:"white",
    borderWidth:1
  }

});
