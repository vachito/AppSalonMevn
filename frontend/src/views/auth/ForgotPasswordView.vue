<script setup>

</script>

<template>
    <h1 class=" text-4xl font-extrabold text-white text-center mt-10">Olvide mi password</h1>
    <p class=" text-xl text-white text-center my-5">Recupera el acceso a tu cuenta</p>

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

        <FormKit type="submit">Enviar instrucciones</FormKit>
        
    </FormKit>
</template>