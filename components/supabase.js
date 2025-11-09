// js/supabase.js

import { createClient } from '@supabase/supabase-js';

// ¡IMPORTANTE! Reemplaza estos valores con tus claves reales.
// En un proyecto estático (frontend), estas claves son públicas.
const SUPABASE_URL = 'https://gkhmcyzrztfhziqngdvv.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdraG1jeXpyenRmaHppcW5nZHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjAxNzcsImV4cCI6MjA3NzgzNjE3N30.JKMNQyOTtc38EEMQO9RQoz6yR_VisYazv1-W1GwYTqc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);