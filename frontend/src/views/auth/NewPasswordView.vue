<script setup>

</script>

<template>
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
</template>