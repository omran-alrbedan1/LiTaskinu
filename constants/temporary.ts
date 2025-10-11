import { images } from "./images";

export const userData = {
  name: "Lora Ahmad",
  email: "wedadjoulaq@gmail.com",
  phone: "(+963) 987356113",
  photo: images.avatar,
  introduction:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque nostrum earum libero accusamus, cum quaerat possimus fugit quia error. Ipsa vel quam enim iusto pariatur perferendis maxime laborum, ex libero.",
  details: {
    weight: "35 kg",
    place: "Jordan",
    religion: "muslim",
    education: "it engineering",
    maritalStatus: "single",
    height: "170 cm",
    occupation: "designer",
    age: "24",
    jobTitle: "UI - UX designer",
  },
};

export const mockPhotos: Photo[] = [
  {
    id: "1",
    url: "/images/userTest.jpg",
  },
  {
    id: "2",
    url: "/images/userTest.jpg",
  },
  {
    id: "3",
    url: "/images/userTest.jpg",
  },
  {
    id: "4",
    url: "/images/userTest.jpg",
  },
  {
    id: "5",
    url: "/images/userTest.jpg",
  },
  {
    id: "6",
    url: "/images/userTest.jpg",
  },
  {
    id: "7",
    url: "/images/userTest.jpg",
  },
  {
    id: "8",
    url: "/images/userTest.jpg",
  },
];

export const mockNotifications = [
  {
    id: "1",
    type: "success",
    title: "Payment Received",
    message: "Your payment of $250 has been successfully processed.",
    timestamp: new Date("2024-01-15T10:30:00"),
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Subscription Expiring",
    message: "Your premium subscription expires in 3 days.",
    timestamp: new Date("2024-01-15T09:15:00"),
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "New Feature Available",
    message: "Check out the new dashboard analytics feature.",
    timestamp: new Date("2024-01-14T16:45:00"),
    read: true,
  },
  {
    id: "4",
    type: "error",
    title: "Login Attempt Failed",
    message: "There was an unsuccessful login attempt from a new device.",
    timestamp: new Date("2024-01-14T14:20:00"),
    read: true,
  },
  {
    id: "5",
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance this Sunday from 2-4 AM.",
    timestamp: new Date("2024-01-13T11:00:00"),
    read: true,
  },
  {
    id: "6",
    type: "success",
    title: "Profile Updated",
    message: "Your profile information has been successfully updated.",
    timestamp: new Date("2024-01-13T10:30:00"),
    read: true,
  },
];

export const people: Person[] = [
  {
    id: 1,
    name: "John Doe",
    age: 28,
    city: "New York",
    status: "Single",
    occupation: "Software Engineer",
    education: "Bachelor's",
    image: "/images/userTest.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    city: "Los Angeles",
    status: "Married",
    occupation: "Product Manager",
    education: "Master's",
    image: "/images/userTest.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    age: 25,
    city: "Chicago",
    status: "Single",
    occupation: "Data Scientist",
    education: "PhD",
    image: "/images/userTest.jpg",
  },
];

export const mockComplaints: Complaint[] = [
  {
    id: "101",
    reporter: {
      id: 1,
      name: "Ahmed Mohamed",
      email: "ahmed@example.com",
      status: "active",
      verification: "verified",
      registrationDate: "2024-01-15",
      lastLogin: "2024-10-01 09:30",
      reportsCount: 2,
      marriageRequests: 1,
      activeChats: 3,
    },
    reportedUser: {
      id: 2,
      name: "Sara Khalid",
      email: "sara@example.com",
      status: "active",
      verification: "verified",
      registrationDate: "2024-02-20",
      lastLogin: "2024-10-01 08:45",
      reportsCount: 1,
      marriageRequests: 0,
      activeChats: 5,
    },
    type: "harassment",
    date: "2024-10-01 10:30",
    status: "pending",
    description:
      "User sent inappropriate messages repeatedly despite requests to stop",
    attachments: ["screenshot1.jpg", "chat_log.pdf"],
    wasBanned: false,
  },
  {
    id: "102",
    reporter: {
      id: 3,
      name: "Mohamed Ali",
      email: "mohamed@example.com",
      status: "active",
      verification: "verified",
      registrationDate: "2024-03-10",
      lastLogin: "2024-10-01 08:20",
      reportsCount: 0,
      marriageRequests: 2,
      activeChats: 4,
    },
    reportedUser: {
      id: 4,
      name: "Fatima Noor",
      email: "fatima@example.com",
      status: "pending",
      verification: "pending",
      registrationDate: "2024-09-15",
      lastLogin: "2024-09-30 22:15",
      reportsCount: 3,
      marriageRequests: 1,
      activeChats: 2,
    },
    type: "inappropriate",
    date: "2024-10-01 09:15",
    status: "pending",
    description: "Sharing inappropriate images on the platform",
    attachments: ["image1.png"],
    wasBanned: false,
  },
  {
    id: "103",
    reporter: {
      id: 5,
      name: "Khalid Hassan",
      email: "khalid@example.com",
      status: "active",
      verification: "verified",
      registrationDate: "2024-01-05",
      lastLogin: "2024-09-30 20:30",
      reportsCount: 1,
      marriageRequests: 0,
      activeChats: 6,
    },
    reportedUser: {
      id: 6,
      name: "Layla Ahmed",
      email: "layla@example.com",
      status: "banned",
      verification: "unverified",
      registrationDate: "2024-09-20",
      lastLogin: "2024-09-30 18:00",
      reportsCount: 5,
      marriageRequests: 0,
      activeChats: 0,
    },
    type: "fake",
    date: "2024-09-30 16:45",
    status: "resolved",
    description: "Fake profile using stolen pictures",
    attachments: ["profile_comparison.jpg", "original_source.pdf"],
    wasBanned: true,
  },
  {
    id: "104",
    reporter: {
      id: 7,
      name: "Noura Abdullah",
      email: "noura@example.com",
      status: "active",
      verification: "verified",
      registrationDate: "2024-04-12",
      lastLogin: "2024-09-30 19:10",
      reportsCount: 0,
      marriageRequests: 3,
      activeChats: 7,
    },
    reportedUser: {
      id: 8,
      name: "Omar Saleh",
      email: "omar@example.com",
      status: "active",
      verification: "verified",
      registrationDate: "2024-05-22",
      lastLogin: "2024-09-30 16:30",
      reportsCount: 2,
      marriageRequests: 1,
      activeChats: 8,
    },
    type: "spam",
    date: "2024-09-30 14:20",
    status: "pending",
    description: "Excessive messaging and promotional content",
    attachments: ["chat_history.txt", "promotional_messages.jpg"],
    wasBanned: false,
  },
  {
    id: "105",
    reporter: {
      id: 9,
      name: "Rashid Al-Mansoor",
      email: "rashid@example.com",
      status: "active",
      verification: "verified",
      registrationDate: "2024-06-18",
      lastLogin: "2024-09-30 12:45",
      reportsCount: 1,
      marriageRequests: 0,
      activeChats: 2,
    },
    reportedUser: {
      id: 10,
      name: "Aisha Jamil",
      email: "aisha@example.com",
      status: "inactive",
      verification: "verified",
      registrationDate: "2024-03-30",
      lastLogin: "2024-09-28 11:20",
      reportsCount: 0,
      marriageRequests: 2,
      activeChats: 1,
    },
    type: "other",
    date: "2024-09-30 11:30",
    status: "rejected",
    description: "Personal disagreement over marriage proposal",
    attachments: [],
    wasBanned: false,
  },
];

export const MOCK_STATISTICS = {
  overview: {
    totalComplaints: 1247,
    pending: 89,
    resolved: 987,
    rejected: 171,
    resolutionRate: 79.2,
    avgResolutionTime: "2.3 days",
  },
  byType: [
    {
      type: "Harassment",
      count: 456,
      trend: "up" as const,
      percentage: 36.6,
      color: "#ef4444",
    },
    {
      type: "Fake Profile",
      count: 289,
      trend: "down" as const,
      percentage: 23.2,
      color: "#f59e0b",
    },
    {
      type: "Inappropriate Content",
      count: 198,
      trend: "up" as const,
      percentage: 15.9,
      color: "#8b5cf6",
    },
    {
      type: "Spam",
      count: 156,
      trend: "stable" as const,
      percentage: 12.5,
      color: "#06b6d4",
    },
    {
      type: "Other",
      count: 148,
      trend: "stable" as const,
      percentage: 11.9,
      color: "#10b981",
    },
  ],
  monthlyTrend: [
    { month: "Jan", complaints: 98, resolved: 75 },
    { month: "Feb", complaints: 112, resolved: 89 },
    { month: "Mar", complaints: 105, resolved: 82 },
    { month: "Apr", complaints: 124, resolved: 98 },
    { month: "May", complaints: 156, resolved: 124 },
    { month: "Jun", complaints: 143, resolved: 115 },
    { month: "Jul", complaints: 167, resolved: 132 },
    { month: "Aug", complaints: 189, resolved: 156 },
    { month: "Sep", complaints: 175, resolved: 142 },
    { month: "Oct", complaints: 198, resolved: 162 },
  ],
};

export const initialTermsContent = {
  title: "Terms and Conditions",
  lastUpdated: "January 1, 2024",
  introduction: `
    <h2>Welcome to Islamic Marriage Platform</h2>
    <p>These Terms and Conditions govern your use of the Islamic Marriage Platform and any related services provided by us. By accessing or using our platform, you agree to be bound by these Terms.</p>
    
    <p><strong>Please read these Terms carefully before using our services.</strong> If you disagree with any part of these terms, you may not access the platform.</p>
  `,
  acceptance: `
    <h2>Acceptance of Terms</h2>
    <p>By registering for an account or using the Islamic Marriage Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, our Privacy Policy, and any additional guidelines or rules applicable to specific services.</p>
    
    <p>These Terms constitute a legally binding agreement between you and Islamic Marriage Platform.</p>
  `,
  eligibility: `
    <h2>Eligibility Requirements</h2>
    <p>To use our platform, you must:</p>
    <ul>
      <li>Be at least 18 years of age</li>
      <li>Be legally eligible to marry according to Islamic law</li>
      <li>Have a genuine intention for Islamic marriage</li>
      <li>Provide accurate and complete information during registration</li>
      <li>Obtain necessary guardian (Wali) approval if required</li>
      <li>Comply with all applicable laws and Islamic principles</li>
    </ul>
    
    <p>We reserve the right to verify your eligibility and may request supporting documentation at any time.</p>
  `,
  userResponsibilities: `
    <h2>User Responsibilities</h2>
    <h3>Account Security</h3>
    <p>You are responsible for:</p>
    <ul>
      <li>Maintaining the confidentiality of your account credentials</li>
      <li>All activities that occur under your account</li>
      <li>Promptly notifying us of any unauthorized access</li>
      <li>Ensuring your contact information is current and accurate</li>
    </ul>
    
    <h3>Content and Conduct</h3>
    <p>You agree to:</p>
    <ul>
      <li>Provide truthful and accurate information in your profile</li>
      <li>Respect Islamic values and principles in all interactions</li>
      <li>Not engage in any fraudulent, deceptive, or harmful behavior</li>
      <li>Not harass, threaten, or abuse other users</li>
      <li>Not post inappropriate, offensive, or un-Islamic content</li>
      <li>Respect the privacy and dignity of other users</li>
    </ul>
  `,
  islamicGuidelines: `
    <h2>Islamic Guidelines</h2>
    <p>As an Islamic marriage platform, we require all users to adhere to Islamic principles:</p>
    
    <h3>Communication Guidelines</h3>
    <ul>
      <li>All communications should be conducted with Islamic etiquette (adab)</li>
      <li>Mahram and guardian involvement is required where appropriate</li>
      <li>Mixed-gender interactions should maintain Islamic boundaries</li>
      <li>Discussions should be purposeful and related to marriage</li>
    </ul>
    
    <h3>Marriage Process</h3>
    <ul>
      <li>Users must follow proper Islamic marriage procedures</li>
      <li>Guardian (Wali) approval is required for female users</li>
      <li>All marriage agreements should comply with Islamic law</li>
      <li>Users are encouraged to seek religious guidance when needed</li>
    </ul>
  `,
  platformServices: `
    <h2>Platform Services</h2>
    <h3>Matching Services</h3>
    <p>We provide:</p>
    <ul>
      <li>Compatibility matching based on Islamic criteria</li>
      <li>Secure communication channels</li>
      <li>Guardian involvement features</li>
      <li>Marriage request management</li>
    </ul>
    
    <h3>Service Limitations</h3>
    <p>While we strive to provide excellent service, we cannot:</p>
    <ul>
      <li>Guarantee marriage outcomes</li>
      <li>Verify all user information with absolute certainty</li>
      <li>Control user behavior or decisions</li>
      <li>Provide legal or religious advice (users should consult qualified scholars)</li>
    </ul>
  `,
  privacyCommunication: `
    <h2>Privacy and Communication</h2>
    <h3>Data Protection</h3>
    <p>We are committed to protecting your privacy in accordance with:</p>
    <ul>
      <li>Our Privacy Policy</li>
      <li>Islamic principles of confidentiality</li>
      <li>Applicable data protection laws</li>
    </ul>
    
    <h3>Communication Monitoring</h3>
    <p>To ensure compliance with our guidelines:</p>
    <ul>
      <li>We may monitor communications for quality and safety purposes</li>
      <li>Guardians may have access to relevant communications</li>
      <li>We reserve the right to review content for policy violations</li>
    </ul>
  `,
  prohibitedActivities: `
    <h2>Prohibited Activities</h2>
    <p>Users are strictly prohibited from:</p>
    <ul>
      <li>Providing false or misleading information</li>
      <li>Engaging in un-Islamic behavior or conversations</li>
      <li>Harassing or threatening other users</li>
      <li>Using the platform for commercial purposes without authorization</li>
      <li>Attempting to bypass security measures</li>
      <li>Sharing inappropriate content or images</li>
      <li>Impersonating others or creating fake accounts</li>
      <li>Violating any applicable laws or regulations</li>
    </ul>
  `,
  termination: `
    <h2>Account Termination</h2>
    <h3>User-Initiated Termination</h3>
    <p>You may deactivate your account at any time through your account settings.</p>
    
    <h3>Platform-Initiated Termination</h3>
    <p>We may suspend or terminate your account if:</p>
    <ul>
      <li>You violate these Terms and Conditions</li>
      <li>You engage in fraudulent or harmful activities</li>
      <li>You provide false information</li>
      <li>Your behavior contradicts Islamic principles</li>
      <li>Required by law or regulatory authorities</li>
    </ul>
  `,
  intellectualProperty: `
    <h2>Intellectual Property</h2>
    <p>All content on the Islamic Marriage Platform, including:</p>
    <ul>
      <li>Text, graphics, logos, and images</li>
      <li>Software and platform code</li>
      <li>Brand names and trademarks</li>
    </ul>
    <p>Are the property of Islamic Marriage Platform or our licensors and are protected by intellectual property laws.</p>
    
    <p>You may not copy, modify, distribute, or use any platform content without our explicit permission.</p>
  `,
  disclaimer: `
    <h2>Disclaimer of Warranties</h2>
    <p>The platform is provided "as is" and "as available" without warranties of any kind, either express or implied.</p>
    
    <p>We do not warrant that:</p>
    <ul>
      <li>The platform will be uninterrupted or error-free</li>
      <li>All users are truthful in their representations</li>
      <li>Any specific marriage outcomes will be achieved</li>
      <li>The platform will meet all your requirements</li>
    </ul>
  `,
  limitationLiability: `
    <h2>Limitation of Liability</h2>
    <p>To the fullest extent permitted by law, Islamic Marriage Platform shall not be liable for:</p>
    <ul>
      <li>Any direct, indirect, or consequential damages</li>
      <li>Loss of data, profits, or opportunities</li>
      <li>User interactions or marriage outcomes</li>
      <li>Actions or omissions of other users</li>
      <li>Unauthorized access to user accounts</li>
    </ul>
  `,
  changes: `
    <h2>Changes to Terms</h2>
    <p>We reserve the right to modify these Terms and Conditions at any time. We will notify users of significant changes through:</p>
    <ul>
      <li>Platform notifications</li>
      <li>Email communications</li>
      <li>Updated "Last Updated" date</li>
    </ul>
    
    <p>Continued use of the platform after changes constitutes acceptance of the modified Terms.</p>
  `,
  governingLaw: `
    <h2>Governing Law and Dispute Resolution</h2>
    <h3>Governing Law</h3>
    <p>These Terms shall be governed by and construed in accordance with the laws of [Country], while respecting Islamic legal principles.</p>
    
    <h3>Dispute Resolution</h3>
    <p>In case of disputes:</p>
    <ul>
      <li>We encourage amicable resolution through communication</li>
      <li>Islamic mediation principles should be considered</li>
      <li>Legal proceedings may be initiated if necessary</li>
    </ul>
  `,
  contact: `
    <h2>Contact Information</h2>
    <p>For questions about these Terms and Conditions, please contact us:</p>
    <ul>
      <li>Email: legal@islamicmarriage.com</li>
      <li>Through our platform's support system</li>
      <li>Registered office address: [Your Company Address]</li>
    </ul>
  `,
};

export const initialPrivacyContent = {
  title: "Privacy Policy",
  lastUpdated: "January 1, 2024",
  introduction: `
    <h2>Introduction</h2>
    <p>At <strong>Islamic Marriage Platform</strong>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.</p>
    
    <p>Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.</p>
  `,
  informationCollection: `
    <h2>Information We Collect</h2>
    
    <h3>Personal Information</h3>
    <p>We may collect personal information that you voluntarily provide to us when you:</p>
    <ul>
      <li>Register on our platform</li>
      <li>Create or update your profile</li>
      <li>Use our matching services</li>
      <li>Communicate with other users</li>
      <li>Contact our support team</li>
    </ul>
    
    <h3>Automatically Collected Information</h3>
    <p>We may automatically collect certain information when you visit, use, or navigate the platform. This information may include:</p>
    <ul>
      <li>Device and usage information</li>
      <li>IP address and browser type</li>
      <li>Pages visited and features used</li>
      <li>Time and date of visits</li>
    </ul>
  `,
  informationUsage: `
    <h2>How We Use Your Information</h2>
    <p>We use the information we collect to:</p>
    <ul>
      <li>Provide and maintain our services</li>
      <li>Facilitate Islamic marriage matching</li>
      <li>Verify user identities and ensure platform security</li>
      <li>Communicate with you about your account</li>
      <li>Send administrative information and updates</li>
      <li>Improve our platform and user experience</li>
      <li>Comply with legal obligations</li>
    </ul>
  `,
  informationSharing: `
    <h2>Information Sharing and Disclosure</h2>
    <p>We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:</p>
    
    <h3>With Your Consent</h3>
    <p>We may share your information with third parties when we have your explicit consent.</p>
    
    <h3>For Legal Reasons</h3>
    <p>We may disclose information where required by law or to protect our rights, safety, or property.</p>
    
    <h3>Service Providers</h3>
    <p>We may share information with trusted third-party service providers who assist us in operating our platform.</p>
  `,
  dataSecurity: `
    <h2>Data Security</h2>
    <p>We implement appropriate technical and organizational security measures designed to protect your personal information. However, please note that no electronic transmission or storage method is 100% secure.</p>
    
    <p>We take special care to protect sensitive information in accordance with Islamic principles and values.</p>
  `,
  userRights: `
    <h2>Your Rights</h2>
    <p>You have the right to:</p>
    <ul>
      <li>Access and review your personal information</li>
      <li>Correct inaccurate or incomplete information</li>
      <li>Request deletion of your personal information</li>
      <li>Object to processing of your personal information</li>
      <li>Request data portability</li>
      <li>Withdraw consent at any time</li>
    </ul>
  `,
  retention: `
    <h2>Data Retention</h2>
    <p>We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>
  `,
  changes: `
    <h2>Changes to This Privacy Policy</h2>
    <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
  `,
  contact: `
    <h2>Contact Us</h2>
    <p>If you have any questions about this Privacy Policy, please contact us:</p>
    <ul>
      <li>Email: privacy@islamicmarriage.com</li>
      <li>Through our platform's support system</li>
    </ul>
  `,
};
