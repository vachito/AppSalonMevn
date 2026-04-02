<script setup>
    import { useAppointmentsStore } from '@/stores/appointments';
    import { FormatearMoneda } from '@/helpers';

    const appointment = useAppointmentsStore()
    defineProps({
        service:{
            type:Object
        }
    })
</script>

<template>
    <div class="border border-gray-600 rounded-lg py-2 px-5 flex justify-between items-center">
        <div>
            <p class="text-xl font-extrabold text-white">{{ service.name }}</p>
            <p class="text-2xl font-black text-blue-500">{{ FormatearMoneda(service.price) }}</p>
        </div>

        <button
            type="button"
            class="inline-flex items-center rounded-md bg-red-600 text-white text-sm px-3 py-2 font-semibold shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-800"
            @click="appointment.onServiceSelected(service)"
        >
            Eliminar
        </button>
    </div>
</template>