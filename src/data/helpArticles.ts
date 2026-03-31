export interface HelpArticle {
  slug: string;
  title: string;
  category: string;
  content: string;
}

export const helpArticles: HelpArticle[] = [
  {
    slug: "how-streaming-works",
    title: "How does the live streaming service work",
    category: "Services",
    content: "We set up a professional broadcast at the venue before the service begins. The stream is transmitted via a secure private link sent only to family members you specify. Viewers can watch from anywhere in the world on any device — phone, tablet, laptop or smart TV. The stream is recorded in full and delivered to you within 24 hours of the service. No public platforms are used — everything is private and secure."
  },
  {
    slug: "equipment-discretion",
    title: "What equipment is used and is it discreet",
    category: "Services",
    content: "We use compact professional cameras and wireless audio equipment specifically chosen for sensitive environments. Equipment is set up quietly before guests arrive and operated from a discreet position throughout. Our team dress appropriately for the occasion and work silently throughout the service. We have extensive experience in venues including churches, crematoria, and private estates."
  },
  {
    slug: "remote-viewing",
    title: "Can family members abroad watch in real time",
    category: "Services",
    content: "Yes. The live stream works for any family member anywhere in the world with an internet connection. We send a secure private link in advance so they can join at the right time. We test the stream before the service begins to ensure everything is working. Family members can watch on their phone, laptop, tablet or smart TV without needing to download any software or create an account."
  },
  {
    slug: "ai-keepsakes",
    title: "How does the AI keepsake service work",
    category: "Services",
    content: "As part of our tribute packages we can create lasting digital keepsakes from photos and video footage provided by the family. This includes AI-enhanced photo restoration, memorial slideshow videos with music, and digital memory books. These are delivered as downloadable files and can be shared with family members privately. We handle everything sensitively and return all original materials."
  },
  {
    slug: "package-differences",
    title: "What is the difference between the packages",
    category: "Pricing",
    content: "The Broadcast package focuses on live streaming and recording the service — ideal when remote attendance is the priority. The Visual Tribute package focuses on photography — capturing the day respectfully for the family to keep. The Full Concierge Coordination package combines everything and includes a dedicated strategy call where we coordinate directly with your venue and funeral director on your behalf. Most families choose the full package for complete peace of mind."
  },
  {
    slug: "venue-coordination",
    title: "How do you coordinate with our venue",
    category: "Services",
    content: "Once booked we contact your venue and funeral director directly to confirm technical requirements, access times, and any restrictions on equipment or positioning. We handle all logistics so the family does not need to manage any technical conversations during an already difficult time. We have worked with a wide range of venues and are experienced in navigating their specific requirements."
  },
  {
    slug: "booking-notice",
    title: "How much notice do you need to book",
    category: "Getting Started",
    content: "We ask for as much notice as possible — ideally at least 5 working days. However we understand that circumstances do not always allow for this and we will always do our best to accommodate urgent requests. Please contact us as soon as you know the date and we will confirm availability immediately. Out of hours contact is available for urgent situations."
  },
  {
    slug: "recording-after",
    title: "What happens to the recording after the service",
    category: "Services",
    content: "The full recording is edited and delivered to you within 24 hours of the service as a private downloadable link. The file is yours to keep and share privately with family. We retain a backup copy for 30 days in case of any technical issues with your download. After 30 days all copies are permanently deleted from our systems. We never share, publish or use footage without explicit written permission."
  }
];
