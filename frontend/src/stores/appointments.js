import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useAppointmentsStore = defineStore('appointments',()=>{
    const services = ref([])

    function onServiceSelected(service){
        if(services.value.some(ser => ser._id === service._id)){
            services.value = services.value.filter(ser => ser._id !== service._id)
        }else{
            if (services.value.length === 2){
                alert ('Solo puedes elegir dos servicios como maximo')
                return
            }
            services.value.push(service)
        }

    }
    
    const isServiceSelected = computed(()=>{
        return (id) => services.value.some(ser => ser._id === id)
    })

    const noServicesSelected = computed(()=> services.value.length === 0)

    const totalAmount = computed(()=>{
        return services.value.reduce((total,service) => total+service.price,0)
    })

    return{
        services,
        onServiceSelected,
        isServiceSelected,
        totalAmount,
        noServicesSelected
    }
})