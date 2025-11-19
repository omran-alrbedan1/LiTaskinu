import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from ".";
import {
  FaEnvelope,
  FaCalendarAlt,
  FaPhone,
  FaHandHoldingHeart,
} from "react-icons/fa";
import Image from "next/image";
import { images } from "@/constants/images";
import { RiUserReceivedFill, RiUserShared2Fill } from "react-icons/ri";
import { LuMailQuestion } from "react-icons/lu";
import Link from "next/link";
import SectionHeader from "./SectionHeader";

interface MarriageRequest {
  to?: User;
  from?: User;
  date: string;
  status: string;
}

interface MarriageRequestsSectionProps {
  requests: {
    sent: MarriageRequest[];
    received: MarriageRequest[];
  };
}

const RequestCard = ({
  request,
  type,
}: {
  request: MarriageRequest;
  type: "sent" | "received";
}) => {
  const user = type === "sent" ? request.to : request.from;

  return (
    <Link href={`./${user?.id}`}>
      <div className="flex justify-between mt-2 items-start p-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:border-primary-color1 hover:shadow-sm transition-all duration-200 cursor-pointer">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <Image
            src={user?.avatar || images.Unknown}
            alt={user?.name || "Unknown user"}
            width={44}
            height={44}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <UserInfo user={user} date={request.date} />
        </div>
        <div className="flex-shrink-0 ml-3">
          <StatusBadge status={request.status} />
        </div>
      </div>
    </Link>
  );
};

const UserInfo = ({ user, date }: { user?: User; date: string }) => (
  <div className="flex-1 min-w-0">
    <div className="font-semibold text-sm truncate hover:text-primary-color1 transition-colors">
      {user?.name || "Unknown User"}
    </div>
    <InfoRow icon={FaEnvelope} text={user?.email} />
    <InfoRow icon={FaPhone} text={user?.phone} />
    <InfoRow icon={FaCalendarAlt} text={date} />
  </div>
);

const InfoRow = ({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text?: string;
}) => (
  <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 mt-1">
    <Icon className="w-3 h-3 flex-shrink-0 text-primary-color1" />
    <span className="text-gray-500">{text}</span>
  </div>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="text-center py-8 text-gray-400">
    <LuMailQuestion className="size-20 text-primary-color1 mx-auto" />
    <p className="mt-4">{message}</p>
  </div>
);

const MarriageRequestsSection = ({
  requests,
}: MarriageRequestsSectionProps) => {
  return (
    <Card className="mt-6 p-6">
      <SectionHeader
        title="User's Marriage Requests"
        description="View all marriage proposals sent and received by this user"
        icon={<FaHandHoldingHeart className="w-8 h-8 text-primary-color1" />}
      />
      <div className="grid mt-6 grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sent Requests Card */}
        <Card className="">
          <CardHeader className="p-4">
            <div className="flex items-center gap-2">
              <RiUserShared2Fill className="w-6 h-6 text-primary-color1" />
              <CardTitle className="text-base font-semibold">
                Sent Requests ({requests.sent.length})
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            {requests.sent.length > 0 ? (
              requests.sent.map((request, index) => (
                <RequestCard key={index} request={request} type="sent" />
              ))
            ) : (
              <EmptyState message="No sent requests" />
            )}
          </CardContent>
        </Card>

        {/* Received Requests Card */}
        <Card className="">
          <CardHeader className="p-4">
            <div className="flex items-center gap-2">
              <RiUserReceivedFill className="w-6 h-6 text-primary-color1" />
              <CardTitle className="text-base font-semibold">
                Received Requests ({requests.received.length})
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            {requests.received.length > 0 ? (
              requests.received.map((request, index) => (
                <RequestCard key={index} request={request} type="received" />
              ))
            ) : (
              <EmptyState message="No received requests" />
            )}
          </CardContent>
        </Card>
      </div>
    </Card>
  );
};

export default MarriageRequestsSection;
