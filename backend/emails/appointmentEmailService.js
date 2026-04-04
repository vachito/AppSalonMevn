import { createTransport } from "../config/nodemailer.js";

export async function sendEmailNewAppointment({date,time}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS,
    )

    // Enviar el email
    const info = await transporter.sendMail({
        from: 'AppSalon <citas@appsalon.com>',
        to:'admin@appsalon.com',
        subject: 'Appsalon - Nueva Cita',
        text: 'Appsalon - Nueva Cita',
        html: `
            <p>Hola admin, tienes una nueva cita</p>
            <p>La cita será el día: ${date} a las ${time} horas.</p>
        `
    })
}

export async function sendEmailUpdateAppointment({date,time}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS,
    )

    // Enviar el email
    const info = await transporter.sendMail({
        from: 'AppSalon <citas@appsalon.com>',
        to:'admin@appsalon.com',
        subject: 'Appsalon - Cita Actualizada',
        text: 'Appsalon - Cita Actualizada',
        html: `
            <p>Hola admin, un usuario ha modificado una cita</p>
            <p>La nueva cita será el día: ${date} a las ${time} horas.</p>
        `
    })
}

export async function sendEmailCancelledAppointment({date,time}) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS,
    )

    // Enviar el email
    const info = await transporter.sendMail({
        from: 'AppSalon <citas@appsalon.com>',
        to:'admin@appsalon.com',
        subject: 'Appsalon - Cita Cancelada',
        text: 'Appsalon - Cita Cancelada',
        html: `
            <p>Hola admin, un usuario ha cancelado una cita</p>
            <p>La cita estaba programada para : ${date} a las ${time} horas.</p>
        `
    })
}