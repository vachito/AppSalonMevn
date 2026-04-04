import { ref, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import AppointmentApi from "@/api/AppointmentApi";
import AuthApi from "@/api/AuthApi";

export const useUserStore = defineStore('user', ()=>{
    const router = useRouter()
    const user=ref({})
    const userAppointments = ref([])
    const loading = ref(true)

     onMounted(async ()=>{
        try {
            const {data: {user: userData} } = await AuthApi.auth()
            user.value=userData 
            await getUserAppointments()
        } catch (error) {
            console.log(error)
        }finally{
            loading.value=false
        }
    })

    async function getUserAppointments() {
        const {data} = await AppointmentApi.getUserAppointments(user.value._id) 
        userAppointments.value = data
    }

    function logout(){
        localStorage.removeItem('auth_token')
        user.value={}
        router.push({name:'login'})
    }

    const getUserName = computed(() => user.value?.name ? user.value?.name : '')
    const noAppointments = computed(()=> userAppointments.value.length === 0)

    return{
        user,
        userAppointments,
        logout,
        loading,
        getUserName,
        noAppointments,
        getUserAppointments
    }
})