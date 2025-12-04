import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://dteebbhsscavjajnewze.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0ZWViYmhzc2Nhdmpham5ld3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyODQ3NTYsImV4cCI6MjA3ODg2MDc1Nn0.skbkZ42nHJBslozuFZR09wIR2ccBgZrEimZFqtgoOvY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
