import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { people } from "@/constants/temporary";
import EventSection from "./_components/EventSection";
import PersonCard from "./_components/PersonCard";
import Link from "next/link"; // Use Link instead of useRouter

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Event Section */}
        <EventSection />

        {/* People Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              People you might like
            </h2>
            <Link
              href="./persons"
              className="text-primary-color1 font-bold text-sm flex items-center"
            >
              See all
              <ChevronRight size={15} />
            </Link>
          </div>

          {/* People Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {people.map((person, index) => (
              <PersonCard key={index} person={person} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
