import { getTime } from "../logic/whatsapp";
import { Ultrasonido } from "../assets/whatsapp";
export function chatbot(word, Case) {
    if (Case === "A") {
        switch (word) {
            case "Hola":
                const message = {
                    msg: "¡Hola! 👋 Soy el Asistente Virtual de Salud Digna. 🤖 ¿Cómo te puedo ayudar?",
                    time: getTime(),
                    isLink: false,
                    sent: false,
                    Image: null,
                    archive: null,
                    options: ['🗓Citas', '🧾 Consultar resultados', 'Otro'],
                }
                return message;
            case "🧾 Consultar resultados":
                const messageOpciones = {
                    msg: "Para consultar tus resultados de ultrasonido, por favor, envía una foto del código de barras de tu ticket. En caso de no contar con un ticket, ingresa tu dirección de correo electrónico",
                    time: getTime(),
                    isLink: false,
                    sent: false,
                    Image: null,
                    archive: null,
                    options: null
                }
                return messageOpciones;
            case "RSV816378351":
                const MCodigo = {
                    msg: "Gracias. Estoy verificando tu información. Por favor, espera un momento.",
                    time: getTime(),
                    isLink: false,
                    sent: false,
                    Image: null,
                    archive: null,
                    options: null
                }
                return MCodigo;
            case "Verificado": //mensaje consecutivo
                const mVerificado = {
                    msg: "Perfecto. Estoy generando el archivo PDF con tus resultados. Esto puede tomar unos momentos.",
                    time: getTime(),
                    isLink: false,
                    sent: false,
                    Image: null,
                    archive: null,
                    options: null
                }
                return mVerificado;
            case "PDF Resultados":
                const mPDF = {
                    msg: "{{IMG}} Aquí tienes tus resultados. Si necesitas más información, no dudes en preguntar.",
                    time: getTime(),
                    isLink: false,
                    sent: false,
                    Image: false,
                    archive: null,
                    options: null
                }
                return mPDF;
            case "IMG Resultados":
                const mIMG = {
                    msg: "{{IMG}}Aquí tienes tus resultados. Si necesitas más información, no dudes en preguntar.",
                    time: getTime(),
                    isLink: false,
                    sent: false,
                    Image: true,
                    archive: null,
                    options: null
                }
                return mIMG;
            case "SEND Resultados":
                const mSEND = {
                    msg: "¿Desea que los enviemos a tu correo?",
                    time: getTime(),
                    isLink: false,
                    sent: false,
                    Image: null,
                    archive: null,
                    options: ["Sí, por favor", "No, Gracias"]
                }
                return mSEND;
            case "Sí, por favor":
                const mSí = {
                    msg: "Por favor, ingresa tu dirección de correo electrónico.",
                    time: getTime(),
                    isLink: false,
                    sent: false,
                    Image: null,
                    archive: null,
                    options: null
                }
                return mSí;
            case "No, Gracias":
                const mNO = {
                    msg: "Ok, tenga buena dia.",
                    time: getTime(),
                    isLink: false,
                    sent: false,
                    Image: null,
                    archive: null,
                    options: null
                }
                return mNO;
            case "correo@gmail.com":
                const mCorreo = {
                    msg: "Gracias. Estoy enviando tus resultados a tu correo electrónico. Por favor, revisa tu bandeja de entrada.",
                    time: getTime(),
                    isLink: false,
                    sent: false,
                    Image: null,
                    archive: null,
                    options: null
                }
                return mCorreo;
            default:
                const messageDefault = {
                    msg: "NO entiendo lo que quieres decir",
                    time: getTime(),
                    isLink: false,
                    sent: false,
                    Image: null,
                    archive: null,
                    options: null
                }
                return messageDefault;
        }
    }
}