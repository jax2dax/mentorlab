import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import {
  getUserCompanions,
  getUserSessions,
  getUserStats,
} from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import { ActivityChart, SubjectChart } from "@/components/JourneyCharts";
import { getSubjectColor } from "@/lib/utils";

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const [companions, sessionHistory, stats] = await Promise.all([
    getUserCompanions(user.id),
    getUserSessions(user.id),
    getUserStats(user.id),
  ]);

  return (
    <main className="flex flex-col gap-8">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={90}
            height={90}
            className="rounded-full"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>

        <div className="flex gap-4 max-sm:w-full max-sm:flex-wrap">
          <div className="stat-card">
            <div className="flex gap-2 items-center">
              <Image src="/icons/check.svg" alt="checkmark" width={20} height={20} />
              <p className="text-2xl font-bold">{stats.totalSessions}</p>
            </div>
            <div className="text-sm text-muted-foreground">Lessons completed</div>
          </div>
          <div className="stat-card">
            <div className="flex gap-2 items-center">
              <Image src="/icons/clock.svg" alt="hours" width={20} height={20} />
              <p className="text-2xl font-bold">{(stats.totalMinutes / 60).toFixed(1)}</p>
            </div>
            <div className="text-sm text-muted-foreground">Hours practiced</div>
          </div>
          <div className="stat-card">
            <div className="flex gap-2 items-center">
              <Image src="/icons/cap.svg" alt="cap" width={20} height={20} />
              <p className="text-2xl font-bold">{companions.length}</p>
            </div>
            <div className="text-sm text-muted-foreground">Companions created</div>
          </div>
          <div className="stat-card">
            <div className="flex gap-2 items-center">
              <span className="text-2xl">🔥</span>
              <p className="text-2xl font-bold">{stats.streak}</p>
            </div>
            <div className="text-sm text-muted-foreground">Day streak</div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 w-full max-w-6xl mx-auto">
        <div className="chart-card w-full">
          <h2 className="font-bold text-xl">Activity — last 14 days</h2>
          <ActivityChart activity={stats.activity} />
        </div>
        <div className="chart-card w-full">
          <h2 className="font-bold text-xl">Sessions by subject</h2>
          {stats.subjectBreakdown.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Complete a session to see your subject breakdown here.
            </p>
          ) : (
            <SubjectChart breakdown={stats.subjectBreakdown} />
          )}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl">
          My Companions {`(${companions.length})`}
        </h2>
        {companions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            You haven&apos;t created a companion yet.
          </p>
        ) : (
          <div className="companions-grid">
            {companions.map((companion) => (
              <CompanionCard
                key={companion.id}
                {...companion}
                color={getSubjectColor(companion.subject)}
              />
            ))}
          </div>
        )}
      </section>

      <CompanionsList title="Recent Sessions" companions={sessionHistory} />
    </main>
  );
};
export default Profile;
