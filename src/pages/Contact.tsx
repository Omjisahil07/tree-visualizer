import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export default function Contact() {
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFeedbackForm({
      ...feedbackForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Step 1: Store feedback in Supabase
      console.log("Submitting feedback to database:", feedbackForm);
      const { error: dbError } = await supabase
        .from('feedback')
        .insert([
          {
            name: feedbackForm.name,
            email: feedbackForm.email,
            subject: feedbackForm.subject,
            message: feedbackForm.message
          }
        ] as any); // Using type assertion as a workaround for the type issue
      
      if (dbError) {
        console.error("Database error:", dbError);
        throw dbError;
      }
      
      console.log("Feedback stored in database successfully");
      
      // Step 2: Send email notification
      console.log("Invoking send-feedback-email function");
      const { error: emailError, data: emailData } = await supabase.functions.invoke('send-feedback-email', {
        body: feedbackForm
      });
      
      console.log("Email function response:", emailData);
      
      if (emailError) {
        console.error("Email sending error:", emailError);
        // Continue even if email fails, we already saved to DB
      }
      
      toast({
        title: "Feedback Sent",
        description: "Thank you for your feedback. We appreciate your input!",
      });
      
      // Reset form
      setFeedbackForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was a problem sending your feedback. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
