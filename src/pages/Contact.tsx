
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

export default function Contact() {
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFeedbackForm({
      ...feedbackForm,
      [e.target.name]: e.target.value,
    });
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Send Your Feedback</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Help us improve our data structure visualizer by sharing your thoughts and suggestions.
          </p>
        </div>

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
      </div>
    </Layout>
  );
}
