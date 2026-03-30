import { createTransport } from "../config/nodemailer.js";

export async function sendEmailVerification({name,email,token}) {
    const transporter = createTransport(
        "sandbox.smtp.mailtrap.io",
        2525,
        "9bc985470709ec",
        "98a28adad58c65"
    )

    // Enviar el email
    const info = await transporter.sendMail({
        from: 'AppSalon',
        to:email,
        subject: 'Appsalon - Confirma tu cuenta',
        text: 'Appsalon - Confirma tu cuenta',
        html: `
            <p>Hola ${name}, confirma tu cuenta en AppSalon</p>
            <p>Tu cuenta esta casi lista, solo debes confirmarla en el siguiente enlace</p>
            <a href="http://localhost:4000/api/auth/verify/${token}">confirmar cuenta</a>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    })
}


