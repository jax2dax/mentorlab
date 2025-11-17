import Image from "next/image"
import Link from "next/link"

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start learning your way!</div>
      <h2 className="text-3xl font-bold">Build And Personalize Your Learning Companion</h2>
      <p>Pick your subject, voice & personalize training,  Start learning trough voice,
        conversations that feel natural
      </p>
      <Image src="images/cta.svg" alt="cta" width={362} height={232} />
      <button className="btn-primary" >
        <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
        <Link href="/companions/new">
        Build a New Companion
        </Link>
      </button>
    </section>
  )
}

export default CTA