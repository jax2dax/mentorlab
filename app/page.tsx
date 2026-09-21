import React from 'react'
import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'

const Page = () => {
  return (
    <main>
      <section className="flex flex-col gap-2">
        <h1>Popular Companions</h1>
        <p className="text-muted-foreground text-lg">
          Pick a companion and start a focused voice lesson in seconds.
        </p>
      </section>

      <section className="companions-grid">
        <CompanionCard
          id="123" name="Verba Vocabs"
          topic="Language"
          subject="language"
          duration={70}
          color="#BDE7FF"
        />
        <CompanionCard
          id="123" name="Countsy the Number Wizard"
          topic="Derivatives and integrals"
          subject="maths"
          duration={30}
          color="#FFDA6E"
        />
        <CompanionCard
          id="123" name="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          subject="science"
          duration={45}
          color="#E5D0FF"
        />
      </section>

      <section className='home-section'>
        <CompanionsList title="Recently Completed sessions"
        companions={recentSessions}
        classNames="w-3/3 max-lg:w-ful"
        />

        <CTA />
      </section>
    </main>
  )
}

export default Page
