import BookmarkForm from "./BookmarkForm";

const Logout = () => {
    return (<div>
        <div className="flex justify-between place-items-center sm:w-lg sm:h-max p-2 bg-primary-foreground text-primary">
            <h1 className="bold text-2xl">
                Bookmark.io
            </h1>
            {/* <button onClick={() => {
                supabase.auth.signOut()
            }} className="bg-primary text-secondary-foreground rounded-md px-4 py-2  mb-2">
                Sign out
            </button> */}
        </div>

        <BookmarkForm />
    </div>)
}

export default Logout

// : ZodType<formInterface>
