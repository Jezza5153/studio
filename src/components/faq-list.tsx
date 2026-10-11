/** Uitklapbare vragen met <details>: de antwoorden staan altijd in de HTML, zodat Google en AI-zoekmachines ze lezen. */
export function FaqList({ faqs, openFirst = true }: { faqs: { question: string; answer: string }[]; openFirst?: boolean }) {
  return (
    <div>
      {faqs.map((faq, i) => (
        <details
          key={faq.question}
          open={openFirst && i === 0}
          className="group -mb-0.5 border-2 border-foreground bg-white open:bg-background"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-[15.5px] font-semibold sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
            <h3 className="font-semibold">{faq.question}</h3>
            <span aria-hidden className="shrink-0 font-headline text-2xl font-black text-primary transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-[62ch] px-5 pb-5 text-[14.5px] text-muted-foreground sm:px-6 sm:pb-6">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
