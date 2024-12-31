import Contactform from "@/components/contactform"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>MongoDB Form</h1>
      <p>Please fill in the form below:</p>
      <Contactform />
    </div>
  )
}
