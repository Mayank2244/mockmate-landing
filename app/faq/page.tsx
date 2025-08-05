import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search } from "lucide-react"

export default function FAQPage() {
  const faqs = [
    {
      question: "How accurate is the AI feedback?",
      answer:
        "Our AI is trained on thousands of successful interviews and continuously updated with the latest hiring trends. Users report 95% accuracy in feedback quality and relevance.",
    },
    {
      question: "Can I practice for specific companies?",
      answer:
        "Yes! We have company-specific interview formats and questions for major tech companies, consulting firms, and other industries. Our database includes interview patterns from 500+ companies.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use enterprise-grade encryption and never share your personal information or interview responses with third parties. Your data is stored securely and you can delete it anytime.",
    },
    {
      question: "How long does it take to see improvement?",
      answer:
        "Most users see noticeable improvement after 3-5 practice sessions. Our analytics track your progress and show measurable improvements in confidence, clarity, and answer quality.",
    },
    {
      question: "What types of interviews can I practice?",
      answer:
        "You can practice behavioral, technical, case study, and general interviews. Our AI adapts to the specific type you choose.",
    },
    {
      question: "Do you offer resume templates?",
      answer:
        "Yes, our Pro and Enterprise plans include access to a library of professionally designed, ATS-friendly resume templates.",
    },
    {
      question: "How does peer-to-peer matching work?",
      answer:
        "Our Peer Connect feature allows you to find and schedule mock interviews with other job seekers based on shared skills and domains. You can give and receive feedback from real people.",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <header className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Find answers to the most common questions about MockMateAI.
          </p>
        </div>
      </header>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="relative mb-8">
            <Label htmlFor="faq-search" className="sr-only">
              Search FAQs
            </Label>
            <Input
              id="faq-search"
              placeholder="Search for answers..."
              className="pl-10 pr-4 py-2 border-slate-300 focus:border-purple-600 focus:ring-purple-600"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-lg">
                <AccordionItem value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-slate-700">{faq.answer}</AccordionContent>
                </AccordionItem>
              </Card>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}
