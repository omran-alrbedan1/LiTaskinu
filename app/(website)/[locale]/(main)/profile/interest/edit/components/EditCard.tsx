import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "antd";
const EditCard = ({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-primary-color1 text-lg">{question}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export default EditCard;
