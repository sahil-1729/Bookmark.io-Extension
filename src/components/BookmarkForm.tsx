import clsx from "clsx";
import { Tag, TagInput } from "emblor";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";


const formSchema = z.object({

    categories: z.string().min(2, {
        message: "categories must be at least 2 characters.",
    }).max(50),
    link: z.string().min(0, {
        message: "link cannot be empty.",
    }).max(1000).url({ message: "Invalid url" }),
    labels: z.array(
        z.object({
            id: z.string(),
            text: z.string(),
        }),
    ),
})

export default function BookmarkForm() {
    // const [formData, setForm] = useState<formInterface>()

    const [tags, setTags] = useState<Tag[]>([]);
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);


    var form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categories: "",
            link: "",
            labels: []
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {


        console.log('success ', values)

        values.categories = values.categories.trim()
        form.reset()
        setTags([])



    }

    // console.log('the value ', form.watch('link'))

    return (
        <div className="bg-secondary text-secondary-foreground sm:w-lg sm:h-max p-4 rounded-md">
            <div>
                <h1>
                    Add bookmark
                </h1>

                <div>
                    Don&apos;t worry, we&apos;ll save you the trouble of finding this frustration again
                </div>

            </div>

            <Form {...form} >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 ">
                    <FormField
                        control={form.control}
                        name="link"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Link</FormLabel>
                                <FormControl>
                                    <Input placeholder="CTRL + V" className="border border-primary" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Copy + paste
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categories"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Categories</FormLabel>
                                <FormControl>
                                    <Input placeholder="where will this bookmark belong?" className="border border-primary" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Helping you to organize your bookmarks
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="labels"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-start">
                                <FormLabel className="text-left">Context</FormLabel>
                                <FormControl className="max-w-full">
                                    <TagInput
                                        styleClasses={{
                                            inlineTagsContainer: 'border-primary border p-2 rounded-lg ',
                                            input: "shadow-none"
                                        }}
                                        customTagRenderer={
                                            (tag, isActiveTag) => (<
                                                div key={
                                                    tag.id
                                                }
                                                className={
                                                    `px-2 py-1 bg-primary rounded-full ${isActiveTag ? "ring-ring ring-offset-2 ring-2 ring-offset-background" : ""}`
                                                } >
                                                <span className="text-primary-foreground text-sm mr-1 flex flex-row" >
                                                    {
                                                        tag.text
                                                    }
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Prevent event from bubbling up to the tag span
                                                            // onRemoveTag(tag.id);
                                                            const res = tags.filter(val => val.id != tag.id)
                                                            setTags(res)
                                                            form.setValue('labels', res as [Tag, ...Tag[]])
                                                        }}
                                                        className={cn('py-1 px-1 h-full hover:bg-transparent')}
                                                    >
                                                        <X size={14} />
                                                    </Button>
                                                </span>
                                            </div>
                                            )
                                        }

                                        // direction={'row'}
                                        showCount={true}
                                        // maxTags={3}
                                        // truncate={tags.length}

                                        variant={{
                                            variant: "primary",
                                            shape: "rounded",
                                        }}
                                        activeTagIndex={activeTagIndex}
                                        setActiveTagIndex={setActiveTagIndex}
                                        {...field}
                                        placeholder="link associated to which topic?"
                                        tags={tags}

                                        className="resize-y flex flex-wrap "
                                        setTags={(newTags) => {
                                            // console.log(newTags)
                                            setTags(newTags)
                                            form.setValue('labels', newTags as [Tag, ...Tag[]])
                                        }} />

                                </FormControl>
                                <FormDescription className="text-left">
                                    Just so you dont forget why you add it :{")"}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* <div className="sm:justify-start"> */}

                    <Button type="submit"
                        className={clsx('', {
                            // 'hidden': !(form.getValues('categories')) || !(form.getValues('link')) || !(form.getValues('labels'))
                        })}
                    >
                        save
                    </Button>

                    {/* </div> */}
                </form>

            </Form>
        </div>
    )


}