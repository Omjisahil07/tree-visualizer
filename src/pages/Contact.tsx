
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Mail, Send } from "lucide-react";

export default function Contact() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFeedbackForm({
      ...feedbackForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend
    console.log("Contact form submitted:", contactForm);
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend
    console.log("Feedback form submitted:", feedbackForm);
    toast({
      title: "Feedback Sent",
      description: "Thank you for your feedback. We appreciate your input!",
    });
    setFeedbackForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <div className="container max-w-4xl py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our data structure visualizer? Need help with something? Let us know and we'll get back to you as soon as possible.
          </p>
        </div>

        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="feedback">Send Feedback</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Get in Touch
                </CardTitle>
                <CardDescription>
                  Send us a message and we'll respond as soon as possible.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleContactSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Name</Label>
                      <Input 
                        id="contact-name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input 
                        id="contact-email"
                        name="email"
                        type="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        placeholder="Your email address"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">Subject</Label>
                    <Input 
                      id="contact-subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleContactChange}
                      placeholder="What is your message about?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea 
                      id="contact-message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="Your message"
                      rows={5}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full md:w-auto">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Share Your Feedback</CardTitle>
                <CardDescription>
                  We value your input to improve our visualizer and make it better for everyone.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleFeedbackSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="feedback-name">Name</Label>
                      <Input 
                        id="feedback-name"
                        name="name"
                        value={feedbackForm.name}
                        onChange={handleFeedbackChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="feedback-email">Email</Label>
                      <Input 
                        id="feedback-email"
                        name="email"
                        type="email"
                        value={feedbackForm.email}
                        onChange={handleFeedbackChange}
                        placeholder="Your email address"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feedback-subject">Subject</Label>
                    <Input 
                      id="feedback-subject"
                      name="subject"
                      value={feedbackForm.subject}
                      onChange={handleFeedbackChange}
                      placeholder="What's your feedback about?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feedback-message">Feedback</Label>
                    <Textarea 
                      id="feedback-message"
                      name="message"
                      value={feedbackForm.message}
                      onChange={handleFeedbackChange}
                      placeholder="Your feedback"
                      rows={5}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full md:w-auto">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Feedback
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
