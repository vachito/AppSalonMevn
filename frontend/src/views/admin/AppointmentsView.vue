<script setup>
    import { useUserStore } from '@/stores/user';

    const userStore = useUserStore()
</script>

<template>
    <p class=" text-white text-lg mt-5">A continuación podrás administrar tus proximas citas</p>

    <p v-if="userStore.loading" class="text-white text-2xl text-center mt-5">
        Cargando...
    </p>

    <div v-else>
        <p v-if="userStore.noAppointments" class="text-white text-2xl text-center mt-5">No tienes proximas citas</p>
    </div>
</template>