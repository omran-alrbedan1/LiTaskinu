import ContactUsForm from "@/components/user/forms/ContactUsForm";
import Image from "next/image";
import { ICONS } from "@/constants/icons";
import WhatsAppFloatingButton from "@/components/shared/WhatsappFloatingButton";
import CustomHeader from "@/components/shared/CustomHeader";

const SupportPage = () => {
  const contactInfo = [
    {
      icon: ICONS.email,
      title: "Email",
      content: "om.alrbedan100@gmail.com",
    },
    {
      icon: ICONS.phone,
      title: "Phone",
      content: "(093) 0988638009",
    },
    {
      icon: ICONS.phone,
      title: "Whatsapp",
      content: "(093) 0988638009",
    },
  ];

  return (
    <div>
      <CustomHeader
        title="Technical Support"
        description="This Terms of Use contains the rules and guideline  for using our electronic platform"
      />
      <ContactUsForm />
      <div className="-mt-12">
        <h1 className="text-xl font-bold">Our Contact Information :</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {contactInfo.map((item) => (
            <div className="flex items-center gap-2">
              <div className="bg-primary-color1/40 flex items-center justify-center rounded-full h-10 w-10">
                <Image src={item.icon} height={22} width={22} alt="email" />
              </div>
              <div>
                <h3>{item.title}</h3>
                <p className="text-gray-500">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <WhatsAppFloatingButton />
    </div>
  );
};

export default SupportPage;
