import Link from "next/link";
import type { Freelancer } from "@/lib/data";

export default function FreelancerCard({ freelancer }: { freelancer: Freelancer }) {
  return (
    <Link href={`/freelancers/${freelancer.id}`}>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
            {freelancer.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">{freelancer.name}</h2>
            <p className="text-sm text-blue-600">{freelancer.profession}</p>
            <p className="mt-1 text-sm text-gray-500">{freelancer.location}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
              <span className="text-yellow-500">★</span>
              {freelancer.rating}
              <span className="text-gray-400">({freelancer.reviewCount})</span>
            </div>
            {freelancer.available ? (
              <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                Available
              </span>
            ) : (
              <span className="mt-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                Busy
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {freelancer.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
              {skill}
            </span>
          ))}
          {freelancer.skills.length > 3 && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-400">
              +{freelancer.skills.length - 3}
            </span>
          )}
        </div>
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">{freelancer.bio}</p>
      </div>
    </Link>
  );
}
