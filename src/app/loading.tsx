export default function Loading() {
    return (
        <div className="animate-pulse">
            {/* Masthead skeleton */}
            <div className="border-b-2 border-foreground/10 bg-background px-4 py-6 text-center sm:py-8">
                <div className="mx-auto mb-3 h-[2px] w-32 bg-muted sm:w-48" />
                <div className="mx-auto h-10 w-64 rounded bg-muted sm:h-14 sm:w-96" />
                <div className="mx-auto mt-3 h-4 w-48 rounded bg-muted sm:w-72" />
            </div>

            {/* Ticker skeleton */}
            <div className="border-y border-foreground/10 bg-foreground/5 py-3">
                <div className="mx-auto h-3 w-2/3 rounded bg-muted" />
            </div>

            {/* Hero skeleton */}
            <div className="h-[50vh] min-h-[400px] w-full bg-muted" />

            {/* Grid skeleton */}
            <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 md:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="space-y-4 lg:col-span-5">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex gap-4 rounded-lg p-3">
                                <div className="h-20 w-20 flex-shrink-0 rounded-md bg-muted" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 w-1/4 rounded bg-muted" />
                                    <div className="h-4 w-3/4 rounded bg-muted" />
                                    <div className="h-3 w-full rounded bg-muted" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-4">
                        <div className="grid grid-cols-2 grid-rows-2 gap-2">
                            <div className="col-span-2 row-span-2 min-h-[280px] rounded-lg bg-muted" />
                        </div>
                    </div>
                    <div className="space-y-4 lg:col-span-3">
                        <div className="h-24 rounded-xl bg-muted" />
                        <div className="h-32 rounded-xl bg-muted" />
                    </div>
                </div>
            </div>
        </div>
    );
}
