import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FaCreditCard,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
  FaReceipt,
  FaDownload,
  FaPrint,
  FaCrown,
  FaStar,
  FaShieldAlt,
} from "react-icons/fa";
import SectionHeader from "./SectionHeader";

interface PaymentHistory {
  amount: string;
  date: string;
  method: string;
  status?: string;
  transactionId?: string;
}

interface SubscriptionInfo {
  plan: string;
  startDate: string;
  endDate: string;
  status: string;
  paymentHistory: PaymentHistory[];
  price?: string;
  features?: string[];
}

interface FinancialSectionProps {
  subscriptionInfo: SubscriptionInfo;
}

const FinancialSection = ({ subscriptionInfo }: FinancialSectionProps) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Active: "bg-green-50 text-green-700 border-green-200",
      Expired: "bg-red-50 text-red-700 border-red-200",
      Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      Cancelled: "bg-gray-50 text-gray-700 border-gray-200",
    };

    return (
      <Badge
        variant="outline"
        className={`${
          statusConfig[status as keyof typeof statusConfig] ||
          statusConfig.Pending
        } border rounded-full px-3 py-1 font-medium`}
      >
        {status === "Active" && <FaCheckCircle className="w-3 h-3 mr-1" />}
        {status !== "Active" && <FaClock className="w-3 h-3 mr-1" />}
        {status}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      Completed: "bg-green-50 text-green-700 border-green-200",
      Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      Failed: "bg-red-50 text-red-700 border-red-200",
      Refunded: "bg-blue-50 text-blue-700 border-blue-200",
    };

    return (
      <Badge
        variant="outline"
        className={`${
          statusConfig[status as keyof typeof statusConfig] ||
          statusConfig.Pending
        } border rounded-full px-2 py-0.5 text-xs font-medium`}
      >
        {status}
      </Badge>
    );
  };

  const formatCurrency = (amount: string) => {
    if (amount.includes("SAR")) return amount;
    return `${amount} SAR`;
  };

  const getPlanIcon = (plan: string) => {
    const planIcons = {
      Premium: "bg-primary-color1",
      Pro: "bg-gradient-to-br from-blue-500 to-blue-600",
      Basic: "bg-gradient-to-br from-gray-500 to-gray-600",
      Standard: "bg-gradient-to-br from-green-500 to-green-600",
    };

    return (
      planIcons[plan as keyof typeof planIcons] ||
      "bg-gradient-to-br from-gray-500 to-gray-600"
    );
  };

  const getPlanIconComponent = (plan: string) => {
    const planIcons = {
      Premium: <FaCrown className="w-5 h-5" />,
      Pro: <FaStar className="w-5 h-5" />,
      Basic: <FaCreditCard className="w-5 h-5" />,
      Standard: <FaShieldAlt className="w-5 h-5" />,
    };

    return (
      planIcons[plan as keyof typeof planIcons] || (
        <FaCreditCard className="w-5 h-5" />
      )
    );
  };

  return (
    <div className="mt-6 p-6">
      <SectionHeader
        title="Financial Information"
        description="Subscription details and payment history"
        icon={<FaMoneyBillWave className="w-6 h-6 text-primary-color1" />}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-4">
        {/* Current Subscription */}
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold ">Current Plan</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Active subscription details
                </p>
              </div>
              {getStatusBadge(subscriptionInfo.status)}
            </div>

            {/* Plan Card */}
            <div
              className={`rounded-xl p-5 mb-6 ${getPlanIcon(
                subscriptionInfo.plan
              )} text-white`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      {getPlanIconComponent(subscriptionInfo.plan)}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">
                        {subscriptionInfo.plan} Plan
                      </h2>
                      {subscriptionInfo.price && (
                        <p className="text-white/90 font-semibold">
                          {formatCurrency(subscriptionInfo.price)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Timeline */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                    <FaCalendarAlt className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                    Start Date
                  </span>
                </div>
                <span className="text-sm  font-medium">
                  {subscriptionInfo.startDate}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center">
                    <FaClock className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                    End Date
                  </span>
                </div>
                <span className="text-sm  font-medium">
                  {subscriptionInfo.endDate}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                    <FaReceipt className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                    Total Payments
                  </span>
                </div>
                <span className="text-sm  font-medium">
                  {subscriptionInfo.paymentHistory.length} payments
                </span>
              </div>
            </div>

            {/* Plan Features */}
            {subscriptionInfo.features && (
              <div>
                <h5 className="font-semibold  mb-3">Included Features</h5>
                <div className="grid gap-2">
                  {subscriptionInfo.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-400 ">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold ">Payment History</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Recent transactions and invoices
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <FaDownload className="w-3 h-3" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <FaPrint className="w-3 h-3" />
                  Print
                </Button>
              </div>
            </div>

            {subscriptionInfo.paymentHistory.length > 0 ? (
              <div className="space-y-3">
                {subscriptionInfo.paymentHistory.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200  transition-all duration-200"
                  >
                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaMoneyBillWave className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-semibold ">
                          {formatCurrency(payment.amount)}
                        </div>
                        {payment.status &&
                          getPaymentStatusBadge(payment.status)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="capitalize">{payment.method}</span>
                        {payment.transactionId && (
                          <>
                            <span>•</span>
                            <span className="font-mono">
                              ID: {payment.transactionId}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium ">{payment.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaReceipt className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">
                  No payment history available
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Your payment records will appear here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialSection;
