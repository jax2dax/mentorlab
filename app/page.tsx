import React from 'react'
import { Button } from '@/components/ui/button'
import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'
import ThemeToggle from '@/components/darkMode'

const Page = () => {
  return (
    <main>
      <h1 className="text-2xl underline">Popular Companions</h1>
      <section className="home-section">
        <CompanionCard
          id="123" name="Verba Vocabs"
          topic="Langauge "
          subject="English $ Literature"
          duration={70}
          color="red"
        />
        <CompanionCard
          id="123" name="Countsy the Number Wizard"
          topic="Derivatices and integrals"
          subject="Math"
          duration={30}
          color="cyan"
        />
        <CompanionCard
          id="123" name="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          subject="Science"
          duration={45}
          color="lime"
        />
        
      </section>
      <section className='home-section'>
        <CompanionsList title="Recently Completed sessions"
        companions={recentSessions}
        classNames="w-3/3 max-lg:w-ful"
        />
        
        <CTA />
      </section>
      
      <Button>task</Button>
      

    </main>
  )
}

export default Page