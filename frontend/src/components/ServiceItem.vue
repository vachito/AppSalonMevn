<script setup>
    import { useAppointmentsStore } from '@/stores/appointments';
    import { FormatearMoneda } from '@/helpers';

    defineProps({
        service:{
            type:Object
        }
    })

    const appointmentStore = useAppointmentsStore()
</script>

<template>
    <div 
         @click="appointmentStore.onServiceSelected(service)"
        class="p-5 space-y-5 rounded-lg cursor-pointer"
        :class="appointmentStore.isServiceSelected(service._id) ? 'bg-blue-500 text-white' : 'bg-white'"
    >
        <p class="text-2xl font-light">{{service.name}}</p>
        <p 
            class="text-4xl font-bold "
            :class="appointmentStore.isServiceSelected(service._id) ? 'text-white' : 'text-blue-600'"
        >{{ FormatearMoneda(service.price)}}</p>
    </div>
</template>

