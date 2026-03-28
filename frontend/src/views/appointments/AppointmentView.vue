<script lang="ts" setup>
    import SelectedService from '@/components/SelectedService.vue';
    import { useAppointmentsStore } from '@/stores/appointments';

    const appointment = useAppointmentsStore()

</script>
<template>
    <h2 class=" text-4xl font-extrabold text-white">Detalles Cita y Resumen</h2>
    <p class=" text-white text-lg">A continuacion verifica la informacion y confirma tu cita</p>

    <h3 class="text-3xl font-extrabold text-white">Servicios</h3>

    <div class="grid gap-5">
        <SelectedService
            v-for="service in appointment.services"
            :key="service._id"
            :service="service"
        />
    </div>
</template>
