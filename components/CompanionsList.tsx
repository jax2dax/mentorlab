
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
interface companionsListProps {
  title:string;
  companions?:Companion[];
  classNames?:string;

}

import { getSubjectColor } from '@/lib/utils'
const CompanionsList = ({title,companions, classNames}:companionsListProps) => {
  return (
    <article className={cn( "**:", 'companion-list', classNames)}>
        <h2 className="font-bold text-3xl ">Recent  Session</h2>
        <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className=" text-lg w-2/3  ">Lessons</TableHead>
      <TableHead className="text-lg">Subject</TableHead>
      <TableHead className="text-lg text-left">Duration</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {/**Mapping troughthe companions 
      the map(({ id, subject, name, topic, duration })=>is destructured from the companions, it is same as
          .map((companion)=>{<div>companion.id}</div> )
    */}
    {companions?.map(({ id, subject, name, topic, duration })=>(
      <TableRow key={id}>
        <TableCell>
          <Link href={`/companions/${id}`}>
              <div className="flex items-center gap-2 ">
                <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                style={{backgroundColor: getSubjectColor(subject)}}>
                  <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35}/>
                </div>
                <div className="flex flex-col  gap-2">
                  <p className="font-bold text-2xl ">{name}</p>{/*fix bigtxt*/}
                  <p className="text-lg">{topic}</p>
                </div>
              </div>
          </Link>
        </TableCell>
        <TableCell>
          <div className="subject-badge w-fit max-md:hidden ">
            {subject}
          </div>{/*changing the getSubjectColor(subject will change the subjectcolumn (math) color*/}
          <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden" 
               style={{backgroundColor:getSubjectColor(subject)}} >
              <Image src={`icons/${subject}.svg`} alt={subject} width={18} height={18}></Image>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center w-full justify-end">
            <p className="text-2xl">{duration} {' '}<span className="max-md:hidden">mins</span></p>
            <Image src="/icons/clock.svg" alt="minutes" height={14} width={14} className="max-md:hidden" />
          </div>
        </TableCell>
      </TableRow>
    ))}


    
  </TableBody>
</Table>
dgfchv
        </article>
  )
}

export default CompanionsList