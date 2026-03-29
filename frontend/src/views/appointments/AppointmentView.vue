<script lang="ts" setup>
    import { FormatearMoneda } from '@/helpers';
    import SelectedService from '@/components/SelectedService.vue';
    import { useAppointmentsStore } from '@/stores/appointments';

    const appointment = useAppointmentsStore()

</script>
<template>
    <h2 class=" text-4xl font-extrabold text-white">Detalles Cita y Resumen</h2>
    <p class=" text-white text-lg">A continuacion verifica la informacion y confirma tu cita</p>

    <h3 class="text-3xl font-extrabold text-white">Servicios</h3>

    <p v-if="appointment.noServicesSelected" class=" text-white text-2xl text-center">No hay servicios seleccionadod</p>

    <div v-else>
        <div class="grid gap-5">
            <SelectedService
                v-for="service in appointment.services"
                :key="service._id"
                :service="service"
            />
        </div>
    
        <p class=" text-right text-white text-2xl">
            Total a pagar: 
            <span class=" font-black">{{ FormatearMoneda(appointment.totalAmount) }}</span>
        </p>
    </div>
</template>
