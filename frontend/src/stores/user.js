import { ref, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

import AuthApi from "@/api/AuthApi";

export const useUserStore = defineStore('user', ()=>{
    const router = useRouter()
    const user=ref({})

    onMounted(async ()=>{
        try {
            const {data: {user: userData} } = await AuthApi.auth()
            user.value=userData 
        } catch (error) {
            console.log(error)
        }
    })

    function logout(){
        localStorage.removeItem('auth_token')
        user.value={}
        router.push({name:'login'})
    }

    const getUserName = computed(() => user.value?.name ? user.value?.name : '')

    return{
        user,
        logout,
        getUserName
    }
})