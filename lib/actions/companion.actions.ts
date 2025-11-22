'use server'
/*CreateCompanion is a type interface imported */
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from  "@/lib/supabase"

export const createCompanion = async (formData: CreateCompanion) => {
    const { userId: author } = await auth();  //ake the userId field from Clerk, rename it to: author (naming while destructuring)
    const supabase = createSupabaseClient();
 //from a specific table 
 /*
 supabase.from('companions') -load the table 'companions' from supabase
 .insert({ ...formData, author }) - insert a row into the table, ...formData is the data from the form, auther is 
 */
    const { data, error } = await supabase.from('companions').insert({ ...formData, author }).select();
    if (error||!data) throw new Error(error?.message || 'Failed to create companion');
    return data[0]; 
        
}
