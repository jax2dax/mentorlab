import React from 'react'
import CompanionCard from '@/components/CompanionCard'
import CTA from '@/components/CTA'
import { getFeaturedCompanions, getRecommendedCompanions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'

const Page = async () => {
  const [featuredCompanions, recommendedCompanions] = await Promise.all([
    getFeaturedCompanions(),
    getRecommendedCompanions(),
  ]) as [CompanionRow[], CompanionRow[]];

  return (
    <main>
      <section className="flex flex-col gap-2">
        <h1>Start Here</h1>
        <p className="text-muted-foreground text-lg">
          Hand-picked companions to get you learning in the next 30 seconds.
        </p>
      </section>

      <section className="companions-grid">
        {featuredCompanions.length === 0 && (
          <p className="text-muted-foreground">
            No featured companions yet — mark some as featured in Supabase to show them here.
          </p>
        )}
        {featuredCompanions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section className="home-section">
        <div className="flex flex-col gap-4 flex-1 w-full">
          <h2 className="font-bold text-3xl">Recommended by Us</h2>
          <div className="companions-grid">
            {recommendedCompanions.length === 0 && (
              <p className="text-muted-foreground">
                No recommended companions yet — mark some as recommended (with a rating) in Supabase to show them here.
              </p>
            )}
            {recommendedCompanions.map((companion) => (
              <CompanionCard
                key={companion.id}
                {...companion}
                rating={companion.rating ?? undefined}
                recommendationNote={companion.recommendation_note ?? undefined}
                color={getSubjectColor(companion.subject)}
              />
            ))}
          </div>
        </div>

        <CTA />
      </section>
    </main>
  )
}

export default Page
