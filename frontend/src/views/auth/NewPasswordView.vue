<script setup>
    import { onMounted, inject, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useRouter } from 'vue-router';
    import AuthApi from '@/api/AuthApi';

    const toast = inject('toast')
    const router = useRouter()
    const route = useRoute()
    const validToken = ref(false)
    const {token} = route.params

    onMounted(async()=>{
        try {
            const {data} = await AuthApi.verifyPasswordResetToken(token)
            validToken.value=true
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    })

    const handleSubmit = async ({password}) => {
        try {
            const {data} = await AuthApi.updatePassword(token,{password})
            toast.open({
                message: data.msg,
                type: 'success'
            })
            setTimeout(() => {
                router.push({name:'login'})
            }, 2000);
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }
</script>

<template>
    <div v-if="validToken">
        <h1 class=" text-4xl font-extrabold text-white text-center mt-10">Nuevo Password</h1>
        <p class=" text-xl text-white text-center my-5">Coloca tu nuevo password</p>
    
        <FormKit
            id="newPasswordForm"
            type="form"
            :actions="false"
            incomplete-message="No se pudo enviar los datos, revisa las notificaciones"
            @submit="handleSubmit"
        >
            <FormKit
                type="password"
                label="Password"
                name="password"
                placeholder="Password de usuario - Min 8 caracteres"
                validation="required|length:8"
                :validation-messages="{
                    required:'El password obligatorio',
                    length:'El password debe contener al menos 8 caracteres'
                }"
            />
    
            <FormKit
                type="password"
                label="Repetir Password"
                name="password_confirm"
                placeholder="Repite el password"
                validation="required|confirm"
                :validation-messages="{
                    required:'Debe escribir de nuevo su password',
                    confirm:'Los passwords no son iguales'
                }"
            />
    
            <FormKit type="submit">Guardar Password</FormKit>
            
        </FormKit>
    </div>

    <p v-else class="text-center text-2xl font-black text-white">Token no válido</p>
</template>