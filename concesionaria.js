console.clear()

let autos = require("./autos.js")
let personas = require("./personas")
const concesionaria ={
    autos: autos,
    buscarAuto: (patente) => {
        let resultado = autos.find(auto => auto.patente === patente)
        if(!resultado){
            return null
        }
            return resultado
    },
    venderAuto: function(patente){
        let auto = this.buscarAuto(patente)
        auto.vendido = true
        console.log(auto);
    },
    autosParaLaVenta: () =>{
       let resultado = autos.filter(auto => auto.vendido === false)
       return resultado
    },
    autosNuevos: function(){
        let autosParaLaVenta = this.autosParaLaVenta()
        let autos0KM = autosParaLaVenta.filter(auto => auto.km <= 100)
        return autos0KM
    },
    listaDeVentas: function(){
        let autosVendidos = autos.filter(auto => auto.vendido === true)
        let precios = autosVendidos.map(auto =>{
            if(auto.vendido === true){
                return auto.precio
            }
        })
        return precios
    },
    totalDeVentas: function(){
        //let total = this.listaDeVentas().reduce((acum,num) => acum + num)
        // return total
        if(this.listaDeVentas().length === 0){
            return 0
        }
        let total = this.listaDeVentas()
        let totalVentas = total.reduce((acum,num) => acum + num)
        return totalVentas
    },
    puedeComprar: function(auto,persona){
        let valorCuota = auto.precio / auto.cuotas
        if (persona.capacidadDePagoEnCuotas >= valorCuota && auto.precio <= persona.capacidadDePagoTotal) {
            return true
        }
            return false
    },
    autosQuePuedeComprar: function(persona){

        let autosParaLeVenta = this.autosParaLaVenta()
        let autosQuePuedeComprar = autosParaLeVenta.filter(auto =>{
            return this.puedeComprar(auto,persona)
        })
            return autosQuePuedeComprar
    }  
    }
   
const {} = concesionaria // desestructuro buscarAuto, de lo contrario tendria que usar concecionaria.buscarAuto()
console.log(concesionaria.autosQuePuedeComprar(personas[0]))