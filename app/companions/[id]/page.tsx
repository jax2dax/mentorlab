/*this is displaying the fetch donw by lib> actions  */
import {getCompanion} from "@/lib/actions/companion.actions";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getSubjectColor} from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";

interface CompanionSessionPageProps {
    params: Promise<{ id: string}>;
}
//params url/{id}
//searchParams are like /url?key=value & key1=value1

/*before this, when the companions were getting clicked,the id appears in params in url */

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
    const { id } = await params;                                 /*get that id(companions id(similar to the one in the db)) */
    const companion = await getCompanion(id);                    /*get the companion details,(from lib>actions) */
    const user = await currentUser();                            /*get the current user(auth from clerk) */

    const { name, subject, title, topic, duration } = companion;
    console.log(companion);

    if(!user) redirect('/sign-in');         /*force signin, if none */
    if(!name) redirect('/companions')       /*force companion create, if none  */

    return (
        <main>
            <article className="flex rounded-border justify-between p-6 max-md:flex-col">
                <div className="flex items-center gap-2">
                    <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" style={{ backgroundColor: getSubjectColor(subject)}}>
                        <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <p className="font-bold text-2xl">
                                {name}
                            </p>
                            <div className="subject-badge max-sm:hidden">
                                {subject}
                            </div>
                        </div>
                        <p className="text-lg">{topic}</p>
                    </div>
                </div>
                <div className="items-start text-2xl max-md:hidden">
                    {duration} minutes
                </div>
            </article>

             <CompanionComponent
                {...companion}
                companionId={id}
                userName={user.firstName!}
                userImage={user.imageUrl!}
            />
        </main>
    )
}

export default CompanionSession
