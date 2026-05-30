import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ernbcosfyinkfuoocxaf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVybmJjb3NmeWlua2Z1b29jeGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMDA0OTQsImV4cCI6MjA5NTY3NjQ5NH0._icxPgqMYd4dnfjmqOtC7fnFM_WQYdEV63E_lIBczns";

const supabase = createClient(supabaseUrl, supabaseKey);

export const upLoadImage = async (
  file: File,
  bucket: string,
  folder: string,
) => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2, 10)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Ejecutar la subida al Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    // Si Supabase rechazó el archivo, lanzamos el error al catch
    if (error) {
      console.error(
        "❌ Supabase Storage rechazó la subida:",
        error.message,
        error,
      );
      throw new Error(`Supabase Storage: ${error.message}`);
    }

    // Si el paso anterior fue exitoso, generamos la URL pública
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
