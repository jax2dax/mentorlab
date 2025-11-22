/*
const CompanionsLibrary = async  ({searchParams}:SearchParams ) => {
  const params = await searchParams;     ---------thisb allows us to access the search parameters from the URL, which can be used for filtering or pagination.
 ------------Allows us to use the url to query pages
  */
import { getAllCompanions } from "@/lib/actions/companion.actions"
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";

const CompanionsLibrary = async  ({searchParams}:SearchParams ) => {
   const filters = await searchParams;
    const subject = filters.subject ? filters.subject : '';
    const topic = filters.topic ? filters.topic : '';

    const companions = await getAllCompanions({ subject, topic });
    console.log(companions);43
  
  return (
    <main >
      <section className="flex justify-between gap-4 max-sm:flex-col">
          <h1>Companions Library</h1>
          <div className="flex gap-4 "><SearchInput />
          <SubjectFilter />Filters</div>
      </section>
      <section className="">
          {companions.map((companion)=>(
            <CompanionCard 
              key={companion.id} 
              {...companion}
              color={getSubjectColor(companion.subject)} />
          ))}
        </section>
      </main>
  )
}

export default CompanionsLibrary