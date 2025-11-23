'use server';

import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export const createCompanion = async (formData: CreateCompanion) => {
    const { userId: author } = await auth();
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from('companions')
        .insert({...formData, author })
        .select();

    if(error || !data) throw new Error(error?.message || 'Failed to create a companion');

    return data[0];
}

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
    const supabase = createSupabaseClient();

    let query = supabase.from('companions').select();

    if(subject && topic) {
        query = query.ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if(subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if(topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: companions, error } = await query;

    if(error) throw new Error(error.message);

    return companions;
}
    
    
    /**
    /from a specific table 
        /*
            /*CreateCompanion is a type interface imported */
                /*---------addinf DATA INTO THE COMPANIONS TABLE------------- 

                            /*Limit=how many companions to show,--{...subject,topic}:GetAllCompanions: above */
                    /* ilike("subject","%math%")means: find all rows where the subject column contains "math". */ 
                    /*or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`) means: find all rows where either the
                     topic column contains the value of topic or the name column contains the value of topic. */
                    /*range((page - 1) * limit, page * limit - 1) means: retrieve a specific range of rows based on the page number and limit.*/
/*-----gET created COmpanion-----*/
export const getCompanion = async (id: string) => {
    const supabase = createSupabaseClient();

    const { data, error } =await supabase
        .from('companions')
        .select()                 /*give me everything */
        .eq('id', id)             /**only give me the one that the id is equal to the one that we padd through params */
                        /** */
    if (error || !data) {return console.log(error);};
    return data[0];
}/*//go into app>companion>[id] , to fetch that companions details */