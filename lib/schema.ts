import * as z from "zod"

export const formSchema = z.object({
  username: z.string().min(3, {
    message: "El nombre de usuario debe tener al menos 3 caracteres.",
  }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, introduce un correo electrónico válido.",
  }),
  phoneNumber: z.string().optional(),
  interests: z.string().optional(),
  offeredService: z.string().min(1, {
    message: "Por favor, especifica el servicio que ofreces.",
  }),
  geographicZone: z.string().min(1, {
    message: "Por favor, especifica tu zona geográfica.",
  }),
  availability: z.string().min(1, {
    message: "Por favor, especifica tu disponibilidad.",
  }),
  contactPreference: z.enum(["email", "phone", "both"], {
    required_error: "Por favor, selecciona una preferencia de contacto.",
  }),
  additionalComments: z.string().optional(),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar la política de privacidad.",
  }),
  newsletter: z.boolean().optional(),
})

