<script setup>
    import AuthApi from '@/api/AuthApi';
    import { inject } from 'vue';
    import { useRouter } from 'vue-router';

    const router=useRouter()
    const toast = inject('toast')
    const handleSubmit = async(formData) =>{
        try {
            const {data: {token}} = await AuthApi.login(formData)
            localStorage.setItem('auth_token',token)
            router.push({name:'my-appointments'})
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type:'error'
            })
        }
    }
</script>

<template>
    <h1 class=" text-4xl font-extrabold text-white text-center mt-10">Iniciar Sesón</h1>
    <p class=" text-xl text-white text-center my-5">Si tienes una cuenta, inicia sesión</p>

    <FormKit
        id="loginForm"
        type="form"
        :actions="false"
        incomplete-message="No se pudo enviar los datos, revisa las notificaciones"
        @submit="handleSubmit"
    >
        <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="Email de usuario"
            validation="required|email"
            :validation-messages="{
                required:'El email es obligatorio',
                length:'Email no valido'
            }"
        />
  
        <FormKit
            type="password"
            label="Password"
            name="password"
            placeholder="Password de usuario"
            validation="required|length:8"
            :validation-messages="{
                required:'El password obligatorio'
            }"
        />

        <FormKit type="submit">Iniciar Sesón</FormKit>
        
    </FormKit>
</template>