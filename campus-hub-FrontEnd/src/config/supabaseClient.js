import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://qcwufrwxedpljcuggjti.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjd3Vmcnd4ZWRwbGpjdWdnanRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyMDcyMDIsImV4cCI6MjA1Mjc4MzIwMn0.lQHS0kL-XrqtDBFMZirMy2ltK7XDZBxXf3V2t2BAqWU'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)