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

    const disableDate = (date) => {
        const today = new Date()
        return date < today || date.getMonth() > today.getMonth() + 1 || [0,6].includes(date.getDay())
    }
</script>
<template>
    <h2 class=" text-2xl font-extrabold text-white">Detalles Cita y Resumen</h2>
    <p class=" text-white text-lg">A continuacion verifica la informacion y confirma tu cita</p>

    <h3 class="text-2xl font-extrabold text-white">Servicios</h3>

    <p v-if="appointment.noServicesSelected" class=" text-white text-2xl text-center">No hay servicios seleccionadod</p>

    <div v-else>
        <div class="grid gap-5">
            <SelectedService
                v-for="service in appointment.services"
                :key="service._id"
                :service="service"
            />
        </div>
    
        <p class=" text-right text-white text-2xl mt-5">
            Total a pagar: 
            <span class=" font-black">{{ FormatearMoneda(appointment.totalAmount) }}</span>
        </p>
    </div>

    <div class="space-y-8" v-if="!appointment.noServicesSelected">
        <div class="flex flex-col md:flex-row justify-between items-center mt-10">
            <h3 class=" text-2xl font-extrabold text-white">Fecha y Hora</h3>
    
            <div v-if="appointment.isValidReservation" class="flex justify-end">
                <button
                    class="w-full md:w-auto bg-blue-500 p-3 rounded-lg uppercase font-black text-white"
                    @click="appointment.createAppointment"
                >Confirmar Reservación</button>
            </div>
        </div>

        <div class="lg:flex gap-5 items-center">
            <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
                <VueTailwindDatepicker
                    v-model="appointment.date"
                    :disable-date="disableDate"
                    i18n = "es-mx"
                    as-single
                    no-input
                    :formatter="formatter"
                />    
            </div>

            <div
                v-if="appointment.isDateSelected" 
                class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0"
            >
                <button 
                    v-for="hour in appointment.hours"
                    class="block text-blue-500 rounded-lg text-xl font-black py-2 disabled:opacity-10"    
                    :class="appointment.time === hour ? 'bg-blue-500 text-white' : 'bg-white'"
                    @click="appointment.time=hour"
                    :disabled="appointment.disableTime(hour) ? true : false"
                >
                    {{ hour }}
                </button>
            </div>
        </div>
    </div>
</template>
