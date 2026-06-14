import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wgzgbnbdysypnrbihxsc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnemdibmJkeXN5cG5yYmloeHNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMTQ0NTgsImV4cCI6MjA5Njg5MDQ1OH0.xGtRUA6jH-agrqLzSxHCKWgTcAnp1_jmjL0IM-m3jGU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
