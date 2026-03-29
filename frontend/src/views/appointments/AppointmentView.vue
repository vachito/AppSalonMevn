<script lang="ts" setup>
    import { ref } from 'vue';
    import VueTailwindDatepicker from 'vue-tailwind-datepicker'
    import { FormatearMoneda } from '@/helpers';
    import SelectedService from '@/components/SelectedService.vue';
    import { useAppointmentsStore } from '@/stores/appointments';

    const appointment = useAppointmentsStore()
    const formatter =ref({
        date:'DD/MM/YYYY',
        month: 'MMM'
    })
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

    <div class="space-y-8" v-if="!appointment.noServicesSelected">
        <h3 class=" text-2xl font-extrabold text-white">Fecha y Hora</h3>

        <div class="lg:flex gap-5 items-start">
            <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
                <VueTailwindDatepicker
                    v-model="appointment.date"
                    i18n = "es-mx"
                    as-single
                    no-input
                    :formatter="formatter"
                />    
            </div>
        </div>
    </div>
</template>
