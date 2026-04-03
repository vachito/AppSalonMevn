import { computed, onMounted, ref, inject, watch } from "vue";
import { defineStore } from "pinia";
import AppointmentApi from "@/api/AppointmentApi";
import { convertToISO, convertToDDMMYYYY } from "@/helpers/date";
import { useRouter } from "vue-router";

export const useAppointmentsStore = defineStore('appointments',()=>{
    const services = ref([])
    const date = ref('')
    const hours = ref([])
    const time=ref('')
    const appointmentsByDate = ref([])

    const toast = inject('toast')
    const router = useRouter()

    onMounted(()=>{
        const startHour = 10
        const endHour = 19
        for(let hour = startHour; hour<=endHour; hour++){
           hours.value.push(hour+':00') 
        }
    })

    watch(date, async() =>{
        time.value=''
        if(date.value === '') return
        //obtenemos las citas
        const {data} = await AppointmentApi.getByDate(date.value)
        appointmentsByDate.value = data
    })

    function setSelectedAppointment(appointment){
        services.value=appointment.services
        date.value= convertToDDMMYYYY(appointment.date)
        time.value=appointment.time
    }

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
    
    async function createAppointment(){
        const appointment = {
            services: services.value.map(service => service._id),
            date: convertToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value
        }

        try {
            const {data} = await AppointmentApi.create(appointment)
    
            toast.open({
                message: data.msg,
                type:'success'
            })
            setTimeout(() => {
                router.push({name:'my-appointments'})
                resetState()
            }, 2000);
        } catch (error) {
            console.log(error)
        }
    }

    const isServiceSelected = computed(()=>{
        return (id) => services.value.some(ser => ser._id === id)
    })

    const noServicesSelected = computed(()=> services.value.length === 0)

    const totalAmount = computed(()=>{
        return services.value.reduce((total,service) => total+service.price,0)
    })

    const isValidReservation = computed(()=>{
        return services.value.length && date.value.length && time.value.length
    })

    const resetState =() => { 
        services.value =[]
        date.value=''
        time.value = ''
    }

    const isDateSelected = computed(()=>{
        return date.value ? true : false
    })

    const disableTime = computed(()=>{
        return (hour) =>{
            return appointmentsByDate.value.find(appoiment => appoiment.time === hour)
        }
    })

    return{
        services,
        date,
        hours,
        time,
        isValidReservation,
        createAppointment,
        onServiceSelected,
        isServiceSelected,
        totalAmount,
        noServicesSelected,
        isDateSelected,
        disableTime,
        setSelectedAppointment
    }
})