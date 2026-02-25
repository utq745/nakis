import type { Metadata } from "next";
import FixYourDstClient from "@/components/landing/fix-your-dst-content";

const serviceIsItems = [
  "Density & pull compensation tuning",
  "Underlay cleanup (missing or excessive)",
  "Satin direction stabilization",
  "Edge readability improvement",
  "Trim and jump reduction (within reason)",
  "Lock stitch corrections",
  "Small sequencing adjustments",
];

const serviceIsNotItems = [
  "No full re-digitizing from artwork",
  "No rebuilding shapes from scratch",
  "No creative style changes",
  "No converting bad artwork into a new embroidery",
];

const typicalIssues = [
  "Wrong densities (too heavy / too light)",
  "Poor underlay",
  "Unstable satin edges",
  "Push / pull distortion",
  "Excess trims and long travel stitches",
  "Messy tie-ins / tie-offs",
  "Fabric shifting from bad sequencing",
  "Small registration problems",
];

const changesAfterFixing = [
  "Cleaner satin borders",
  "Consistent letter thickness",
  "Reduced fabric distortion",
  "Better underlay support",
  "Fewer thread breaks",
  "Smoother machine run",
  "More predictable production results",
];

const rightChoiceItems = [
  "You already have a DST but stitching looks unstable",
  "Edges are rough or letters collapse",
  "Too many trims or thread breaks",
  "You need production-safe cleanup without rebuilding",
];

const notRightChoiceItems = [
  "Auto-digitized file is structurally wrong",
  "Shapes are broken or missing",
  "Design must be recreated from artwork",
  "A clean rebuild is required",
];

const processItems = [
  "Upload your DST and specify fabric + size",
  "We apply targeted corrections",
  "We stitch and send approval results",
];

const comparisonBlocks = [
  {
    title: "RAW DST RESULT",
    line1: "Runs exactly as delivered",
    line2: "Unstable stitch behavior",
    imageSrc: "/images/fix-your-dst/raw-dst-result.webp",
    imageAlt:
      "Raw DST stitch result showing unstable edges and production issues on fabric",
  },
  {
    title: "TARGETED FIXES",
    line1: "Stabilized within the same file",
    line2: "No redesign involved",
    imageSrc: "/images/fix-your-dst/targeted-fixes-applied.webp",
    imageAlt:
      "Annotated stitch sample highlighting targeted correction points in the DST file",
  },
  {
    title: "PRODUCTION RESULT",
    line1: "Predictable stitching outcome",
    line2: "Ready for repeat production",
    imageSrc: "/images/fix-your-dst/final-stitch-result.webp",
    imageAlt:
      "Final stitch result after DST stabilization with cleaner satin and improved structure",
  },
];

const faqItems = [
  {
    question: "Do you re-digitize the design?",
    answer: "No. Only targeted production fixes are applied.",
  },
  {
    question: "What if the DST cannot be stabilized properly?",
    answer: "We will inform you before any work continues.",
  },
  {
    question: "Do you still stitch a sample?",
    answer: "Yes. The fix is verified with a real stitch-out.",
  },
  {
    question: "What info should I provide?",
    answer: "Fabric type, size, and known issues.",
  },
  {
    question: "Turnaround time?",
    answer: "Usually within 24 hours.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export const metadata: Metadata = {
  title: "Fix Your DST | Approval Stitch",
  description:
    "Targeted production fixes to your existing DST file, verified with a real stitch-out. No full re-digitizing.",
  keywords: [
    "fix your dst",
    "dst file correction",
    "embroidery dst stabilization",
    "production stitch verification",
    "targeted dst fixes",
  ],
  openGraph: {
    title: "Fix Your DST | Approval Stitch",
    description:
      "Targeted production fixes to your existing DST file, verified with a real stitch-out.",
    type: "website",
    images: [
      {
        url: "/images/fix-your-dst/final-stitch-result.webp",
        width: 1600,
        height: 1600,
        alt: "Final stitch result after DST stabilization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fix Your DST | Approval Stitch",
    description:
      "Targeted production fixes to your existing DST file, verified with a real stitch-out.",
    images: ["/images/fix-your-dst/final-stitch-result.webp"],
  },
  alternates: {
    canonical: "/fix-your-dst",
  },
};

export default function FixYourDstPage() {
  return (
    <FixYourDstClient
      serviceIsItems={serviceIsItems}
      serviceIsNotItems={serviceIsNotItems}
      typicalIssues={typicalIssues}
      changesAfterFixing={changesAfterFixing}
      rightChoiceItems={rightChoiceItems}
      notRightChoiceItems={notRightChoiceItems}
      processItems={processItems}
      comparisonBlocks={comparisonBlocks}
      faqItems={faqItems}
      faqSchema={faqSchema}
      translations={{
        heroTitle: "Fix Your DST File",
        heroDesc: "Targeted production fixes to your existing DST - verified with a real stitch-out.",
        heroSubDesc: "No full re-digitizing. If the file cannot be stabilized properly, we will let you know before proceeding.",
        buttonText: "Start Fix Your DST Order",
        realStitch: "Real Stitch Sample",
        prodReady: "Production Ready",
        whatIs: "What This Service Is",
        whatIsNot: "What This Service Is Not",
        minimalChanges: "Changes remain minimal - only what improves stitch stability.",
        ifNotPossible: "If fixing cannot make the file production-ready, we will inform you before continuing.",
        compTitle: "Real Production Comparison",
        risksTitle: "Typical Issues We Correct",
        risksSub: "Typical Issues We Correct",
        risksLabel: "Production Risks",
        stabilityTitle: "What Changes After Fixing",
        stabilitySub: "What Changes After Fixing",
        stabilityLabel: "Enhanced Stability",
        rightChoiceTitle: "Right Choice When...",
        notRightChoiceTitle: "Not The Right Choice If...",
        processTitle: "Simple Process",
        turnaround: "Standard turnaround is typically within 24 hours.",
        faqTitle: "Frequently Asked",
        faqLabel: "Questions & Answers"
      }}
    />
  );
}
