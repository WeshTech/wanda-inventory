import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Users, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Questions() {
  const questions = [
    {
      id: "question-1",
      question: "How do I create my first account?",
      answer:
        "Creating your account is simple! Click the 'Sign Up' button on our homepage, enter your email address and create a secure password. You'll receive a verification email within minutes.",
    },
    {
      id: "question-2",
      question: "Is there a free trial available?",
      answer:
        "Yes! We offer a 15-day free trial with full access to all premium features. No credit card required to start your trial.",
    },
    {
      id: "question-3",
      question: "What payment methods do you accept?",
      answer:
        "We accept secure online mpesa initiated payments for our services.",
    },

    {
      id: "question-5",
      question: "How secure is my data?",
      answer:
        "Your data security is our top priority. We use enterprise-grade encryption (AES-256) for data at rest and in transit, maintain SOC 2 Type II compliance.",
    },
    {
      id: "question-6",
      question: "How can I get help if I'm stuck?",
      answer:
        "We offer multiple support channels: 24/7 whatsapp chat for urgent issues, email support with response within 1-2 hours, and our comprehensive documentation.",
    },
    {
      id: "question-7",
      question: "How long does the initial setup take?",
      answer:
        "Most users complete their initial setup in under 5 minutes. This includes account creation, email verification, and basic profile configuration.",
    },
  ];

  return (
    <div
      id="questions"
      className="bg-transparent backdrop-blur-[100px] py-8 px-4"
    >
      <div className="max-w-3xl mx-auto">
        {/* Compact Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-3">
            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-full">
              <HelpCircle className="w-6 h-6 text-primary dark:text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Getting Started with Your Essential Questions Answered
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find quick answers to the most common questions about our platform.
          </p>
        </div>

        {/* Single FAQ Card */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-card/90 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {questions.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-gray-200 dark:border-border"
                >
                  <AccordionTrigger className="text-left hover:text-primary transition-colors py-3 text-base font-medium text-gray-900 dark:text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-300 leading-relaxed pb-3 text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Compact CTA */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border-primary/20 dark:border-primary/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our support team is available 24/7 to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild className="flex items-center gap-2">
                  <Link href="/#footer">
                    <MessageCircle className="w-4 h-4" />
                    Contact Support
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Link href="/#footer">
                    <Users className="w-4 h-4" />
                    Join Community
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
