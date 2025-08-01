import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@supabase/supabase-js";
import clsx from "clsx";
import { Tag, TagInput } from "emblor";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useForm, Form } from "react-hook-form";
import z, { ZodType } from "zod";
import { Button } from "./ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const supabase = createClient(`${import.meta.env.VITE_SUPABASE_URL}`, `${import.meta.env.VITE_SUPABASE_ANON_KEY}`)

const Logout = () => {
    return (<div>
        Welcome
        <button onClick={() => {
            supabase.auth.signOut()
        }} className="bg-primary-foreground text-secondary rounded-md px-4 py-2  mb-2">
            Sign out
        </button>
        {/* <DialogForm /> */}
    </div>)
}

export default Logout


// interface formInterface {
//     labels: any,
//     categories: string,
//     link: string,
//     // topics: any
// }

// const formSchema: ZodType<formInterface> = z.object({

//     categories: z.string().min(2, {
//         message: "categories must be at least 2 characters.",
//     }).max(50),
//     link: z.string().min(0, {
//         message: "link cannot be empty.",
//     }).max(1000).url({ message: "Invalid url" }),
//     labels: z.array(
//         z.object({
//             id: z.string(),
//             text: z.string(),
//         }),
//     ),
// })

// export function DialogForm() {
//     // const [formData, setForm] = useState<formInterface>()

//     const [tags, setTags] = useState<Tag[]>([]);
//     const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);


//     var form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             categories: "",
//             link: "",
//             labels: []
//         },
//     })

//     // const pathname = usePathname()
//     // const updateUserWithId = sendData.bind(null)

//     function onSubmit(values: z.infer<typeof formSchema>) {
//         //THIS FUNCTION IS EXECUTED ONLY AFTER BEING VALIDATED BY ZOD
//         // if failed to validate then the function wont execute

//         // console.log('success ', values)
//         // setForm(values)

//         values.categories = values.categories.trim()
//         form.reset()
//         setTags([])
//         // updateUserWithId({ formData: values, path: pathname })

//         closeForm()
//     }

//     // console.log('the value ', form.watch('link'))

//     return (
//         <div className="primary sm:w-lg sm:h-max w-full h-full">
//             <div>

//                 <h1>Add bookmark
//                 </h1>

//                 <div>
//                     Don&apos;t worry, we&apos;ll save you the trouble of finding this frustration again
//                 </div>

//             </div>

//             <Form {...form} >
//                 <form onSubmit={() => (onSubmit)} className="space-y-8 ">
//                     <FormField
//                         control={form.control}
//                         name="link"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Link</FormLabel>
//                                 <FormControl>
//                                     <Input placeholder="CTRL + V" className="border border-primary" {...field} />
//                                 </FormControl>
//                                 <FormDescription>
//                                     Copy + paste
//                                     {/* pray it doesn&apos;t change (it probably will). */}
//                                 </FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     <FormField
//                         control={form.control}
//                         name="categories"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Categories</FormLabel>
//                                 <FormControl>
//                                     <Input placeholder="where will this bookmark belong?" className="border border-primary" {...field} />
//                                 </FormControl>
//                                 <FormDescription>
//                                     Helping you to organize your bookmarks
//                                 </FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     <FormField
//                         control={form.control}
//                         name="labels"
//                         render={({ field }) => (
//                             <FormItem className="flex flex-col items-start">
//                                 <FormLabel className="text-left">Context</FormLabel>
//                                 <FormControl className="max-w-full">
//                                     <TagInput
//                                         styleClasses={{
//                                             inlineTagsContainer: 'border-primary border p-2 rounded-lg ',
//                                             input: "shadow-none"
//                                         }}
//                                         customTagRenderer={
//                                             (tag, isActiveTag) => (<
//                                                 div key={
//                                                     tag.id
//                                                 }
//                                                 className={
//                                                     `px-2 py-1 bg-primary rounded-full ${isActiveTag ? "ring-ring ring-offset-2 ring-2 ring-offset-background" : ""}`
//                                                 } >
//                                                 <span className="text-primary-foreground text-sm mr-1 flex flex-row" >
//                                                     {
//                                                         tag.text
//                                                     }
//                                                     <Button
//                                                         type="button"
//                                                         variant="ghost"
//                                                         onClick={(e) => {
//                                                             e.stopPropagation(); // Prevent event from bubbling up to the tag span
//                                                             // onRemoveTag(tag.id);
//                                                             const res = tags.filter(val => val.id != tag.id)
//                                                             setTags(res)
//                                                             form.setValue('labels', res as [Tag, ...Tag[]])
//                                                         }}
//                                                         className={cn('py-1 px-1 h-full hover:bg-transparent')}
//                                                     >
//                                                         <X size={14} />
//                                                     </Button>
//                                                 </span>
//                                             </div>
//                                             )
//                                         }

//                                         // direction={'row'}
//                                         showCount={true}
//                                         // maxTags={3}
//                                         // truncate={tags.length}

//                                         variant={{
//                                             variant: "primary",
//                                             shape: "rounded",
//                                         }}
//                                         activeTagIndex={activeTagIndex}
//                                         setActiveTagIndex={setActiveTagIndex}
//                                         {...field}
//                                         placeholder="link associated to which topic?"
//                                         tags={tags}

//                                         className="resize-y flex flex-wrap "
//                                         setTags={(newTags) => {
//                                             // console.log(newTags)
//                                             setTags(newTags)
//                                             form.setValue('labels', newTags as [Tag, ...Tag[]])
//                                         }} />

//                                 </FormControl>
//                                 <FormDescription className="text-left">
//                                     Just so you dont forget why you add it :{")"}
//                                 </FormDescription>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     <div className="sm:justify-start">
//                         {/* <DialogClose asChild> */}

//                         <Button type="submit" onClick={() => {
//                             // const errorsList: object = form.formState
//                             // console.log(errorsList)
//                         }} className={clsx('', {
//                             'hidden': !(form.getValues('categories')) || !(form.getValues('link')) || !(form.getValues('labels'))
//                         })} >save</Button>

//                         {/* </DialogClose> */}
//                     </div>
//                 </form>
//             </Form>
//         </div>

//     )


// }