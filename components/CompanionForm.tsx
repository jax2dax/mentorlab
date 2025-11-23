"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { subjects } from "@/constants"
import { Input }  from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
///////////////////////////
import {
    
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,

    } from "@/components/ui/form"
import { createCompanion } from "@/lib/actions/companion.actions"
//import { redirect } from "next/dist/server/api-utils"
import { redirect } from "next/navigation"

const formSchema = z.object({
            name: z.string().min(1, { message: "name is required" }),
            subject: z.string().min(1, { message: "Subject is required." }),
            topic: z.string().min(1, { message: "topic is required." }),
            voice: z.string().min(1, { message: "voice is required." }),
            style: z.string().min(1, { message: "style is required." }),
            duration:z.coerce.number().min(1, { message: "duration must be at least 1 minute." }),

            
            
        
})
const CompanionForm = () => { 

    
////////////////

  const form = useForm({
    resolver: zodResolver(formSchema) ,
    defaultValues: {
        name: "",
        subject: "",
        topic: "",
        voice: "",
        style: "",
        duration:15
    }
  });

 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    /* when this form submitted, it creates an id(actual companion id in db), then , it redirects to that companions page, which is then 
    passed through params as props (in app>companions/[id]) then , using that comp ID, getCompanion function is called(from lib>actions)
    that matches The id from props(one created in this form) to the- Id in the db? */
    //console.log(values);
    
    const companion = await createCompanion(values); /**coming from server lib action */
    if (companion) {
       redirect(`/companions/${companion.id}`)                                                           /*redirect(url:/companion..) */
    }
    else {
        console.log("Failed to create companion");                                                           /*message:'Failed... */
    }
    console.log(companion);
    }

  return (
    <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
       <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter the companion name"
                                    {...field}
                                    className="input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input capitalize">
                                        <SelectValue placeholder="Select the subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject) => (
                                            <SelectItem
                                                value={subject}
                                                key={subject}
                                                className="capitalize"
                                            >
                                                {subject}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What should the companion help with?</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ex. Derivates & Integrals"
                                    {...field}
                                    className="input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voice</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue
                                            placeholder="Select the voice"
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="female">
                                            Female
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Style</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue
                                            placeholder="Select the style"
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="formal">
                                            Formal
                                        </SelectItem>
                                        <SelectItem value="casual">
                                            Casual
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estimated session duration in minutes</FormLabel>
                            <FormControl>
                                
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full cursor-pointer">Build Your Companion</Button>
            </form>
</Form>

  )
}


export default CompanionForm