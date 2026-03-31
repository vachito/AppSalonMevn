<script setup>
    import { inject } from 'vue';
    import { reset } from '@formkit/vue';
    import AuthApi from '@/api/AuthApi';
    const toast = inject('toast')
    
    const handleSubmit = async ({password_confirm, ...data}) =>{
        try {
            const result = await AuthApi.register(data)
            toast.open({
                message: result.data.msg,
                type:'success'
            })
            reset('registerForm')
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type:'error'
            })
        }
    }
</script>

<template>
    <h1 class=" text-4xl font-extrabold text-white text-center mt-10">Crea una cuenta</h1>
    <p class=" text-xl text-white text-center my-5">Crea una cuenta en AppSalón</p>

    <FormKit
        id="registerForm"
        type="form"
        :actions="false"
        incomplete-message="No se pudo enviar los datos, revisa las notificaciones"
        @submit="handleSubmit"
    >
        <FormKit
            type="text"
            label="Nombre"
            name="name"
            placeholder="Tu Nombre"
            validation="required|length:3"
            :validation-messages="{
                required:'El nombre es obligatorio',
                length:'El nombre es demasiado corto'
            }"
        />

        <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="Email de Registro"
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

        <FormKit type="submit">Crear Cuenta</FormKit>
        
    </FormKit>
</template>