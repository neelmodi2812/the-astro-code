import { z } from "zod"

/**
 * Zod validation schema for user login.
 * Bilingual support (Gujarati & English) based on active language.
 */
export function getLoginSchema(lang = "gu") {
  const isEn = lang === "en"

  return z.object({
    email: z
      .string()
      .trim()
      .min(1, {
        message: isEn
          ? "Please enter your email address."
          : "કૃપા કરીને ઈમેલ એડ્રેસ દાખલ કરો.",
      })
      .pipe(
        z.string().email({
          message: isEn
            ? "Please enter a valid email address."
            : "કૃપા કરીને માન્ય ઈમેલ એડ્રેસ દાખલ કરો.",
        })
      ),
    password: z
      .string()
      .min(1, {
        message: isEn
          ? "Please enter your password."
          : "કૃપા કરીને પાસવર્ડ દાખલ કરો.",
      })
      .pipe(
        z.string().min(6, {
          message: isEn
            ? "Password must be at least 6 characters."
            : "પાસવર્ડ ઓછામાં ઓછો ૬ અક્ષરનો હોવો જોઈએ.",
        })
      ),
  })
}

/**
 * Zod validation schema for user registration.
 * Bilingual support (Gujarati & English) based on active language.
 */
export function getRegisterSchema(lang = "gu") {
  const isEn = lang === "en"

  return z
    .object({
      fullName: z
        .string()
        .trim()
        .min(1, {
          message: isEn
            ? "Please enter your full name."
            : "કૃપા કરીને તમારું પૂરું નામ દાખલ કરો.",
        })
        .pipe(
          z.string().min(2, {
            message: isEn
              ? "Name must be at least 2 characters."
              : "નામ ઓછામાં ઓછા ૨ અક્ષરનું હોવું જોઈએ.",
          })
        ),
      mobileNumber: z
        .string()
        .trim()
        .min(1, {
          message: isEn
            ? "Please enter your mobile number."
            : "કૃપા કરીને મોબાઇલ નંબર દાખલ કરો.",
        })
        .pipe(
          z.string().regex(/^[0-9]{10}$/, {
            message: isEn
              ? "Please enter a valid 10-digit mobile number."
              : "કૃપા કરીને માન્ય ૧૦-અંકનો મોબાઇલ નંબર દાખલ કરો.",
          })
        ),
      emailAddress: z
        .string()
        .trim()
        .min(1, {
          message: isEn
            ? "Please enter your email address."
            : "કૃપા કરીને ઈમેલ એડ્રેસ દાખલ કરો.",
        })
        .pipe(
          z.string().email({
            message: isEn
              ? "Please enter a valid email address."
              : "કૃપા કરીને માન્ય ઈમેલ એડ્રેસ દાખલ કરો.",
          })
        ),
      dob: z.string().min(1, {
        message: isEn
          ? "Date of birth is required for Kundali calculations."
          : "કુંડળી ગણતરી માટે જન્મ તારીખ જરૂરી છે.",
      }),
      birthTime: z.string().optional().default(""),
      birthPlace: z
        .string()
        .trim()
        .min(1, {
          message: isEn
            ? "Please enter your birth place or city."
            : "કૃપા કરીને જન્મ સ્થળ અથવા શહેર દાખલ કરો.",
        }),
      password: z
        .string()
        .min(1, {
          message: isEn
            ? "Please enter a password."
            : "કૃપા કરીને પાસવર્ડ દાખલ કરો.",
        })
        .pipe(
          z.string().min(8, {
            message: isEn
              ? "Password must be at least 8 characters long."
              : "પાસવર્ડ ઓછામાં ઓછો ૮ અક્ષરનો હોવો જોઈએ.",
          })
        ),
      confirmPassword: z.string().min(1, {
        message: isEn
          ? "Please confirm your password."
          : "કૃપા કરીને પાસવર્ડની પુષ્ટિ કરો.",
      }),
      agreeTerms: z.boolean().refine((val) => val === true, {
        message: isEn
          ? "Please agree to the Terms of Service."
          : "કૃપા કરીને નિયમો અને શરતો સ્વીકારો.",
      }),
      receiveUpdates: z.boolean().optional().default(true),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: isEn
        ? "Passwords do not match."
        : "પાસવર્ડ મેળ ખાતો નથી (પાસવર્ડ સરખા નથી).",
      path: ["confirmPassword"],
    })
}
